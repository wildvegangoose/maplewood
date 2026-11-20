"""Shared helpers for the library-archive pipeline.

Source: the town library's digital archive hosted by Digifind-IT (configured in tools/town.json).
Outputs go to ./archive/ (git-ignored) until the library approves reuse.
"""
import os, re, time, urllib.request, urllib.parse, difflib, json

BASE = "https://www.digifind-it.com"
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(ROOT, "archive")
TOWN = json.load(open(os.path.join(ROOT, "tools", "town.json")))
UA = TOWN["user_agent"]
SLUG = TOWN["digifind"]["slug"]          # e.g. "maplewood" -> https://www.digifind-it.com/maplewood/...
DIG = TOWN["digifind"]

def fetch(url, dest=None, tries=4, pause=0.4, timeout=180):
    url = urllib.parse.quote(url, safe=":/?&=%#")
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=timeout) as r:
                data = r.read()
            time.sleep(pause)
            if dest:
                os.makedirs(os.path.dirname(dest), exist_ok=True)
                with open(dest, "wb") as f: f.write(data)
                return dest
            return data
        except Exception as e:
            if i == tries - 1: raise
            time.sleep(2 * (i + 1))

def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")

# --- street names -------------------------------------------------------
SUFFIX = {"av": "Avenue", "ave": "Avenue", "avenue": "Avenue", "rd": "Road", "road": "Road", "pl": "Place", "pi": "Place",
          "place": "Place", "ter": "Terrace", "terr": "Terrace", "terrace": "Terrace", "dr": "Drive", "drive": "Drive",
          "ct": "Court", "court": "Court", "la": "Lane", "ln": "Lane", "lane": "Lane", "pky": "Parkway", "pkv": "Parkway",
          "pkwy": "Parkway", "parkway": "Parkway", "st": "Street", "street": "Street", "blvd": "Boulevard",
          "boulevard": "Boulevard", "way": "Way", "cir": "Circle", "circle": "Circle", "cres": "Crescent",
          "crescent": "Crescent", "pk": "Park", "park": "Park", "sq": "Square", "hgts": "Heights", "crest": "Crest"}

DIRS = {"N": "NORTH", "S": "SOUTH", "E": "EAST", "W": "WEST",
        "NORTH": "NORTH", "SOUTH": "SOUTH", "EAST": "EAST", "WEST": "WEST"}

# Known Maplewood spelling/spacing variants -> canonical base/full names
STREET_ALIASES = {
    "NORTH BOYDEN PARKWAY": "BOYDEN PARKWAY",  # directories write "Boyden pky N" for Boyden Parkway (north of Springfield Ave)
    "NORTH BOYDEN": "BOYDEN",
    "NORTH VIEW TERRACE": "NORTHVIEW TERRACE",
}
BASE_ALIASES = {
    "BURNETT": "BURNET",
    "COLLINGWOOD": "COLLINWOOD",
    "BERKLEY": "BERKELEY",
    "DEHART": "DE HART",
    "VANNESS": "VAN NESS",
    "MOUNTAIN VIEW": "MOUNTAINVIEW",
    "HILLEREST": "HILLCREST",
    "COURIER": "COURTER",
    "FEMWOOD": "FERNWOOD",
    "MILLBUM": "MILLBURN",
    "NORTH VIEW": "NORTHVIEW",
}

def load_streets():
    p = os.path.join(OUT, "data", "streets.json")
    return json.load(open(p)) if os.path.exists(p) else []

def _edit_dist(a, b):
    if a == b: return 0
    if abs(len(a) - len(b)) > 2: return 99
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i] + [0] * len(b)
        for j, cb in enumerate(b, 1):
            cur[j] = min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (ca != cb))
        prev = cur
    return prev[-1]

def normalize_raw_street(raw):
    """Pre-clean OCR'd street text: fix fused directions (pkyN, pkyS, rdS), split 'p i', and OCR single-letter splits."""
    s = re.sub(r"[^A-Za-z0-9 ]", " ", raw or "").strip()
    if not s: return ""
    # Fix OCR fused direction suffixes: "Boyden pkyN", "Boyden pk yN", "Boyden pkyS", "Pierson rdS", "Pierson rdIS"
    s = re.sub(r"\bpk\s*y\s*([NSEW])\b", r"pkwy \1", s, flags=re.I)
    s = re.sub(r"\b(pkwy|pky|pkv)([NSEW])\b", r"pkwy \2", s, flags=re.I)
    s = re.sub(r"\b(rd|av|ave|st|pl|dr|la|ter|ct)I?([NSEW])\b", r"\1 \2", s)
    # Fix OCR split "p i" / "p l" -> "pl" at end
    s = re.sub(r"\bp\s+[il]\s*$", "pl", s, flags=re.I)
    # Fix OCR-exploded single-word street names like "Y a le" / "V a lle y"
    if re.match(r"^[A-Z](?:\s+[A-Za-z]{1,3}){2,}$", s) and s.split()[-1].lower() not in SUFFIX and s.split()[-1].upper() not in DIRS:
        s = s.replace(" ", "")
    # Rejoin OCR single-letter split at start of capitalized word ("H illcrest", "B urnett", "V anN ess")
    s = re.sub(r"\b([A-Z])\s+([a-z]{2,})\b", r"\1\2", s)
    s = re.sub(r"\b([A-Z][a-z]+)\s+([a-z]{2,})\b", lambda m: m.group(0) if m.group(2).lower() in SUFFIX else m.group(1) + m.group(2), s)
    # Pull trailing direction ("Boyden pkwy N", "Pierson rd South") to the front
    d = re.match(r"^(.*\S)\s+([NSEW]|North|South|East|West)$", s, flags=re.I)
    if d and d.group(1).split()[-1].lower() in SUFFIX:
        s = DIRS[d.group(2).upper()] + " " + d.group(1)
    # Expand leading single-letter direction ("E Cedar la", "W Parker av", "S Pierson rd")
    s = re.sub(r"^([NSEW])\s+(?=[A-Za-z]{2,})", lambda m: DIRS[m.group(1).upper()] + " ", s)
    return re.sub(r"\s+", " ", s).strip()

