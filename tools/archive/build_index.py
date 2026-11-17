"""Merge real-estate cards + directory listings into per-street JSON files the house page can load.

archive/data/street_index.json   {slug: {name, houses, first, last}}
archive/data/streets/<slug>.json {name, houses: {number: {cards:[...], listings:[...]}}}
Only directory years <= CUTOFF are included (names after 1950 are left out by design).
"""
import os, re, json, glob, collections
from common import OUT, slug

CUTOFF = 1950
VIEWER = "https://www.digifind-it.com/IDIViewer/web/viewer.html?file="
houses = collections.defaultdict(lambda: collections.defaultdict(lambda: {"cards": [], "listings": []}))

def norm_num(n):
    n = (n or "").strip().upper()
    m = re.match(r"^(\d+)", n)
    return m.group(1) if m else n

rp = os.path.join(OUT, "data", "realestate.json")
if not os.path.exists(rp):  # crawl still running: reconstruct card records from the images rendered so far
    streets = json.load(open(os.path.join(OUT, "data", "streets.json")))
    by_slug = {slug(s): s for s in streets}
    tmp = []
    for img in glob.glob(os.path.join(OUT, "realestate", "*", "*-1.jpg")):
        st = by_slug.get(os.path.basename(os.path.dirname(img)))
        m = re.match(r"^(\d+[a-z]?)-", os.path.basename(img))
        if not st or not m: continue
        label = f"{m.group(1).upper()} {st}"; back = img[:-6] + "-2.jpg"
        tmp.append({"street": st, "number": m.group(1).upper(), "label": label, "img": os.path.relpath(img, OUT),
                    "back": os.path.relpath(back, OUT) if os.path.exists(back) else None, "pdf": f"/maplewood/data/realestate/{st}/{label}.pdf"})
    rp = os.path.join(OUT, "_tmp", "realestate_partial.json"); json.dump(tmp, open(rp, "w"))
if os.path.exists(rp):
    for c in json.load(open(rp)):
        if not c.get("number") or not c.get("img") or not os.path.exists(os.path.join(OUT, c["img"])): continue
        houses[c["street"]][norm_num(c["number"])]["cards"].append(
            {"img": c["img"], "back": c.get("back"), "label": c["label"], "src": VIEWER + c["pdf"]})

for f in sorted(glob.glob(os.path.join(OUT, "data", "dir_*.json"))):
    y = int(re.search(r"dir_(\d+)", f).group(1))
    if y > CUTOFF: continue
    for r in json.load(open(f)):
        if not r.get("street"): continue
        houses[r["street"]][norm_num(r["number"])]["listings"].append({
            "year": r["year"], "surname": r["surname"], "given": r["given"], "spouse": r["spouse"], "occ": r["occ"],
            "tenure": r["tenure"], "town": r["town"], "crop": r.get("crop"), "src": f"{VIEWER}{r['src']}#page={r['page']}", "text": r["text"]})

os.makedirs(os.path.join(OUT, "data", "streets"), exist_ok=True)
index = {}
for street, hs in houses.items():
    clean = street.lstrip("~")
    s = slug(clean)
    for h in hs.values():
        h["listings"].sort(key=lambda l: (l["year"], l["tenure"] != "householder", l["surname"]))
        seen = set(); h["listings"] = [l for l in h["listings"] if not ((k := (l["year"], l["surname"], l["given"])) in seen or seen.add(k))]
    years = [l["year"] for h in hs.values() for l in h["listings"]]
    prev = index.get(s)
    data = {"name": clean, "confirmed": not street.startswith("~"), "houses": hs}
    if prev:  # merge a "~" variant into a confirmed street of the same name
        old = json.load(open(os.path.join(OUT, "data", "streets", s + ".json")))
        for n, h in hs.items():
            o = old["houses"].setdefault(n, {"cards": [], "listings": []}); o["cards"] += h["cards"]; o["listings"] += h["listings"]
        data = old
    json.dump(data, open(os.path.join(OUT, "data", "streets", s + ".json"), "w"))
    index[s] = {"name": clean, "houses": len(data["houses"]), "first": min(years) if years else None, "last": max(years) if years else None}
json.dump(index, open(os.path.join(OUT, "data", "street_index.json"), "w"))
print(f"{len(index)} streets, {sum(v['houses'] for v in index.values())} addresses, "
      f"{sum(len(h['cards']) for hs in houses.values() for h in hs.values())} cards, "
      f"{sum(len(h['listings']) for hs in houses.values() for h in hs.values())} listings")
