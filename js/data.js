/* ==========================================================================
   Maplewood Through Time: the historical dataset.
   Every dated fact below comes from one of the sources in MW.sources.
   Where sources disagree, the text says so. Narrative passages ("what it was
   like") are our own synthesis of those facts and are labelled as such on the site.
   ========================================================================== */
var MW = window.MW = window.MW || {};

MW.sources = {
  wiki:     { label: "Wikipedia: Maplewood, New Jersey", url: "https://en.wikipedia.org/wiki/Maplewood,_New_Jersey" },
  dhSep:    { label: "Durand-Hedden: The Separation of Maplewood and South Orange", url: "https://www.durandhedden.org/post/the-separation-of-maplewood-and-south-orange" },
  dhTBall:  { label: "Durand-Hedden: Timothy Ball House, 1743", url: "https://www.durandhedden.org/post/timothy-ball-house-1743" },
  dhJBall:  { label: "Durand-Hedden: Jonas Ball House, 1750", url: "https://www.durandhedden.org/post/jonas-ball-house-1750" },
  dhHouse:  { label: "Durand-Hedden: A Brief History of the Durand-Hedden House", url: "https://durandhedden.org/post/a-brief-history-of-the-durand-hedden-house" },
  dhPost:   { label: "Durand-Hedden: The History of Postal Service in Maplewood", url: "https://www.durandhedden.org/post/where-can-i-mail-a-letter-the-history-of-postal-service-in-maplewood" },
  dhMtn:    { label: "Durand-Hedden: Maplewood, in the Orange Mountains", url: "https://www.durandhedden.org/post/maplewood-in-the-orange-mountains" },
  dhHilton: { label: "Durand-Hedden: The Hilton Section, Many Names, One Identity", url: "https://www.durandhedden.org/post/the-hilton-section-many-names-one-identity" },
  dhTheater:{ label: "Durand-Hedden: Maplewood Theater", url: "https://www.durandhedden.org/post/maplewood-theater" },
  hmHist:   { label: "Maplewood Historic Preservation Commission: Developmental History", url: "https://www.historicmaplewood.com/maplewood/developmental-history-of-maplewood/" },
  hmStyles: { label: "Maplewood Historic Preservation Commission: Architectural Styles", url: "https://www.historicmaplewood.com/maplewood/architectural-styles/" },
  hmResearch:{ label: "Maplewood Historic Preservation Commission: Research Your House", url: "https://www.historicmaplewood.com/your-house/research-your-house" },
  hmDesig:  { label: "Maplewood Historic Preservation Commission: Designated Buildings", url: "https://www.historicmaplewood.com/designated-buildings/" },
  nps:      { label: "National Park Service: Maplewood Memorial Park", url: "https://www.nps.gov/places/maplewood-park-new-jersey.htm" },
  library:  { label: "Maplewood Memorial Library: Research Maplewood Local History", url: "https://www.maplewoodlibrary.org/research-maplewood-local-history" },
  libArchive:{ label: "Maplewood Memorial Library: Digital Archive", url: "https://www.maplewoodlibrary.org/research-maplewooddigital-archive" },
  dhCenter: { label: "Durand-Hedden: Robert H. Grasmere Local History Center", url: "https://durandhedden.org/history-center" },
  cinema:   { label: "Cinema Treasures: Maplewood Theatre", url: "https://www.cinematreasures.org/theaters/2867" },
  lowell:   { label: "Wikipedia: William Lowell Sr. (the Reddy Tee)", url: "https://en.wikipedia.org/wiki/William_Lowell_Sr." },
  rvrr:     { label: "Rahway Valley Railroad history: Maplewood customers", url: "https://trainweb.us/rahwayvalley/route_customers_maplewood.htm" },
  crawford: { label: "Wikipedia: Cheryl Crawford", url: "https://en.wikipedia.org/wiki/Cheryl_Crawford" },
  sanborn1912: { label: "Sanborn Fire Insurance Map, South Orange (1912), South Orange Township sheets: Library of Congress, public domain", url: "https://www.loc.gov/item/sanborn05629_001/" },
  sanborn1949: { label: "Sanborn Fire Insurance Map, South Orange and Maplewood Township (1912–1949): Library of Congress, public domain", url: "https://www.loc.gov/item/sanborn05629_002/" },
  locNews:  { label: "Library of Congress: Chronicling America historic newspapers (public domain)", url: "https://www.loc.gov/collections/chronicling-america/" },
  gottscho: { label: "Gottscho-Schleisner Collection, Library of Congress (no known restrictions on publication)", url: "https://www.loc.gov/pictures/collection/gsc/" },
  rail:     { label: "General New Jersey railroad history (Lackawanna electrification c.1930; NJ Transit Midtown Direct 1996). Not from the local sources above", url: "https://en.wikipedia.org/wiki/Morristown_Line" }
};

/* Census counts (Wikipedia, U.S. Census). Pre-1870 values are not published for
   today's boundaries, so the counter shows a descriptive phrase instead. */
MW.census = [
  [1870, 2963], [1880, 1733], [1890, 1078], [1900, 1630], [1910, 2979],
  [1920, 5283], [1930, 21321], [1940, 23139], [1950, 25201], [1960, 23977],
  [1970, 24932], [1980, 22950], [1990, 21652], [2000, 23868], [2010, 23867],
  [2020, 25684], [2024, 26127]
];

MW.populationFor = function (year) {
  const c = MW.census;
  if (year < 1815) return { approx: true, label: year < 1666 ? "Lenape homeland" : "a few farm families" };
  if (year < 1870) return { approx: true, label: year < 1840 ? "about 30 families (c. 1815)" : "a scattering of farms & mills" };
  if (year >= c[c.length - 1][0]) return { value: c[c.length - 1][1] };
  for (let i = 0; i < c.length - 1; i++) {
    const [y0, p0] = c[i], [y1, p1] = c[i + 1];
    if (year >= y0 && year <= y1) return { value: Math.round(p0 + (p1 - p0) * (year - y0) / (y1 - y0)) };
  }
  return { value: c[0][1] };
};

/* --------------------------------------------------------------------------
   Eras: what it was like. Narrative is our synthesis of the sourced facts.
   -------------------------------------------------------------------------- */
