"""Automated ground-truth and structural accuracy regression suite for Maplewood Through Time.

Run with:
    python3 -m unittest discover -s tests -v
or:
    python3 tests/test_accuracy.py
"""
import json
import os
import pathlib
import re
import subprocess
import sys
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "archive"
STREETS_DIR = ARCHIVE / "data" / "streets"
sys.path.insert(0, str(ROOT / "tools" / "archive"))
import common  # noqa: E402


def _load_street(slug_name):
    p = STREETS_DIR / f"{slug_name}.json"
    with open(p, encoding="utf-8") as f:
        return json.load(f)


def _eval_js_data():
    script = f"""
    global.window = global;
    global.MW = {{}};
    require({json.dumps(str(ROOT / "js/data.js"))});
    require({json.dumps(str(ROOT / "js/landmarks-data.js"))});
    require({json.dumps(str(ROOT / "js/people-data.js"))});
    require({json.dumps(str(ROOT / "js/webstories.js"))});
    console.log(JSON.stringify({{
      eras: MW.eras,
      seats: MW.seats,
      places: MW.places,
      landmarks: MW.landmarks,
      people: MW.people,
      stories: MW.webStories,
      storyCheckNorth: MW.storiesFor("48", "N Terrace").length,
      storyCheckSouth: MW.storiesFor("48", "South Terrace").length,
      storyCheckPlymouth: MW.storiesFor("32", "Plymouth Ave").length
    }}));
    """
    out = subprocess.check_output(["node", "-e", script], text=True)
    return json.loads(out)


