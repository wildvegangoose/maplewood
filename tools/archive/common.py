"""Shared helpers for the Maplewood library archive pipeline.

Source: Maplewood Memorial Library digital archive (hosted by Digifind-IT).
Outputs go to ./archive/ (git-ignored) until the library approves reuse.
"""
import os, re, time, urllib.request, urllib.parse, difflib, json

BASE = "https://www.digifind-it.com"
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(ROOT, "archive")
UA = "MaplewoodThroughTime-fansite-research/0.1 (personal, non-commercial; polite crawl)"

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
          "ct": "Court", "court": "Court", "la": "Lane", "ln": "Lane", "lane": "Lane", "pkwy": "Parkway", "parkway": "Parkway",
          "st": "Street", "street": "Street", "blvd": "Boulevard", "way": "Way", "cir": "Circle", "circle": "Circle",
          "pk": "Park", "sq": "Square", "hgts": "Heights", "crest": "Crest"}

def load_streets():
    p = os.path.join(OUT, "data", "streets.json")
    return json.load(open(p)) if os.path.exists(p) else []

def canon_street(raw, streets):
    """Map an OCR'd directory street ('Ridgewood rd', 'Bichmond av') to a canonical name ('RIDGEWOOD ROAD')."""
    if not raw: return None
    w = re.sub(r"[^A-Za-z0-9 ]", " ", raw).split()
    if not w: return None
    if w[-1].lower() in SUFFIX: w[-1] = SUFFIX[w[-1].lower()]
    elif len(w) == 1: w.append("Street")  # directories drop "st"
    cand = " ".join(w).upper()
    if cand in streets: return cand
    m = difflib.get_close_matches(cand, streets, n=1, cutoff=0.84)
    return m[0] if m else None