MW.eras = [
  {
    id: "lenape", from: 1500, to: 1665, name: "Lenapehoking",
    tagline: "Trails through the oak and chestnut woods",
    palette: ["#f3d9a4", "#c98b5b"],
    story: [
      "Long before there was a Maplewood, this land at the foot of the first Watchung ridge belonged to the Lenape. Their footpaths ran from the coast and Newark Bay up toward the mountain gaps.",
      "When English settlers later arrived, they followed those same paths. Three of them became the spines of the town you know: Ridgewood Road (the \"Upper Trail\"), Valley Street (the \"Lower Trail\"), and the route that became Springfield Avenue.",
      "Picture the East Branch of the Rahway River winding through bottomland, about 130 feet above sea level, with the ridge rising to roughly 550 feet on the western edge. No roads yet, only paths, cooking fires and seasonal camps."
    ],
    sources: ["wiki", "dhMtn"]
  },
  {
    id: "settlers", from: 1666, to: 1739, name: "Newark's Mountain Frontier",
    tagline: "Puritan families push west from the bay",
    palette: ["#f1e3bd", "#9c7a4a"],
    story: [
      "In 1666 Puritan families led by Robert Treat came from Connecticut and founded Newark. The next year they bought a huge tract from the Lenape, about 40,000 acres stretching from Newark Bay to the Watchung foothills.",
      "Over the following decades some settlers moved up to \"Newark Mountain\" and began clearing farms near the ridge and the Rahway River. Families named Smith, Brown, Pierson, Freeman, Ball and Gildersleeve came up what is now Ridgewood Road.",
      "Around 1718 Thomas Ball acquired a tract of about 400 acres, and his descendants would build some of the oldest houses still standing in town. Ebenezer Hedden held a 72-acre tract before 1740."
    ],
    sources: ["hmHist", "wiki", "dhJBall", "dhHouse"]
  },
  {
    id: "colonial", from: 1740, to: 1799, name: "Stone Farmhouses & Revolution",
    tagline: "Farms, a cooper's shop, and cavalry horses",
    palette: ["#efdcb0", "#8a5a3b"],
    story: [
      "In 1743 Timothy and Esther Ball built a farmhouse of sandstone quarried on Orange Mountain. Their initials are still carved in a stone of the chimney. In 1750 Jonas Ball's cooper shop, where barrels were made, went up beside Tuscan Road, then called the only road from Newark to Springfield.",
      "During the Revolution, the Ball property reportedly held a cavalry stable for 40 horses at what are now Ridgewood Road and Cedar Lane, with a lookout on the mountain. Local tradition says George Washington visited and may have slept in the room over the kitchen. No document has confirmed it.",
      "Around 1790 Obadiah Hedden built a farmhouse on Ridgewood Road. Its southern half still stands as the Durand-Hedden House. In 1798 the western farms were proclaimed \"Jefferson Village,\" after Thomas Jefferson."
    ],
    sources: ["dhTBall", "dhJBall", "dhHouse", "dhPost"]
  },
  {
    id: "village", from: 1800, to: 1859, name: "Jefferson Village & North Farms",
    tagline: "Mills, orchards, a turnpike and the iron horse",
    palette: ["#f0dfb8", "#6f6a3e"],
    story: [
      "Early in the 1800s the area was two farm hamlets. Jefferson Village lay along Ridgewood Road. North Farms, renamed Middleville around 1830, grew on the crest by Tuscan Road and Springfield Avenue, where stagecoaches stopped between Newark and Morristown.",
      "The Newark–Springfield Turnpike, today's Springfield Avenue, opened after 1806. Mills, a forge and shoe-making clustered near Valley Street, and Pierson's Mill was built in 1831. In the early 1840s Aaron Crowell's Clinton Valley Store opened near today's Town Hall. Local orchards grew apple varieties such as the \"Harrison\" and the \"Canfield.\"",
      "The Morris & Essex Railroad reached the area in 1838. Asher B. Durand, born in Jefferson Village in 1796, became a celebrated Hudson River School painter, and his engravings of Washington and Franklin appeared on the first U.S. postage stamps in 1847. In 1855 the inventor Seth Boyden retired to Middleville and bred the famous \"Hilton\" strawberries."
    ],
    sources: ["wiki", "dhMtn", "dhPost", "hmHist"]
  },
  {
    id: "railroad", from: 1860, to: 1903, name: "Maplewood Station & the New Township",
    tagline: "A depot, a name, and the first commuters",
    palette: ["#eadcc0", "#5d4b3b"],
    story: [
      "In 1860 John Shedden bought about 30 acres and gave an acre to the railroad for a station. It was named Maplewood, reportedly for a large maple near the depot, and that is the first appearance of the name. On April 1, 1861, the Township of South Orange was incorporated, taking in Jefferson Village, Middleville and South Orange village.",
      "By 1868 farms were being subdivided into house lots and the area began to turn into a railroad suburb. In 1871 James Ricalton arrived as the district's first permanent teacher. He later became famous as a globe-trotting photographer. In 1880 Middleville took the name Hilton when it got its own post office.",
      "Queen Anne houses with towers and shingles began to appear. Around 1898 a fire department was organized. In 1902 the railroad was raised onto an embankment and the present Maplewood station was built."
    ],
    sources: ["dhMtn", "wiki", "dhSep", "dhPost", "hmHist"]
  },
  {
    id: "boom", from: 1904, to: 1929, name: "The Great Suburban Boom",
    tagline: "Foursquares, Tudors, and a town gets its name",
    palette: ["#e8d9bd", "#4a3f35"],
    story: [
      "On March 4, 1904, the Village of South Orange split off, leaving the rest of the township as the place that would become Maplewood. Builder Edward C. Balch put up about 175 homes between 1903 and 1921, mostly foursquares with Colonial Revival and Arts & Crafts touches. The New York Times later called him the \"Father of Maplewood.\" Architect Kenneth W. Dalzell designed about 300 buildings from 1911 into the 1930s.",
      "The library was organized in 1913. On November 7, 1922, the township was officially renamed Maplewood. Planting of Memorial Park, designed with the Olmsted Brothers, began in 1923. In 1921 a dentist and Maplewood golfer, Dr. William Lowell, began making the wooden \"Reddy Tee.\" The Maplewood Theatre opened in 1927, and so did the new Columbia High School on Valley Street.",
      "The 1920s changed everything. The population jumped from 5,283 in 1920 to 21,321 in 1930. A 1926 zoning code even barred identical houses side by side, which is one reason Maplewood streets look the way they do."
    ],
    sources: ["dhSep", "hmHist", "wiki", "nps", "lowell", "cinema", "dhMtn"]
  },
  {
    id: "civic", from: 1930, to: 1945, name: "Brick, Lawns & Hard Times",
    tagline: "A civic center rises through the Depression and war",
    palette: ["#dfe0cf", "#3f4a44"],
    story: [
      "The town built its civic heart in Colonial Revival brick around Memorial Park. The police headquarters was dedicated on May 30, 1931, and the Municipal Building was completed in 1932. Most schools and the Municipal Building came from the architects Guilbert & Betelle.",
      "By the 1930s the shops along Maplewood Avenue were largely built out, much as you see them today. Even as a suburb of 21,000, Maplewood mail ran through South Orange, and a 1938–39 Woman's Club petition for a town post office gathered 4,133 signatures and was denied.",
      "In 1941 Cheryl Crawford staged her revival of Gershwin's Porgy and Bess at the Maplewood Theatre, and the production went on to Broadway."
    ],
    sources: ["dhMtn", "hmHist", "wiki", "dhPost", "crawford", "cinema"]
  },
  {
    id: "postwar", from: 1946, to: 1969, name: "Postwar Maplewood",
    tagline: "A post office at last, new libraries, and a flying disc",
    palette: ["#d9e7e4", "#2f4f5a"],
    story: [
      "In July 1947 Maplewood finally won first-class post office status, after a wait of 132 years since Jefferson Village first asked. In 1958 a new 16,000-square-foot post office opened at 160 Maplewood Avenue.",
      "The main library and the Hilton branch got new buildings in the 1950s. The population peaked around 25,000 in 1950. Downtown took on the look it largely keeps to this day.",
      "In 1968 students at Columbia High School invented the game of Ultimate Frisbee. A plaque in the school parking lot marks its birthplace."
    ],
    sources: ["dhPost", "hmHist", "wiki"]
  },
  {
    id: "preserve", from: 1970, to: 1999, name: "Saving the Past",
    tagline: "Preservationists, performers and the commuter train",
    palette: ["#e7e2d4", "#4f3b4a"],
    story: [
      "As old buildings disappeared across New Jersey, Maplewood began to protect its own. In 1977 the township bought the Durand-Hedden House with Green Acres funds, in a campaign led by Mayor Robert Grasmere. In 1979 the Durand-Hedden House & Garden Association was created to care for it. Historic preservation zoning followed in 1986.",
      "The YMCA was built in 1970 and the DeHart Park Community Center in 1984. In 1988 the former Christian Science church at 10 Durand Road was given to the town and became the Burgdorff Center for the Performing Arts.",
      "In 1996 NJ Transit's Midtown Direct service began running trains from Maplewood straight into Manhattan, and a new wave of New Yorkers discovered the town."
    ],
    sources: ["dhHouse", "hmHist", "wiki", "rail"]
  },
  {
    id: "today", from: 2000, to: 2026, name: "Maplewood Today",
    tagline: "Rainbow crosswalks, Maplewoodstock, and 250 years of Revolution",
    palette: ["#e2eedb", "#2d4a32"],
    story: [
      "Maplewood today has about 26,000 people. In 2004 Zach Braff filmed Garden State scenes here. In 2015 New Jersey Monthly named the town the winner of its Downtown Showdown. Permanent rainbow crosswalks were unveiled in 2018.",
      "In 2022 Maplewood and South Orange merged their fire departments into the South Essex Fire Department, more than a century after the two towns separated. Every summer Maplewoodstock fills Memorial Park with music.",
      "In 2026, the 250th anniversary of American independence, Durand-Hedden brought living-history reenactments to Ridgewood Road, the same road where cavalry horses were once stabled."
    ],
    sources: ["wiki", "dhMtn"]
  }
];

