# Maplewood Through Time

An unofficial fan site that explores the history of **Maplewood, New Jersey**, from Lenape trails to the present day.

## Pages

| Page | What it does |
| --- | --- |
| `index.html` (**Time Machine**) | An animated, illustrated panorama of Maplewood that rebuilds itself as you drag a year slider (1600 to 2026), with a time-lapse play button. Farmhouses, the 1838 railroad, the 1860 and 1902 stations, the 1927 theater, Town Hall, Columbia High School and Memorial Park appear in their years. Steam trains, stagecoaches, trolleys and cars change with the era, and the picture shifts from "painting" to "albumen print", "postcard", "Kodachrome" and modern color. Glowing buildings open their stories. |
| `explore.html` (**Explore the Map**) | A Leaflet/OpenStreetMap map of 50+ dated places. Pins drop in and fade out as you move through time, and historic roads appear in their years. Real dated maps sit under the pins and change with the slider: USGS topographic surveys (1888, 1898, 1905, 1921, 1947, 1955, 1972) and New Jersey aerial photographs (1930, 1995, 2007, 2020). A "Today ↔ Then" control fades between the old map and today's streets. |
| `house.html` (**Your House's Story**) | Geocodes any Maplewood address (OpenStreetMap Nominatim) and writes a scroll-driven story of that spot: the nearest old road, the colonial farm district, the walk to the 1860 depot, the suburban boom, and what the town was like the year the house was built (optional). It recognizes documented landmarks and gives a research checklist tailored to the build year. |
| `timeline.html` | A scrolling timeline grouped by era, with a sticky mini-panorama that follows along. |
| `research.html` | How to research your house at the Maplewood Memorial Library and the Robert H. Grasmere Local History Center, plus the full bibliography. |

## Content & honesty

* All dated facts live in `js/data.js`, and each one cites a source (Durand-Hedden House & Garden Association, the Maplewood Historic Preservation Commission, the National Park Service, the Maplewood Memorial Library, Wikipedia and others). Where sources disagree, the text says so.
* The "what it was like" passages and the address stories are narrative synthesis. A house story describes the *neighborhood and spot*, not a documented record of a specific building.
* The panorama is an artistic interpretation. Buildings are arranged for storytelling, not placed at their real positions.

To add a place, append an entry to `MW.places` in `js/data.js` (year, title, kind, address, lat/lon, text, sources). It shows up automatically in the Time Machine moments, the map, the timeline and the house stories.

## Running locally

It is a static site with no build step:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Leaflet, the map tiles, Google Fonts and address search load from the internet.

## Credits

Map data © OpenStreetMap contributors. Historical topographic maps: U.S. Geological Survey (public domain). They were cropped, mosaicked and reprojected into `img/maps/` with GDAL. Aerial imagery is streamed live from the NJ Office of GIS imagery service (`img.nj.gov`). The township boundary comes from OpenStreetMap (ODbL). This site is not affiliated with the Township of Maplewood or any of the organizations cited.