def _split_street(name):
    """Split canonical uppercase street into (dir_prefix, base_name, suffix)."""
    w = name.upper().split()
    if not w: return "", "", ""
    suf = ""
    if len(w) >= 2 and w[-1].lower() in SUFFIX:
        suf = SUFFIX[w[-1].lower()].upper()
        w = w[:-1]
    dir_p = ""
    # Directional prefix only when at least one base word remains (so "NORTH TERRACE" has dir_p="", base="NORTH")
    if len(w) >= 2 and w[0] in ("NORTH", "SOUTH", "EAST", "WEST"):
        dir_p = w[0]
        w = w[1:]
    elif len(w) == 1 and w[0] in ("NORTH", "SOUTH", "EAST", "WEST") and suf == "CRESCENT":
        dir_p = w[0]
        w = []
    base = " ".join(w)
    base = BASE_ALIASES.get(base, base)
    return dir_p, base, suf

def canon_street(raw, streets):
    """Map an OCR'd street ('Ridgewood rd', 'Bichmond av', 'Boyden pky N') to a canonical name ('RIDGEWOOD ROAD').
    Never crosses directional prefixes (NORTH vs SOUTH, EAST vs WEST) or unrelated street suffixes, and
    matches fuzzy OCR typos on the base street name only (not inflated by 'STREET'/'AVENUE')."""
    if not raw or not streets: return None
    s = normalize_raw_street(raw)
    if not s: return None
    w = s.split()
    if w[-1].lower() in SUFFIX:
        w[-1] = SUFFIX[w[-1].lower()]
    elif len(w) == 1:
        w.append("Street")  # directories drop "st"
    cand = " ".join(w).upper()
    cand = STREET_ALIASES.get(cand, cand)
    if cand in streets:
        return cand

    c_dir, c_base, c_suf = _split_street(cand)
    # Rebuild after alias normalization (e.g. "BURNETT AVENUE" -> "BURNET AVENUE")
    rebuilt = " ".join(x for x in (c_dir, c_base, c_suf) if x)
    rebuilt = STREET_ALIASES.get(rebuilt, rebuilt)
    if rebuilt in streets:
        return rebuilt
    c_dir, c_base, c_suf = _split_street(rebuilt)
    c_ns = c_base.replace(" ", "")

    # Exact space-collapsed match within same (dir, suffix)
    parsed = [(st, *_split_street(st)) for st in streets]
    for st, s_dir, s_base, s_suf in parsed:
        if s_dir == c_dir and s_suf == c_suf and s_base.replace(" ", "") == c_ns:
            return st

    # Fuzzy OCR match on BASE NAME ONLY within same (dir, suffix)
    if len(c_ns) >= 5:
        max_d = 1 if len(c_ns) <= 7 else 2
        best, best_score = None, (99, 0.0)
        for st, s_dir, s_base, s_suf in parsed:
            if s_dir != c_dir or s_suf != c_suf:
                continue
            s_ns = s_base.replace(" ", "")
            d = _edit_dist(c_ns, s_ns)
            if d <= max_d:
                ratio = difflib.SequenceMatcher(None, c_ns, s_ns).ratio()
                if ratio >= 0.78 and (d, -ratio) < best_score:
                    best, best_score = st, (d, -ratio)
        if best:
            return best

    # Handle OCR-garbled directional prefix (e.g. "Hast Cedar Lane" -> "EAST CEDAR LANE") ONLY when c_dir==""
    if not c_dir and len(c_ns) >= 8:
        best, best_score = None, (99, 0.0)
        for st, s_dir, s_base, s_suf in parsed:
            if not s_dir or s_suf != c_suf:
                continue
            full_s = (s_dir + s_base).replace(" ", "")
            d = _edit_dist(c_ns, full_s)
            if d <= 1:
                ratio = difflib.SequenceMatcher(None, c_ns, full_s).ratio()
                if (d, -ratio) < best_score:
                    best, best_score = st, (d, -ratio)
        if best:
            return best

    return None