MW.eraFor = function (year) {
  return MW.eras.find(e => year >= e.from && year <= e.to) || MW.eras[MW.eras.length - 1];
};

/* --------------------------------------------------------------------------
   Places & events. lat/lon from OpenStreetMap geocoding of the address given.
   `year` = when the place/event begins; `end` = when it ends (optional).
   kind: house | civic | transport | nature | culture | event | commerce
   -------------------------------------------------------------------------- */
MW.places = [
  { id: "trails", year: 1500, title: "The Upper Trail", kind: "nature", address: "Ridgewood Road",
    lat: 40.7352, lon: -74.2789,
    text: "Ridgewood Road follows a Lenape trail that settlers called the Upper Trail. The Lower Trail became Valley Street. Both led down toward Newark Bay.",
    sources: ["dhMtn", "wiki"] },

  { id: "tball", year: 1743, title: "Timothy Ball House", kind: "house", address: "425 Ridgewood Road",
    lat: 40.7410874, lon: -74.2743972, landmark: true,
    text: "Built in 1743 by Timothy Ball, a grandson of Edward Ball, who settled in Newark in 1666. The front chimney carries a stone inscribed \"T. & E.B. 1743\" for Timothy and Esther (Bruen) Ball, and the house is built of sandstone from Orange Mountain. Timothy died of smallpox in 1758. In the Revolution the farm reportedly held a cavalry stable for 40 horses, and legend says Washington stayed here. The Balls owned it until 1853. In 1919 it was sold to the developers of Washington Park and restored with dormers and a portico, and for more than 30 years it ran as The Old Washington Inn. It is one of only two Maplewood houses recorded by the Historic American Buildings Survey.",
    sources: ["dhTBall", "hmDesig"] },

  { id: "jball", year: 1750, title: "Jonas Ball House", kind: "house", address: "88 Tuscan Road",
    lat: 40.725207, lon: -74.2664373, landmark: true,
    text: "Built in 1750 of fieldstone and timber as a cooper's shop, where barrels were made, on the south side of Tuscan Road. Jonas Ball, one of Thomas Ball's seven sons, received the land in the 1744 division. Later it served as a springhouse for the Courter farm, and in the late 1800s David Courter turned it into a home. In 1910 the Newark Realty Company bought the Courter farm and developed Mountain View Terrace around it.",
    sources: ["dhJBall", "hmDesig"] },

  { id: "cavalry", year: 1778, end: 1783, title: "Revolutionary Cavalry Stable", kind: "event", address: "Ridgewood Road & Cedar Lane",
    lat: 40.7425, lon: -74.2748,
    text: "During the Revolutionary War a cavalry stable for 40 horses reportedly stood at the corner of the Road to Springfield and Old Mountain Road, today's Ridgewood Road and Cedar Lane. A watchtower stood on the mountain at Coon Road.",
    sources: ["dhTBall"] },

  { id: "durand", year: 1790, title: "Durand-Hedden House", kind: "house", address: "523 Ridgewood Road",
    lat: 40.7352208, lon: -74.278885, landmark: true,
    text: "Obadiah Hedden built the original farmhouse around 1790. It is now the southern half of the house. In 1812 it was sold to Henry Durand, brother of the painter Asher B. Durand, and the Durand family kept it until about 1866. The northern half was added around the mid-1800s. The Ripley family owned it from 1923 to 1971. In 1977 the township bought it, and since 1979 it has been the home of the Durand-Hedden House & Garden Association, Maplewood's historical society, in Grasmere Park.",
    sources: ["dhHouse"] },

  { id: "jefferson", year: 1798, title: "Jefferson Village Proclaimed", kind: "event", address: "Ridgewood Road area",
    lat: 40.7335, lon: -74.2795,
    text: "In 1798 the western section of today's Maplewood was named Jefferson Village by proclamation, after Thomas Jefferson. Its center roughly matches downtown Maplewood. By 1815 about 30 families lived here, and their request for a post office was refused.",
    sources: ["dhPost", "wiki"] },

  { id: "durandbirth", year: 1796, title: "Birthplace of Asher B. Durand", kind: "culture", address: "Near Durand Road & Ridgewood Road",
    lat: 40.7322, lon: -74.2800,
    text: "Asher Brown Durand (1796–1886) was born in an earlier family house near Durand and Ridgewood Roads, which burned in 1843. He became a leading Hudson River School painter and the first president of the National Academy of Design. His engravings of Washington and Franklin were used on the first U.S. postage stamps in 1847. Durand Road was once called \"Artist Lane.\"",
    sources: ["dhHouse", "dhMtn", "dhPost", "hmHist"] },

  { id: "turnpike", year: 1806, title: "Newark–Springfield Turnpike", kind: "transport", address: "Springfield Avenue",
    lat: 40.7221, lon: -74.2620,
    text: "The Newark–Springfield Turnpike opened after 1806 and is now Springfield Avenue. The hamlet of North Farms near Tuscan Road became a stagecoach stop between Newark, Paulus Hook (Jersey City) and Morristown.",
    sources: ["hmHist", "wiki"] },

  { id: "babel", year: 1811, title: "Babel Chapel", kind: "culture", address: "Ridgewood Road & Bear Lane (historic)",
    lat: 40.7300, lon: -74.2830,
    text: "Jefferson Village's first house of worship was a Baptist chapel on land given by Caleb Durand at Ridgewood Road and Bear Lane. Sources date it to 1810–1812. It fell out of use in 1846 and became a Methodist Episcopal church in 1858.",
    sources: ["dhMtn", "wiki"] },

  { id: "school1818", year: 1817, title: "The First Schools", kind: "culture", address: "North Farms & Jefferson Village",
    lat: 40.7240, lon: -74.2640,
    text: "The North Farms Association school was founded in 1817 and the Jefferson Association school in 1818. South Orange's Columbian School, founded in 1814, became the basis of Columbia High School. The three were merged into one district after 1867 and formally became the South Orange–Maplewood district in 1894.",
    sources: ["wiki"] },

  { id: "pierson", year: 1831, title: "Pierson's Mill", kind: "commerce", address: "Valley Street & Pierson Road",
    lat: 40.7250, lon: -74.2805,
    text: "Pierson's Mill was built in 1831 at Valley Street and Pierson Road on the Rahway River. Mills, a forge and shoe-making made the Valley Street area the working heart of early Jefferson Village.",
    sources: ["dhMtn", "hmHist"] },

  { id: "middleville", year: 1830, title: "Middleville (North Farms)", kind: "event", address: "Tuscan Road & Springfield Avenue",
    lat: 40.7228, lon: -74.2610,
    text: "The crossroads hamlet of North Farms was renamed Middleville around 1830. In 1880 it became Hilton when it got its own post office, because the name Middleville was already taken elsewhere.",
    sources: ["wiki", "dhPost", "dhHilton"] },

  { id: "vanness", year: 1833, title: "Van Ness Home", kind: "house", address: "Boyden Avenue & Van Ness Terrace",
    lat: 40.7154, lon: -74.2565,
    text: "A Van Ness family home stood here around 1833 at Boyden Avenue and Van Ness Terrace in the Hilton section.",
    sources: ["dhMtn"] },

  { id: "railroad", year: 1838, title: "Morris & Essex Railroad", kind: "transport", address: "Railroad line through the center",
    lat: 40.7310, lon: -74.2754,
    text: "The Morris & Essex Railroad was chartered on January 29, 1835, and reached Morristown by 1838, passing through what would become Maplewood. Seth Boyden, who later retired to Hilton, built the line's early locomotive \"The Orange\" in 1837.",
    sources: ["dhMtn", "hmHist", "wiki"] },

  { id: "stonehouse", year: 1836, title: "Old Stone House", kind: "house", address: "22 Jefferson Avenue",
    lat: 40.735086, lon: -74.271191, landmark: true,
    text: "A locally designated landmark at 22 Jefferson Avenue. The Historic Preservation Commission's history mentions it with the flag stop on the early railroad around 1836.",
    sources: ["hmHist", "hmDesig"] },

  { id: "aaronbrown", year: 1805, title: "Aaron Brown House", kind: "house", address: "81 Parker Avenue",
    lat: 40.7356, lon: -74.2685, landmark: true,
    text: "Aaron Brown and Dorcas Ball Brown built or enlarged this center-hall farmhouse around 1805 and raised six children here. The Brown family kept it until 1896. Its double porches and wide-plank floors survive.",
    sources: ["hmDesig"] },

  { id: "ezekiel", year: 1694, title: "Ezekiel Ball House", kind: "house", address: "250 Elmwood Avenue",
    lat: 40.7273, lon: -74.2515, landmark: true,
    text: "Its oldest part may have been built for William Camp as early as about 1694, which could make it Maplewood's oldest house. Ezekiel Ball enlarged it around 1750, and it was used as a hospital for wounded soldiers during the Revolution.",
    sources: ["hmDesig"] },

  { id: "gildersleeve", year: 1765, title: "Gildersleeve House", kind: "house", address: "57 Jefferson Avenue",
    lat: 40.7349, lon: -74.2725, landmark: true,
    text: "The farmhouse of one of the area's earliest families, possibly built around 1765. Joseph Gildersleeve, who inherited it in 1810, became minister of the Jefferson Village Baptist Society.",
    sources: ["hmDesig"] },

  { id: "vauxhall", year: 1843, title: "Vaux Hall (Lewis Pierson House)", kind: "house", address: "693 Valley Street",
    lat: 40.7236, lon: -74.2782, landmark: true,
    text: "Miller Lewis Pierson built this temple-front Greek Revival house in 1843, beside the mill he started in 1831. The family lived in the barn while it was built. The Piersons owned it until 2000.",
    sources: ["hmDesig"] },

  { id: "headley", year: 1873, title: "Headley/Zellers House", kind: "house", address: "38 Burnett Avenue",
    lat: 40.7186, lon: -74.2638, landmark: true,
    text: "This farmhouse was probably built by Sears Headley, a Middleville storekeeper whose store later held a post office. Fruit grower Joseph Zellers bought it in 1897. It is one of the oldest buildings on Burnett Avenue.",
    sources: ["hmDesig"] },

  { id: "womansclub", year: 1930, title: "Woman's Club Clubhouse (The Woodland)", kind: "culture", address: "60 Woodland Road",
    lat: 40.732352, lon: -74.2777685, landmark: true,
    text: "The Woman's Club of Maplewood, founded in 1916, built this Clifford Wendehack clubhouse in 1929–30. By 1941 it was the largest woman's club in New Jersey. The township bought the building in 2013.",
    sources: ["hmDesig"] },

  { id: "store", year: 1841, title: "Clinton Valley Store", kind: "commerce", address: "Park Road & Valley Street",
    lat: 40.7298, lon: -74.2722,
    text: "In the early 1840s Aaron Crowell built the Clinton Valley Store, on what is now Park Road at Valley Street near Town Hall. Harry J. Baker bought a store in 1884 on what became Baker Street, and he served as postmaster from 1889 to 1909.",
    sources: ["dhPost"] },

  { id: "boyden", year: 1855, title: "Seth Boyden's Strawberries", kind: "culture", address: "Boyden Avenue, Hilton",
    lat: 40.7215386, lon: -74.254386,
    text: "The inventor Seth Boyden (1788–1870) retired to Middleville in 1855 and spent his last 15 years here, breeding the famous \"Hilton Strawberries.\" Boyden Avenue and Seth Boyden Elementary School are named for him.",
    sources: ["hmHist", "dhMtn", "wiki"] },

  { id: "station1860", year: 1860, end: 1901, title: "First Maplewood Station", kind: "transport", address: "Near Baker Street & Maplewood Avenue",
    lat: 40.7305, lon: -74.2765,
    text: "In 1860 John Shedden bought about 30 acres and gave an acre to the railroad for a station west of the tracks near Baker Street and Maplewood Avenue. It was named Maplewood, reportedly for a large maple near the depot, and this is the first appearance of the name.",
    sources: ["dhMtn", "hmHist", "wiki"] },

  { id: "township", year: 1861, title: "South Orange Township Incorporated", kind: "event", address: "Township-wide",
    lat: 40.7302, lon: -74.2716,
    text: "On April 1, 1861, the Township of South Orange was formed from parts of Clinton Township and the Town of Orange. Its first committee met on April 13, 1861. The township included the villages that would become both Maplewood and South Orange.",
    sources: ["dhSep", "dhMtn", "wiki"] },

  { id: "ricalton", year: 1871, title: "James Ricalton, Schoolmaster", kind: "culture", address: "Maplewood schools",
    lat: 40.7290, lon: -74.2745,
    text: "James Ricalton (1844–1929) came to Maplewood in 1871 as the district's first permanent teacher. He later traveled the world as a photographer.",
    sources: ["wiki"] },

  { id: "hilton", year: 1880, title: "Hilton Gets Its Name", kind: "event", address: "Springfield Avenue & Burnett Avenue",
    lat: 40.7190, lon: -74.2640,
    text: "In 1880 Middleville became Hilton and got its own post office. Charlie Stewart's general store at Springfield and Burnett Avenues held the post office, and Stewart served as Hilton's postmaster from 1879 to 1897.",
    sources: ["dhPost", "wiki"] },

  { id: "hickories", year: 1880, title: "\"The Hickories\"", kind: "house", address: "Roosevelt Road & Kermit Road area",
    lat: 40.7348, lon: -74.2828,
    text: "Theodore Roosevelt is said to have summered as a young man at \"The Hickories,\" his uncle's 100-acre estate, which lay partly under today's Roosevelt and Kermit Roads. The Roosevelt Park neighborhood grew up on the land.",
    sources: ["wiki"] },

  { id: "fire", year: 1898, title: "Fire Department Organized", kind: "civic", address: "Township",
    lat: 40.7299, lon: -74.2725,
    text: "A township fire department was organized around 1898. In 2022 it merged with South Orange's department to form the South Essex Fire Department.",
    sources: ["dhMtn", "wiki"] },

  { id: "station1902", year: 1902, title: "Maplewood Station (present)", kind: "transport", address: "Dunnell Road",
    lat: 40.7310095, lon: -74.2753901, landmark: true,
    text: "In 1902 the railroad tracks were raised onto an embankment and the present station was built on the east side at Dunnell Road. The Lackawanna electrified the line around 1930, and in 1996 Midtown Direct trains began running straight into Manhattan.",
    sources: ["hmHist", "dhMtn", "rail"] },

  { id: "separation", year: 1904, title: "South Orange Separates", kind: "event", address: "Township-wide",
    lat: 40.7320, lon: -74.2700,
    text: "After a referendum on March 2, 1904, the Village of South Orange separated from the township on March 4, 1904. The remaining township kept the name South Orange Township until 1922, which caused years of confusion.",
    sources: ["dhSep"] },

  { id: "balch", year: 1903, end: 1921, title: "Edward C. Balch's Houses", kind: "house", address: "South Watchung slopes; Balch died at 624 Ridgewood Road",
    lat: 40.729038, lon: -74.284221,
    text: "Builder Edward C. Balch (1858–1934) put up about 175 homes from 1903 to 1921, mostly foursquares with Colonial Revival and Arts & Crafts details, many on the slopes of the South Watchung ridge. The New York Times called him the \"Father of Maplewood.\" He died at 624 Ridgewood Road in 1934.",
    sources: ["hmHist", "wiki"] },

  { id: "trolley", year: 1908, title: "Trolleys on Springfield Avenue", kind: "transport", address: "Springfield Avenue",
    lat: 40.7212, lon: -74.2665,
    text: "Newark's first electric trolley line ran on Springfield Avenue. By about 1908 trolley service connected the Maplewood–Millburn area with Newark along Springfield Avenue.",
    sources: ["dhMtn", "rvrr"] },

  { id: "po1910", year: 1910, title: "Village Post Office", kind: "civic", address: "170 Maplewood Avenue",
    lat: 40.7308652, lon: -74.2776598,
    text: "In 1910 the post office moved to 170 Maplewood Avenue. Two years later Maplewood lost its own postmaster and became a substation of South Orange. It moved to a storefront at 92 Baker Street in 1926.",
    sources: ["dhPost"] },

  { id: "mvterrace", year: 1910, title: "Mountain View Terrace", kind: "house", address: "Around Tuscan Road",
    lat: 40.7240, lon: -74.2680,
    text: "In 1910 the Newark Realty Company bought the old Courter farm around the Jonas Ball House and laid out Mountain View Terrace.",
    sources: ["dhJBall"] },

  { id: "dalzell", year: 1911, title: "Kenneth Dalzell & Budal Realty", kind: "house", address: "Throughout Maplewood",
    lat: 40.7335, lon: -74.2840,
    text: "In 1911 architect Kenneth W. Dalzell and William Buchan Jr. incorporated the Budal Realty Company. Dalzell designed about 300 buildings from 1911 into the 1930s, including Tudor and Italian Renaissance Revival homes, and in 1921 he published \"Homes of Moderate Size.\"",
    sources: ["hmHist"] },

  { id: "library", year: 1913, title: "Maplewood Memorial Library", kind: "culture", address: "51 Baker Street",
    lat: 40.7295345, lon: -74.2757733, landmark: true,
    text: "The library was organized in 1913 and became a free public library in 1922. The main library on Baker Street and the Hilton branch got their present buildings in the 1950s. Today its digital archive holds city directories, photographs and scrapbooks, plus a real estate file donated by a retired local realtor.",
    sources: ["dhMtn", "hmHist", "library"] },

  { id: "washpark", year: 1919, title: "Washington Park & The Old Washington Inn", kind: "commerce", address: "425 Ridgewood Road",
    lat: 40.7414, lon: -74.2738,
    text: "In 1919 the Timothy Ball House was sold to the developers of Washington Park. They restored it and opened The Old Washington Inn, which operated for more than 30 years.",
    sources: ["dhTBall"] },

  { id: "tee", year: 1921, title: "The Reddy Tee", kind: "culture", address: "Maplewood Country Club",
    lat: 40.7256647, lon: -74.2785945,
    text: "Dr. William Lowell, a dentist and Maplewood golfer, began making the wooden \"Reddy Tee\" in 1921. Golf star Walter Hagen used it on exhibition tours starting in 1922, and it changed how the game was played. Sources differ on details. Some put the invention at the Maplewood club, and the patent dates to about 1925.",
    sources: ["lowell", "wiki"] },

  { id: "rename", year: 1922, title: "Officially \"Maplewood\"", kind: "event", address: "Township-wide",
    lat: 40.7302531, lon: -74.2715614,
    text: "On November 7, 1922, the Township of South Orange officially became the Township of Maplewood, adopting the name the railroad station had carried since 1860. John S. DeHart was mayor that year.",
    sources: ["dhSep", "wiki"] },

  { id: "mpark", year: 1923, title: "Memorial Park", kind: "nature", address: "Between the station and Valley Street",
    lat: 40.7304421, lon: -74.2740888, landmark: true,
    text: "Designed by Brinley & Holbrook with the Olmsted Brothers, the 25-acre park beside the station was planted from 1923 to about 1925. It was the only part of the Olmsted plan for Maplewood that was actually built. The Olmsted firm wanted a granite base for the War Memorial and the committee chose a boulder instead. The park is on the State and National Registers of Historic Places.",
    sources: ["nps", "wiki", "hmHist"] },

  { id: "ward", year: 1925, title: "Ward Homestead", kind: "civic", address: "333 Elmwood Avenue",
    lat: 40.7267524, lon: -74.254934,
    text: "The Ward Homestead was started in 1925 and opened in 1927, funded by the will of Marcus L. Ward. John Russell Pope designed it with Olmsted Brothers landscaping. It is now Winchester Gardens.",
    sources: ["dhMtn", "wiki"] },

  { id: "theater", year: 1927, title: "Maplewood Theatre", kind: "culture", address: "155 Maplewood Avenue",
    lat: 40.7314564, lon: -74.2765702, landmark: true,
    text: "Designed by William E. Lehman, the Maplewood Theatre opened in 1927 as one of New Jersey's large combined vaudeville and movie houses. In 1941 Cheryl Crawford staged her revival of Porgy and Bess here, and it went on to Broadway.",
    sources: ["cinema", "wiki", "dhTheater", "crawford"] },

  { id: "chs", year: 1927, title: "Columbia High School", kind: "civic", address: "17 Parker Avenue (Valley St & Parker Ave)",
    lat: 40.7348213, lon: -74.2663698, landmark: true,
    text: "The present Columbia High School opened in September 1927 at Valley Street and Parker Avenue, at a cost of over $2,000,000. In 1968 students here invented Ultimate Frisbee, and a plaque marks the spot. The school traces its roots to South Orange's Columbian School of 1814.",
    sources: ["dhMtn", "wiki"] },

  { id: "townshiphall", year: 1912, end: 1931, title: "Township Hall (by 1912)", kind: "civic", address: "Maplewood Avenue near Highland Place (approx.)",
    lat: 40.7302, lon: -74.2765,
    text: "The 1912 Sanborn fire-insurance map of South Orange Township shows a frame \"Township Hall\" on Maplewood Avenue just south of the station, on the west side of the tracks, beside the firehouse of Maplewood Hook & Ladder Co. No. 1 and Maplewood Hose Co. No. 1. When it was built is not recorded on the map. Its successor, the Municipal Building on Valley Street, opened in 1931–32.",
    sources: ["sanborn1912"] },

  { id: "townhall", year: 1931, title: "Municipal Building (Town Hall)", kind: "civic", address: "574 Valley Street",
    lat: 40.7302531, lon: -74.2715614, landmark: true,
    text: "By the mid-1920s the fast-growing township badly needed a new town hall. Police headquarters was dedicated on May 30, 1931, and the Colonial Revival Municipal Building by Guilbert & Betelle was completed in 1932. It is listed on the National Register of Historic Places.",
    sources: ["dhMtn", "hmHist", "wiki"] },

  { id: "porgy", year: 1941, title: "Porgy and Bess Revival", kind: "culture", address: "155 Maplewood Avenue",
    lat: 40.7318, lon: -74.2769,
    text: "Producer Cheryl Crawford made the Maplewood Theatre her theatrical home in the early 1940s. Her 1941 revival of Gershwin's Porgy and Bess was advertised in New York that August and later moved to Broadway.",
    sources: ["crawford", "cinema"] },

  { id: "po1947", year: 1947, title: "A Post Office at Last", kind: "civic", address: "160 Maplewood Avenue",
    lat: 40.7306, lon: -74.2772,
    text: "In July 1947, 132 years after Jefferson Village first asked, Maplewood won first-class post office status. A new 16,000-square-foot post office by architect Alfred O. Pollitt opened at 160 Maplewood Avenue in 1958.",
    sources: ["dhPost"] },

  { id: "hiltonlib", year: 1950, title: "Hilton Branch Library", kind: "culture", address: "1688 Springfield Avenue",
    lat: 40.722145, lon: -74.259872, landmark: true,
    text: "The Hilton branch library got its building in the 1950s. Behind it is the Robert H. Grasmere Local History Center, run by Durand-Hedden, which holds photographs, postcards, maps and real estate files for researching your house.",
    sources: ["hmHist", "dhCenter", "hmResearch"] },

  { id: "frisbee", year: 1968, title: "Birthplace of Ultimate Frisbee", kind: "culture", address: "Columbia High School parking lot",
    lat: 40.7352, lon: -74.2658,
    text: "In 1968 students at Columbia High School invented Ultimate Frisbee. A plaque in the student parking lot marks the birthplace of the sport.",
    sources: ["wiki"] },

  { id: "ymca", year: 1970, title: "Maplewood YMCA", kind: "civic", address: "Ridgewood Road",
    lat: 40.7323139, lon: -74.2810653,
    text: "The YMCA building went up in 1970.",
    sources: ["hmHist"] },

  { id: "saved", year: 1977, title: "Durand-Hedden Saved", kind: "event", address: "523 Ridgewood Road",
    lat: 40.7356, lon: -74.2784,
    text: "In 1977 the township bought the Durand-Hedden House with Green Acres help, after a campaign led by Mayor Robert Grasmere. The Durand-Hedden House & Garden Association followed in 1979.",
    sources: ["dhHouse"] },

  { id: "dehart", year: 1984, title: "DeHart Park Community Center", kind: "nature", address: "DeHart Park",
    lat: 40.7183328, lon: -74.2611945,
    text: "The DeHart Park Community Center opened in 1984 in the Hilton section's DeHart Park.",
    sources: ["hmHist"] },

  { id: "burgdorff", year: 1988, title: "Burgdorff Center for the Performing Arts", kind: "culture", address: "10 Durand Road",
    lat: 40.7319037, lon: -74.2762489,
    text: "The former Christian Science church on Durand Road, the old \"Artist Lane,\" was donated by Jean Burgdorff and transferred to the town on October 15, 1988. It is now a performing arts center.",
    sources: ["wiki"] },

  { id: "midtown", year: 1996, title: "Midtown Direct", kind: "transport", address: "Maplewood Station",
    lat: 40.7313, lon: -74.2750,
    text: "In 1996 NJ Transit's Midtown Direct service gave Maplewood a one-seat ride to New York Penn Station, the biggest commuting change since the railroad arrived in 1838.",
    sources: ["rail"] },

  { id: "rainbow", year: 2018, title: "Rainbow Crosswalks", kind: "event", address: "Maplewood Village",
    lat: 40.7311, lon: -74.2772,
    text: "Permanent rainbow crosswalks were unveiled in Maplewood Village in June 2018.",
    sources: ["wiki"] },

  { id: "sefd", year: 2022, title: "South Essex Fire Department", kind: "civic", address: "Maplewood & South Orange",
    lat: 40.7296, lon: -74.2729,
    text: "In 2022 the Maplewood and South Orange fire departments merged as the South Essex Fire Department. The two towns had separated in 1904.",
    sources: ["wiki"] },

  { id: "rev250", year: 2026, title: "Revolution 250 at Durand-Hedden", kind: "event", address: "523 Ridgewood Road",
    lat: 40.7349, lon: -74.2793,
    text: "For America's 250th, Durand-Hedden hosted living-history reenactments and talks on Ridgewood Road, the same road where cavalry horses were stabled during the Revolution.",
    sources: ["dhMtn"] }
];