# 60 hand-verified ground-truth directory cases across 1916-1950 covering:
# - top-of-column guidewords & dropped/garbled ditto dashes (e.g. 28 Plymouth Ave 1950 Whitney vs Hebert)
# - kerning-split boldface surname headers & ALL-CAPS advertiser listings (e.g. 36 Oberlin St Pollitt)
# - WWII-gap couple harmonization (46 Claremont Ave 1950 Turnbull vs Turnberger)
# - unglued completed entries, 'h do' syntax, compound prefixes (MacCarthy), spouses, and crops
GROUND_TRUTH_CASES = [
    # (street_slug, number, year, expected_surname, expected_given_prefix, expected_spouse, require_crop, forbidden_surname)
    ("plymouth-avenue", "28", 1950, "Whitney", "Paul R", "Nancy J", True, "Hebert"),
    ("plymouth-avenue", "28", 1948, "Halsey", "Edmund R", "Doris", False, None),
    ("plymouth-avenue", "28", 1942, "Clements", "Louise M", None, True, None),
    ("plymouth-avenue", "28", 1936, "Clements", "Louise M", None, True, None),
    ("plymouth-avenue", "28", 1932, "Clements", "Elizabeth L", None, False, None),
    ("plymouth-avenue", "32", 1936, "Stryker", "Norman R", "Katherine E", True, None),
    ("plymouth-avenue", "32", 1942, "Stryker", "Norman R", "Katherine E", True, None),
    ("oberlin-street", "36", 1928, "Pollitt", "Alfred", None, False, "Pollard"),
    ("oberlin-street", "36", 1928, "Pollitt", "George W", None, False, "Pollard"),
    ("oberlin-street", "36", 1929, "Pollitt", "Alfred O", None, True, "Pollard"),
    ("oberlin-street", "36", 1934, "Pollitt", "Alfred O", "Lillian E", False, "Pollard"),
    ("oberlin-street", "36", 1938, "Pollitt", "Lucy E", None, False, "Pollard"),
    ("oberlin-street", "36", 1942, "Pollitt", "Alfred O", "Lillian E", True, "Pollard"),
    ("oberlin-street", "36", 1948, "Pollitt", "Alfred O", "Lillian E", False, "Tollit"),
    ("oberlin-street", "36", 1948, "Pollitt", "Robert A", None, False, "Tollit"),
    ("oberlin-street", "36", 1948, "Pollitt", "Wesley P", "Edith", False, "Tollit"),
    ("oberlin-street", "36", 1950, "Pollitt", "Alfred O", "Lillian E", True, "Pollard"),
    ("oberlin-street", "36", 1950, "Pollitt", "Wesley P", "Edith", False, None),
    ("oberlin-street", "20", 1950, "Webb", "Charles V", "Rosemary T", True, None),
    ("north-terrace", "48", 1922, "Adams", "Russell V", None, True, None),
    ("north-terrace", "48", 1934, "Adams", "Harriet S Mrs", None, False, None),
    ("north-terrace", "48", 1936, "Adams", "Harriet S Mrs", None, False, None),
    ("north-terrace", "48", 1942, "Adams", "Russell V", "Harriet S", True, None),
    ("north-terrace", "48", 1950, "Adams", "Russell V", "Harriet S", True, None),
    ("north-terrace", "48", 1950, "Adams", "Harriet S Mrs", None, False, None),
    ("euclid-avenue", "15", 1916, "Monroe", "Jay R", None, False, None),
    ("euclid-avenue", "15", 1918, "Monroe", "Jay R", None, False, None),
    ("euclid-avenue", "28", 1920, "Monroe", "Jay R", None, False, None),
    ("euclid-avenue", "28", 1922, "Monroe", "Jav R", None, True, None),
    ("euclid-avenue", "28", 1924, "Monroe", "Jay R", None, False, None),
    ("ridgewood-road", "624", 1920, "Balch", "Edward C", None, False, None),
    ("ridgewood-road", "624", 1932, "Balch", "Edward C", None, False, None),
    ("ridgewood-road", "624", 1942, "Balch", "Kate L", None, True, None),
    ("claremont-avenue", "46", 1934, "Turnbull", "James L", "Agnes S", False, None),
    ("claremont-avenue", "46", 1942, "Turnbull", "Agnes S", None, False, None),
    ("claremont-avenue", "46", 1950, "Turnbull", "James L", "Agnes S", True, "Turnberger"),
    ("valley-street", "646", 1918, "Ricalton", "James", None, False, None),
    ("valley-street", "646", 1924, "Ricalton", "James", None, False, None),
    ("lenox-place", "12", 1922, "Lowell", "William", None, True, None),
    ("lenox-place", "12", 1929, "Lowell", "William", None, True, None),
    ("prospect-street", "580", 1924, "Jones", "Benjamin F", None, False, None),
    ("prospect-street", "580", 1934, "Jones", "Benjamin F", "Mabel S", False, None),
    ("prospect-street", "629", 1936, "Eberhardt", "Frederick L", "Martha L", True, None),
    ("kensington-terrace", "31", 1936, "Wallhauser", "George M", "Isabel T", True, None),
    ("kensington-terrace", "31", 1950, "Wallhauser", "George M", "Isabel T", True, None),
    ("oakland-road", "138", 1936, "Huntington", "R Graham", "Alice B", True, None),
    ("woodland-road", "19", 1936, "MacCarthy", "Charles D", "Gloanna H", True, None),
    ("woodland-road", "19", 1950, "MacCarthy", "Gloanna", None, True, None),
    ("burnet-street", "51", 1936, "Herben", "Stephen J Rev", "Grace F", True, None),
    ("burnet-street", "29", 1950, "Whiting", "J Adelaide", None, True, "Hebert"),
    ("hilton-avenue", "166", 1934, "Rochow", "Eugene G", None, False, None),
    ("yale-street", "23", 1950, "Ferry", "David R", None, False, None),
    ("walton-road", "476", 1950, "Karassik", "Igor J", "Marv E", True, None),
    ("academy-street", "538", 1950, "Ehrlich", "William", "Ruth R", True, None),
    ("boyden-avenue", "130", 1948, "Mirabella", "Grace M", None, False, None),
    ("elmwood-avenue", "300", 1950, "Lan", "Donald P", None, False, None),
    ("durand-road", "95", 1948, "Sheckley", "Robert", None, False, None),
    ("durand-road", "79", 1950, "Whitman", "Harry N", "Christine E", True, None),
    ("washington-park", "25", 1950, "Whitney", "Kenneth W", None, False, "Hebert"),
    ("girard-place", "16", 1950, "Whitney", "Ernest H", "Jane M", True, "Hebert"),
]


class MaplewoodAccuracyTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.street_cache = {}
        cls.js = _eval_js_data()
        cls.conf_streets = json.loads((ARCHIVE / "data" / "streets.json").read_text(encoding="utf-8"))

    def _house_listings(self, st_slug, num):
        if st_slug not in self.street_cache:
            self.street_cache[st_slug] = _load_street(st_slug)
        return self.street_cache[st_slug]["houses"].get(str(num), {}).get("listings", [])

    def test_ground_truth_directory_cases(self):
        self.assertGreaterEqual(len(GROUND_TRUTH_CASES), 50)
        for st_slug, num, yr, exp_sur, exp_giv, exp_sp, req_crop, forbid_sur in GROUND_TRUTH_CASES:
            with self.subTest(address=f"{num} {st_slug}", year=yr, person=f"{exp_sur}, {exp_giv}"):
                yr_rows = [r for r in self._house_listings(st_slug, num) if r["year"] == yr]
                self.assertTrue(yr_rows, f"No {yr} listings found at {num} {st_slug}")
                if forbid_sur:
                    for r in yr_rows:
                        self.assertNotEqual(r["surname"], forbid_sur, f"Forbidden poisoned surname {forbid_sur} at {num} {st_slug} ({yr})")
                matches = [
                    r for r in yr_rows
                    if r["surname"] == exp_sur and (r.get("given") or "").startswith(exp_giv)
                ]
                self.assertTrue(
                    matches,
                    f"Expected ({exp_sur}, {exp_giv}*) at {num} {st_slug} in {yr}, got: {[(r['surname'], r.get('given'), r.get('spouse')) for r in yr_rows]}",
                )
                hit = matches[0]
                if exp_sp is not None:
                    self.assertEqual(hit.get("spouse"), exp_sp)
                if req_crop:
                    self.assertTrue(hit.get("crop"), f"Missing crop path on householder {exp_sur} at {num} {st_slug} ({yr})")
                    crop_file = ARCHIVE / hit["crop"]
                    self.assertTrue(crop_file.is_file(), f"Crop JPEG missing on disk: {crop_file}")
                    self.assertGreater(crop_file.stat().st_size, 500)

    def test_zero_crop_collisions_and_zero_missing_jpegs(self):
        crop_owners = {}
        missing = []
        collisions = []
        total_listings = 0
        for p in sorted(STREETS_DIR.glob("*.json")):
            data = json.loads(p.read_text(encoding="utf-8"))
            st = data["name"]
            for num, rec in data["houses"].items():
                for r in rec.get("listings", []):
                    total_listings += 1
                    self.assertLessEqual(r["year"], 1950, f"Post-1950 directory listing leaked at {num} {st}")
                    c = r.get("crop")
                    if c:
                        if not (ARCHIVE / c).is_file():
                            missing.append((st, num, r["year"], c))
                        owner = (st, num, r["year"])
                        if c in crop_owners and crop_owners[c] != owner:
                            collisions.append((c, crop_owners[c], owner))
                        crop_owners[c] = owner
        self.assertGreater(total_listings, 100000)
        self.assertEqual(missing, [], f"Missing crop JPEGs: {missing[:5]}")
        self.assertEqual(collisions, [], f"Colliding crop JPEGs: {collisions[:5]}")

    def test_zero_split_names_and_digit_middle_initials(self):
        split_sp, split_gv, mid_digit, edge_quote = [], [], [], []
        for p in sorted(STREETS_DIR.glob("*.json")):
            data = json.loads(p.read_text(encoding="utf-8"))
            st = data["name"]
            for num, rec in data["houses"].items():
                for r in rec.get("listings", []):
                    sur = r.get("surname") or ""
                    gv = r.get("given") or ""
                    sp = r.get("spouse") or ""
                    if sur != sur.strip(" ,.;:'’‘\"“”`"):
                        edge_quote.append((st, num, r["year"], sur))
                    if re.search(r"(?:^|\s)[A-Z]\s+[a-z]{2,}", sp):
                        split_sp.append((st, num, r["year"], sp))
                    if re.search(r"(?:^|\s)[A-Z]\s+[a-z]{2,}", gv):
                        split_gv.append((st, num, r["year"], gv))
                    if re.search(r"(?:^|\s)[01](?:\s|$)", gv) or re.search(r"(?:^|\s)[01](?:\s|$)", sp):
                        mid_digit.append((st, num, r["year"], gv, sp))
        self.assertEqual(edge_quote, [])
        self.assertEqual(split_sp, [])
        self.assertEqual(split_gv, [])
        self.assertEqual(mid_digit, [])

    def test_directional_and_suffix_street_canonicalization(self):
        self.assertEqual(common.canon_street("N Crescent", self.conf_streets), "NORTH CRESCENT")
        self.assertEqual(common.canon_street("S Crescent", self.conf_streets), "SOUTH CRESCENT")
        self.assertNotEqual(
            common.canon_street("N Crescent", self.conf_streets),
            common.canon_street("S Crescent", self.conf_streets),
        )
        self.assertEqual(common.canon_street("E Cedar la", self.conf_streets), "EAST CEDAR LANE")
        self.assertEqual(common.canon_street("Oberlin", self.conf_streets), "OBERLIN STREET")
        self.assertEqual(common.canon_street("Plymouth av", self.conf_streets), "PLYMOUTH AVENUE")
        self.assertIsNone(common.canon_street("Marion ter", self.conf_streets))

    def test_curated_historical_facts_and_privacy_rules(self):
        seats = {s["id"]: s for s in self.js.get("seats", [])}
        places = {p["id"]: p for p in self.js["places"]}
        self.assertEqual(seats["seat-newark"]["to"], 1806)
        self.assertEqual(places["middleville"]["year"], 1830)
        self.assertIn("1880", places["middleville"]["text"])

        # Living people must never have home addresses attached; all URLs must have balanced parentheses
        for person in self.js["people"]:
            if not person.get("died"):
                self.assertFalse(person.get("homes"), f"Living person has home address attached: {person['name']}")
            url = person.get("url") or ""
            self.assertEqual(url.count("("), url.count(")"), f"Truncated URL on {person['name']}: {url}")

        # Landmark image paths must exist on disk
        lms = self.js["landmarks"].values() if isinstance(self.js["landmarks"], dict) else self.js["landmarks"]
        for lm in lms:
            if isinstance(lm, dict) and lm.get("photo") and not lm["photo"].startswith("http"):
                self.assertTrue((ROOT / lm["photo"]).is_file(), f"Missing landmark photo: {lm['photo']}")

        # WebStories directional matching
        self.assertEqual(self.js["storyCheckNorth"], 1)
        self.assertEqual(self.js["storyCheckSouth"], 0)
        self.assertEqual(self.js["storyCheckPlymouth"], 1)

    def test_seo_metadata_sitemap_and_static_landmarks(self):
        import html as html_lib
        import xml.etree.ElementTree as ET

        cfg = json.loads((ROOT / "tools" / "town.json").read_text(encoding="utf-8"))
        site_url = cfg["site_url"].rstrip("/") + "/"

        robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
        self.assertIn("User-agent: *", robots)
        self.assertIn("Allow: /", robots)
        self.assertIn(f"Sitemap: {site_url}sitemap.xml", robots)

        tree = ET.parse(ROOT / "sitemap.xml")
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        locs = [el.text for el in tree.getroot().findall("sm:url/sm:loc", ns)]
        self.assertEqual(len(locs), len(set(locs)), "Duplicate URLs in sitemap.xml")
        expected_count = 7 + len(self.js["landmarks"])
        self.assertEqual(len(locs), expected_count)
        self.assertNotIn(f"{site_url}landmark.html", locs)

        lm_shell = (ROOT / "landmark.html").read_text(encoding="utf-8")
        self.assertIn('content="noindex, follow"', lm_shell)

        titles, descs = set(), set()
        for loc in locs:
            self.assertTrue(loc.startswith(site_url), f"Unexpected domain in sitemap: {loc}")
            rel = loc[len(site_url) :] or "index.html"
            fpath = ROOT / rel
            self.assertTrue(fpath.is_file(), f"Sitemap URL missing on disk: {fpath}")
            txt = fpath.read_text(encoding="utf-8")
            self.assertIn('content="index, follow"', txt, f"Missing index, follow on {rel}")
            self.assertIn(f'<link rel="canonical" href="{html_lib.escape(loc, quote=True)}">', txt, f"Canonical mismatch on {rel}")

            tm = re.search(r"<title>([\s\S]*?)</title>", txt)
            dm = re.search(r'<meta name="description" content="([^"]+)"', txt)
            om = re.search(r'<meta property="og:image" content="([^"]+)"', txt)
            jm = re.search(r'<script type="application/ld\+json">([\s\S]*?)</script>', txt)
            self.assertTrue(tm and tm.group(1).strip(), f"Missing <title> on {rel}")
            self.assertTrue(dm and 50 <= len(html_lib.unescape(dm.group(1))) <= 165, f"Bad meta description on {rel}")
            self.assertTrue(om, f"Missing og:image on {rel}")
            self.assertTrue(jm, f"Missing JSON-LD on {rel}")

            t_val, d_val = tm.group(1).strip(), dm.group(1).strip()
            self.assertNotIn(t_val, titles, f"Duplicate <title> across pages: {t_val}")
            self.assertNotIn(d_val, descs, f"Duplicate meta description across pages: {d_val}")
            titles.add(t_val)
            descs.add(d_val)

            og_img = html_lib.unescape(om.group(1))
            self.assertTrue(og_img.startswith(site_url), f"og:image not absolute on {rel}: {og_img}")
            og_file = ROOT / og_img[len(site_url) :]
            self.assertTrue(og_file.is_file() and og_file.stat().st_size > 1000, f"Missing og:image file {og_file} on {rel}")

            ld = json.loads(jm.group(1))
            self.assertEqual(ld.get("@context"), "https://schema.org")
            self.assertTrue(ld.get("@graph"), f"Empty JSON-LD @graph on {rel}")
            if rel.startswith("landmarks/"):
                self.assertRegex(txt, r"<h1>[^<]+</h1>", f"Static landmark missing <h1> on {rel}")

        house_html = (ROOT / "house.html").read_text(encoding="utf-8")
        self.assertEqual(len(re.findall(r'href="house\.html\?q=[^"]+"', house_html)), 237)
        idx_txt = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn("https://wildvegangoose.github.io/south-orange/", idx_txt)
        if cfg.get("google_site_verification"):
            self.assertIn(
                f'<meta name="google-site-verification" content="{cfg["google_site_verification"]}"',
                idx_txt,
            )
        self.assertIn("https://wildvegangoose.github.io/south-orange/people.html", (ROOT / "people.html").read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main(verbosity=2)