MW.places.sort((a, b) => a.year - b.year);

/* --------------------------------------------------------------------------
   Historic sections of town, used to tell an address's neighborhood story.
   Centers are approximate. Assignment is by nearest center.
   -------------------------------------------------------------------------- */
MW.sections = [
  { id: "jv", name: "Jefferson Village & the Ridgewood Road farms", lat: 40.7350, lon: -74.2805,
    colonial: "In colonial times this was farmland along the Upper Trail, today's Ridgewood Road. It was settled by families such as the Balls, Heddens, Durands, Smiths and Piersons. Before 1835 the Ridgewood Road farms belonged to Springfield Township, and in 1798 they were proclaimed part of Jefferson Village.",
    growth: "As the 1900s began, the slopes of the South Watchung ridge filled with Edward Balch's foursquares and Kenneth Dalzell's Tudors and Colonial Revivals. Theodore Roosevelt's uncle's estate, \"The Hickories,\" became the streets of Roosevelt Park.",
    sources: ["dhMtn", "dhPost", "hmHist", "wiki"] },
  { id: "center", name: "Maplewood Center (the Village)", lat: 40.7308, lon: -74.2765,
    colonial: "This was open farmland between the Upper and Lower Trails until the railroad cut through in 1838. In 1860 John Shedden gave the railroad an acre for a station, and the name \"Maplewood\" was born here.",
    growth: "Harry Baker's store in 1884 started the business district along Baker Street and Maplewood Avenue. The 1902 elevated station, the 1927 theater and the 1920s–30s Colonial Revival civic buildings around Memorial Park made this the heart of town. By the 1930s the commercial core was largely built out.",
    sources: ["dhMtn", "dhPost", "hmHist"] },
  { id: "valley", name: "the Valley Street corridor & College Hill", lat: 40.7335, lon: -74.2690,
    colonial: "Valley Street follows the old Lower Trail. Before 1835 the farms from Valley Street southeast belonged to Orange Township. By the early 1800s mills, a forge and shoe-making clustered near the Rahway River here, including Pierson's Mill (1831) and Aaron Crowell's Clinton Valley Store (early 1840s).",
    growth: "Farmland became the suburb of College Hill, known for its eclectic houses, and in 1927 Columbia High School rose at Valley Street and Parker Avenue. The Municipal Building (1932) anchors the corridor's southern end.",
    sources: ["dhMtn", "dhPost", "hmHist"] },
  { id: "tuscan", name: "the Tuscan Road & Mountain View Terrace area", lat: 40.7250, lon: -74.2690,
    colonial: "Tuscan Road was once described as the only road from Newark to Springfield. Thomas Ball's 400-acre tract (about 1718) covered much of this ground. His son Jonas built a stone cooper's shop here in 1750, and it still stands at 88 Tuscan Road.",
    growth: "In 1910 the Newark Realty Company turned the old Courter farm into Mountain View Terrace. The 1920s boom filled the streets toward Prospect Street and Tuscan School with new homes.",
    sources: ["dhJBall", "dhMtn"] },
  { id: "hilton", name: "Hilton (old North Farms / Middleville)", lat: 40.7205, lon: -74.2600,
    colonial: "This was North Farms, a hamlet on the hill crest near Tuscan Road and Springfield Avenue and a stagecoach stop on the route between Newark and Morristown. It became Middleville around 1830 and Hilton in 1880. Seth Boyden retired here in 1855 and grew the famous Hilton strawberries.",
    growth: "The Newark–Springfield Turnpike, later Springfield Avenue, brought stores, trolleys and, on Boyden Avenue, a Rahway Valley Railroad station called \"Hilton\" (renamed Newark Heights in 1921). Maplecrest Park and the Hilton branch library came in the 20th century.",
    sources: ["wiki", "hmHist", "dhPost", "dhMtn", "rvrr"] },
  { id: "golf", name: "the Golf Island & country club area", lat: 40.7255, lon: -74.2790,
    colonial: "This was low ground along the East Branch of the Rahway River, near Pierson's Mill at Valley Street and Pierson Road.",
    growth: "The Maplewood Country Club's course shaped the neighborhood around it, and the Historic Preservation Commission has surveyed it as \"Golf Island.\" Dr. William Lowell's 1921 Reddy Tee is linked to Maplewood golf.",
    sources: ["dhMtn", "hmResearch", "lowell"] },
  { id: "north", name: "the northern Ridgewood Road & Washington Park area", lat: 40.7410, lon: -74.2735,
    colonial: "This is the Ball family's old ground, near the brook that once divided Orange from Springfield. Timothy Ball's 1743 stone house still stands at 425 Ridgewood Road. In the Revolution, cavalry horses were reportedly stabled near Ridgewood Road and Cedar Lane.",
    growth: "In 1919 the Timothy Ball farm was sold to the developers of Washington Park, and the old house became The Old Washington Inn while new homes went up around it.",
    sources: ["dhTBall"] },
  { id: "east", name: "the eastern streets toward Irvington & South Orange", lat: 40.7330, lon: -74.2560,
    colonial: "These were the outlying fields of Newark's back country. The Newark settlers' 1667 purchase stretched from the bay to these Watchung foothills.",
    growth: "In the 1920s boom, these streets filled with new homes as Maplewood's population quadrupled, served by schools such as Clinton Elementary and by the Ward Homestead (1927) on Elmwood Avenue.",
    sources: ["hmHist", "dhMtn"] }
];

/* Approximate historic road lines (for "nearest old road" in house stories). */
MW.oldRoads = [
  { name: "Ridgewood Road (the Upper Trail)", pts: [[40.7432, -74.2750], [40.7411, -74.2744], [40.7354, -74.2776], [40.7352, -74.2789], [40.7323, -74.2811], [40.7290, -74.2842]] },
  { name: "Valley Street (the Lower Trail)", pts: [[40.7410, -74.2627], [40.7381, -74.2653], [40.7350, -74.2672], [40.7303, -74.2716], [40.7274, -74.2735], [40.7234, -74.2785]] },
  { name: "Springfield Avenue (the 1806 Turnpike)", pts: [[40.7229, -74.2533], [40.7225, -74.2573], [40.7221, -74.2599], [40.7212, -74.2665]] },
  { name: "Tuscan Road (once \"the only road from Newark to Springfield\")", pts: [[40.7262, -74.2731], [40.7252, -74.2664], [40.7230, -74.2626], [40.7215, -74.2569]] },
  { name: "the Morris & Essex rail line (1838)", pts: [[40.7385, -74.2665], [40.7350, -74.2710], [40.7310, -74.2754], [40.7270, -74.2800], [40.7235, -74.2850]] }
];

/* Architectural styles common in Maplewood (Historic Preservation Commission). */
MW.styles = [
  { id: "colonial", name: "Colonial Farmhouse", from: 1700, to: 1830, desc: "Fieldstone or timber-frame farmhouses with a big central chimney, like the Ball and Hedden houses." },
  { id: "federal", name: "Village Farmhouse", from: 1831, to: 1879, desc: "Simple gabled frame houses of the Jefferson Village and Middleville farm era." },
  { id: "queenanne", name: "Queen Anne", from: 1880, to: 1902, desc: "c.1880–1920. Asymmetry, towers, patterned shingles, turned wood porches." },
  { id: "foursquare", name: "American Foursquare", from: 1903, to: 1916, desc: "Late 1890s–1930. A boxy two-story cube with a hipped roof, dormer and full front porch. Edward Balch built many of them." },
  { id: "tudor", name: "Tudor Revival", from: 1917, to: 1929, desc: "1890–1930s. Steep gables, half-timbering, stucco and casement windows. A Dalzell favorite." },
  { id: "colrev", name: "Colonial Revival", from: 1930, to: 1945, desc: "1876–mid-20th c. Symmetrical, with a central entrance and pediments. Like the brick civic buildings around Memorial Park." },
  { id: "cape", name: "Cape Cod / Postwar", from: 1946, to: 1969, desc: "Compact postwar homes with a steep roof and dormers, filling in the last open lots." },
  { id: "modern", name: "Contemporary", from: 1970, to: 2100, desc: "Infill, additions and renovations on Maplewood's older housing stock." }
];
MW.styleFor = y => MW.styles.find(s => y >= s.from && y <= s.to) || MW.styles[MW.styles.length - 1];

/* Geography helpers */
MW.geo = {
  distM(a, b) { // haversine in meters; a,b = [lat,lon]
    const R = 6371000, toR = Math.PI / 180;
    const dLat = (b[0] - a[0]) * toR, dLon = (b[1] - a[1]) * toR;
    const s = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * toR) * Math.cos(b[0] * toR) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(s));
  },
  distToLineM(p, pts) {
    // project to local meters, then point-to-segment distance
    const k = 111320, kx = k * Math.cos(p[0] * Math.PI / 180);
    const P = [0, 0];
    const Q = pts.map(q => [(q[1] - p[1]) * kx, (q[0] - p[0]) * k]);
    let best = Infinity;
    for (let i = 0; i < Q.length - 1; i++) {
      const [ax, ay] = Q[i], [bx, by] = Q[i + 1];
      const dx = bx - ax, dy = by - ay;
      const t = Math.max(0, Math.min(1, ((P[0] - ax) * dx + (P[1] - ay) * dy) / (dx * dx + dy * dy || 1)));
      const cx = ax + t * dx, cy = ay + t * dy;
      best = Math.min(best, Math.hypot(cx, cy));
    }
    return best;
  },
  fmt(m) {
    const mi = m / 1609.34;
    if (mi < 0.1) return Math.round(m * 3.281 / 10) * 10 + " feet";
    return mi.toFixed(mi < 1 ? 2 : 1) + " miles";
  },
  walkMin(m) { return Math.max(1, Math.round(m / 80)); }
};
