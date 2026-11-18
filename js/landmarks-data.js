/* Landmark pages: researched histories. Facts are from the sources listed with each landmark;
   where sources disagree the text says so. Photos are public domain or Creative Commons (credited). */
(function () {
  const S = {
    hpc: (name, file) => ({ label: `Maplewood Historic Preservation Commission: ${name} designation report`, url: `https://www.historicmaplewood.com/wp-content/uploads/${file}.pdf` }),
    hpcPage: (name, slug) => ({ label: `Maplewood Historic Preservation Commission: ${name}`, url: `https://www.historicmaplewood.com/${slug}/` }),
    dh: (title, slug) => ({ label: `Durand-Hedden: ${title}`, url: `https://www.durandhedden.org/post/${slug}` }),
    commons: (title, file) => ({ label: `Wikimedia Commons: ${title}`, url: `https://commons.wikimedia.org/wiki/File:${file}` }),
    wiki: (title, slug) => ({ label: `Wikipedia: ${title}`, url: `https://en.wikipedia.org/wiki/${slug}` }),
    nrhp: { label: "Wikipedia: National Register of Historic Places listings in Essex County, New Jersey", url: "https://en.wikipedia.org/wiki/National_Register_of_Historic_Places_listings_in_Essex_County,_New_Jersey" },
    libPanels: { label: "Maplewood Memorial Library: Library History Exhibit Panels", url: "https://www.digifind-it.com/maplewood/data/exhibit-panels/Library%20History%20Exhibit%20Panels.pdf" },
    dhTheaterNews: { label: "Durand-Hedden newsletter (Jan. 2015): the Maplewood Theater", url: "https://www.durandhedden.org/post/maplewood-theater" },
    cinema: { label: "Cinema Treasures: Maplewood Theatre", url: "https://www.cinematreasures.org/theaters/2867" },
    pnj: { label: "Preservation New Jersey: residents fear redevelopment endangers historic theater", url: "https://preservationnj.org/maplewood-residents-fear-downtown-redevelopment-endangers-historic-theater/" },
    mcc: { label: "Maplewood Country Club: History (Michael Davidson, 2018)", url: "https://maplewoodcc.clubhouseonline-e3.com/About/Maplewood_History.aspx" },
    nps: { label: "National Park Service: Maplewood Memorial Park", url: "https://www.nps.gov/places/maplewood-park-new-jersey.htm" },
    conservancy: { label: "Maplewood Memorial Park Conservancy: About", url: "https://maplewoodmemorialparkconservancy.org/about/" },
    matters: { label: "Matters Magazine: Finding Home by the Tracks (2024)", url: "https://www.mattersmagazine.com/post/finding-home-by-the-tracks-by-joy-yagid" },
    vg103: { label: "The Village Green: 250-year-old Maplewood house razed (2023)", url: "https://villagegreennj.com/towns/maplewood/250-year-old-maplewood-house-razed-by-same-developer-who-clear-cut-trees-in-south-orange-without-permit/" }
  };
  const PD_HABS = "Public domain (Historic American Buildings Survey)";

  MW.landmarks = {
    tball: {
      name: "Timothy Ball House", type: "Colonial farmhouse", kind: "house", place: "tball", built: 1743, builtLabel: "1743",
      address: "425 Ridgewood Road", lat: 40.7410874, lon: -74.2743972,
      designation: "Local landmark; recorded by the Historic American Buildings Survey (HABS NJ-50)",
      tagline: "A 1743 sandstone farmhouse that legend says sheltered George Washington, and later became an inn.",
      sections: [
        { h: "A farm at the foot of the mountain", p: [
          "Timothy Ball, a grandson of Edward Ball who settled in Newark in 1666, married Esther Bruen in 1734. The couple lived first in a small cabin before building this house of sandstone quarried on Orange Mountain. A stone in the front chimney is inscribed \"T. & E.B. 1743\". The original kitchen, with its massive hearth and bake oven, is the oldest part of the house.",
          "Timothy died in a smallpox epidemic in 1758. The Ball family kept the property until 1853, and Uzal Ball's land was divided in 1802."] },
        { h: "The Revolution", p: [
          "During the Revolutionary War a cavalry stable for 40 horses reportedly stood just north of the house, near today's Ridgewood Road and Cedar Lane (West Cedar Lane), with a watchtower on the mountain at Coon Road.",
          "Local tradition holds that George Washington stayed here during the Battle of Springfield in June 1780, perhaps in the room over the kitchen. The house is fairly close to the battle area and even closer to the skirmish at the Vaux Hall (Littel's) Bridge. No document has confirmed Washington's stay."] },
        { h: "The Old Washington Inn", p: [
          "In 1919 the property was sold to the developers of Washington Park. They restored the house, added three dormers and a portico, and ran it as The Old Washington Inn for more than 30 years.",
          "In 1936 photographers from the Historic American Buildings Survey documented the house. It is one of only two Maplewood houses recorded by the survey, and those Depression-era photographs and measured drawings are now in the public domain."] }
      ],
      facts: ["The date stone \"T. & E.B. 1743\" is still in the chimney.", "The house is built of local ashlar sandstone on the lower story, with painted wood above.", "It is one of two Maplewood houses in the Historic American Buildings Survey. The other is the Old Stone House on Jefferson Avenue."],
      timeline: [{ y: 1734, t: "Timothy Ball marries Esther Bruen" }, { y: 1743, t: "Stone farmhouse built" }, { y: 1758, t: "Timothy dies of smallpox" }, { y: 1780, t: "Battle of Springfield; Washington legend" }, { y: 1853, t: "Ball family ownership ends" }, { y: 1919, t: "Becomes the Old Washington Inn" }, { y: 1936, t: "Documented by HABS" }],
      photos: [
        { src: "img/loc/2016852397.jpg", year: 1921, caption: "\"Ye Old Washington Inn\" (Timothy Ball House), Washington Park, Ridgewood Road, February 9, 1921", credit: "National Photo Company / Library of Congress", license: "No known restrictions on publication", link: "https://www.loc.gov/item/2016852397/" },
        { src: "img/landmarks/tball-1936-ne.jpg", year: 1936, caption: "North and east elevations", credit: "John Spinola, Historic American Buildings Survey", license: PD_HABS, link: "https://commons.wikimedia.org/wiki/Category:Timothy_Ball_House_(Maplewood,_New_Jersey)", hero: true },
        { src: "img/landmarks/tball-habs-sheet.jpg", year: 1936, caption: "HABS measured drawing, title sheet", credit: "Historic American Buildings Survey", license: PD_HABS, link: "https://commons.wikimedia.org/wiki/Category:Timothy_Ball_House_(Maplewood,_New_Jersey)" }
      ],
      photoLinks: [S.hpcPage("Timothy Ball House (1936 Washington Inn photo)", "timothy-ball-house")],
      sources: [S.hpc("Timothy Ball House", "Timothy-Ball-House-Designation-Report"), S.hpcPage("Timothy Ball House", "timothy-ball-house"), S.dh("Timothy Ball House, 1743", "timothy-ball-house-1743"), S.matters]
    },

    durand: {
      name: "Durand-Hedden House", type: "Farmhouse & museum", kind: "house", place: "durand", built: 1790, builtLabel: "c. 1790",
      address: "523 Ridgewood Road (Grasmere Park)", lat: 40.7352208, lon: -74.278885,
      designation: "Local landmark", tagline: "A 1790 farmhouse tied to the painter Asher B. Durand, saved from demolition and now Maplewood's historical society.",
      sections: [
        { h: "The Heddens' farm", p: [
          "Ebenezer Hedden held a 72-acre tract here before 1740. His son Obadiah took title in 1787 and built a small post-and-beam, side-hall farmhouse around 1790. It is now the southern half of the house. The 1790 tax ratables list Obadiah with 50 acres, 3 horses, 4 cattle and one enslaved person.",
          "Obadiah sold in 1804 to Dr. Watts Bonnel, who sold in 1812 to his neighbor Henry Durand."] },
        { h: "The Durands", p: [
          "Henry Durand (born 1780) and his wife Electa Baldwin raised their family here until Henry's death in 1846. Henry's brother was Asher B. Durand, the Hudson River School painter, who was born nearby in 1796 in an earlier family house at Ridgewood and Durand Roads that burned in 1843. Henry and another brother, Cyrus, were inventors whose machines improved bank-note engraving.",
          "Their son James Madison Durand owned the house until about 1866. The larger northern half was added in the mid-19th century."] },
        { h: "Saved", p: [
          "The William Chauncey Ripley family bought the house in 1923 and lived there until 1971. By the 1970s it had fallen into disrepair and was threatened with demolition. Mayor Robert Grasmere led a campaign to save it, and the town bought it in 1977 with help from the state Green Acres program.",
          "The Durand-Hedden House & Garden Association was created in 1979. The Woman's Club helped found it. The house now stands on about two acres of gardens and meadows in Grasmere Park. In 2014 it was repainted straw and green, colors based on paint analysis, with help from a $15,000 New Jersey Historic Trust grant."] }
      ],
      facts: ["In August 2010 paranormal investigators spent a night in the house. They reported odd sounds but nothing conclusive.", "Asher B. Durand's engravings of Washington and Franklin were used on the first U.S. postage stamps in 1847.", "The slate roof is more than 100 years old."],
      timeline: [{ y: 1787, t: "Obadiah Hedden takes title" }, { y: 1790, t: "Farmhouse built" }, { y: 1812, t: "Henry Durand buys the house" }, { y: 1846, t: "Henry Durand dies" }, { y: 1866, t: "Durand ownership ends (about)" }, { y: 1923, t: "Ripley family buys it" }, { y: 1977, t: "Township buys it with Green Acres help" }, { y: 1979, t: "Durand-Hedden Association founded" }, { y: 2014, t: "Historic exterior colors restored" }],
      photos: [], photoLinks: [S.hpcPage("Durand-Hedden House photo", "durand-hedden-house"), { label: "Durand-Hedden House & Garden", url: "https://www.durandhedden.org" }],
      sources: [S.hpc("Durand-Hedden House", "Durand-Hedden-Designation-Report"), S.dh("A Brief History of the Durand-Hedden House", "a-brief-history-of-the-durand-hedden-house"), S.dh("Repainting the Durand-Hedden House", "repainting-the-durand-hedden-house"), S.dh("Catching the Spirit", "catching-the-spirit")]
    },

    jball: {
      name: "Jonas Ball House (Spring House)", type: "Colonial stone building", kind: "house", place: "jball", built: 1750, builtLabel: "1750",
      address: "88 Tuscan Road", lat: 40.725207, lon: -74.2664373, designation: "Local landmark",
      tagline: "A 1750 fieldstone cooper's shop that became a springhouse, then a home.",
      sections: [
        { h: "Thomas Ball's sons", p: [
          "Around 1718 Thomas Ball acquired a tract of about 400 acres. He and Sarah Ball had nine sons and three daughters. In 1744 their son Jonas married Hannah Bruen and built a home next to his father's on the north side of Tuscan Road, on 47.5 acres. That house is gone.",
          "In 1750 Jonas acquired 18 acres on the south side of Tuscan Road and built this stone structure. Tuscan Road was once described as the only road from Newark to Springfield."] },
        { h: "Barrels, milk and a home", p: [
          "The building was first a cooperage, where barrels were made. Later it served as a springhouse and milk-house for a dairy. Elizabeth Bruen sold the farm to Abel Atwood in 1828, and William Courter bought it around 1840. In the late 19th century David Courter converted the stone shop into a residence.",
          "In 1910 the Newark Realty Company bought the Courter farm and laid out Mountain View Terrace around the old stone building."] }
      ],
      facts: ["A sweet gum tree about 75 feet tall, reported to be more than 200 years old, stands between the house and the garage.", "Jonas was one of Thomas Ball's nine sons. His brothers Timothy and Ezekiel also have landmark houses in Maplewood."],
      timeline: [{ y: 1718, t: "Thomas Ball acquires about 400 acres" }, { y: 1744, t: "Jonas Ball marries Hannah Bruen and builds north of Tuscan Rd" }, { y: 1750, t: "Stone cooper's shop built" }, { y: 1828, t: "Farm sold to Abel Atwood" }, { y: 1840, t: "William Courter buys the farm (about)" }, { y: "late 1800s", t: "David Courter converts it to a residence" }, { y: 1910, t: "Mountain View Terrace laid out" }],
      photos: [], photoLinks: [S.hpcPage("Jonas Ball House photo", "jonas-ball-house")],
      sources: [S.hpc("Jonas Ball House", "Jonas-Ball-Designation-Report"), S.dh("Jonas Ball House, 1750", "jonas-ball-house-1750")]
    },

    ezekiel: {
      name: "Ezekiel Ball House", type: "Colonial farmhouse", kind: "house", built: 1694, builtLabel: "c. 1694–1750",
      address: "250 Elmwood Avenue (aka 254)", lat: 40.7273, lon: -74.2515, approx: true, designation: "Local landmark",
      tagline: "Possibly Maplewood's oldest house. It was used as a hospital for wounded soldiers in the Revolution.",
      sections: [
        { h: "Older than the town", p: [
          "The earliest part of this house may have been built for William Camp as early as about 1694. Further architectural and archaeological study could confirm the date. By the mid-18th century it belonged to Ezekiel Ball, another of Thomas Ball's nine sons, who added a two-story section to the west around 1750.",
          "Ezekiel's son Edward owned the house from 1802 to 1815 and built the latest addition. Since then there have been few major exterior changes."] },
        { h: "A Revolutionary hospital", p: [
          "During the Revolutionary War the house was used as a hospital for wounded soldiers. Later the surrounding farmland was sold off. The house is the only building left from Ezekiel Ball's farm, surrounded on three sides by houses built in the mid-to-late 1920s on his former fields."] },
        { h: "A long chain of owners", p: [
          "The designation report traces a long list of owners. Ezekiel Ball (1747–1802), Edward Ball and Captain Thomas Baldwin were followed by a series of 19th-century owners, including William R. Sayre, who sold 11 acres for $930 in 1844, and the Greenaway family. In 1946 the house passed to John J. Herman, and the Herman family kept it until 2000."] }
      ],
      facts: ["It may predate the Timothy Ball House by about 50 years.", "Ezekiel's brother Timothy built the 1743 stone house on Ridgewood Road, and his brother Jonas the 1750 Spring House on Tuscan Road."],
      timeline: [{ y: 1694, t: "Earliest part possibly built for William Camp" }, { y: 1747, t: "Ezekiel Ball owns the property" }, { y: 1750, t: "West addition built (about)" }, { y: "1776–83", t: "Used as a Revolutionary War hospital" }, { y: 1802, t: "Edward Ball inherits; adds latest wing" }, { y: 1844, t: "William Sayre sells 11 acres for $930" }, { y: 1946, t: "Herman family era begins" }],
      photos: [], photoLinks: [S.hpcPage("Ezekiel Ball House photo", "ezekiel-ball-house")],
      sources: [S.hpc("Ezekiel Ball House", "Ezekiel-Ball-House-Designation-Report"), S.hpcPage("Ezekiel Ball House", "ezekiel-ball-house")]
    },

    gildersleeve: {
      name: "Gildersleeve House", type: "Colonial farmhouse", kind: "house", built: 1765, builtLabel: "c. 1765",
      address: "57 Jefferson Avenue", lat: 40.7349, lon: -74.2725, approx: true, designation: "Local landmark",
      tagline: "An 18th-century farmhouse of one of the area's earliest families, including the village's first Baptist minister.",
      sections: [
        { h: "The Gildersleeves", p: [
          "John Gildersleeve (1706–1790) was brought as a child to East Jersey from Hempstead, Long Island. He came to own large farm and cattle lands in Newark's mountain district and helped found The Mountain Society, a satellite of Newark's First Presbyterian Church. A 1753 deed referring to the \"Crooked Brook and mountain road\" may well cover this lot.",
          "In 1786 John deeded land to his son Ezra (1740–1810), a successful farmer. In 1810 Ezra left \"all those lots of land and buildings\" to his son Joseph (1775–1846). That same year Joseph was called to head the Jefferson Village Baptist Society as its minister."] },
        { h: "The house", p: [
          "Visual inspection suggests the oldest section, a 1½-story block with a side-facing gable, dates from the latter half of the 18th century, possibly 1765. A two-story addition to the east probably dates from the first half of the 19th century."] }
      ],
      facts: ["Joseph Gildersleeve may have woven rag rugs alongside farming and preaching.", "The Baptist congregation of about 30 built a small white church in Jefferson Village."],
      timeline: [{ y: 1753, t: "Deed for land along the \"mountain road\"" }, { y: 1765, t: "Oldest section built (about)" }, { y: 1786, t: "John deeds land to Ezra Gildersleeve" }, { y: 1810, t: "Joseph inherits and becomes Baptist minister" }, { y: 1846, t: "Joseph Gildersleeve dies" }],
      photos: [], photoLinks: [S.hpcPage("Gildersleeve House photo", "gildersleeve-house")],
      sources: [S.hpc("Gildersleeve House", "Gildersleeve-house-Designation-Report"), S.hpcPage("Gildersleeve House", "gildersleeve-house")]
    },

    aaronbrown: {
      name: "Aaron Brown House", type: "Federal-era farmhouse", kind: "house", built: 1805, builtLabel: "c. 1805",
      address: "81 Parker Avenue", lat: 40.7356, lon: -74.2685, approx: true, designation: "Local landmark",
      tagline: "A 1805 farmhouse whose deed history runs from a founding family to Prohibition-era missionaries.",
      sections: [
        { h: "Aaron and Dorcas", p: [
          "Aaron Brown (born 1779) was the eldest of eight children of Job Brown II and Jane Tompkins of South Orange. He married Dorcas Ball, and the young couple were given 60 acres. Around 1805 they either built this 1½-story center-hall house or enlarged an earlier one. Some reports, still unsubstantiated, suggest a small house of about 1749 inside the western section, with its rough stone cellar and large hearth.",
          "The couple raised six children here. The house is nicknamed \"The Latches\" for its period latched doors."] },
        { h: "A century of owners", p: [
          "The house passed to Aaron Ball Brown in 1861 and to Abby Taylor in 1889. In 1896 the family sold to the South Orange Heights Development Company but kept living in their houses through 1902. Later owners included Richard P. Ashwell (1903), the Gibsons (1919), Alfred I. Phillips (1924) and John N. Berry (1927).",
          "After a sheriff's foreclosure in 1935, the house was owned from 1937 to 1939 by the Missionary Society of St. Paul the Apostle (the Paulist Fathers). The Katzin family owned it from 1939 to 1967 and the Hunkeles from 1967 to 2002."] }
      ],
      facts: ["When it was listed for sale in 2018 the asking price was $899,000.", "Its double porches and wide-plank floors are original."],
      timeline: [{ y: 1805, t: "Built or enlarged by Aaron and Dorcas Brown" }, { y: 1861, t: "Inherited by Aaron Ball Brown" }, { y: 1896, t: "Sold to South Orange Heights Development Co." }, { y: 1935, t: "Sheriff's foreclosure" }, { y: 1937, t: "Owned by the Paulist missionary society" }, { y: 1939, t: "Katzin family era begins" }, { y: 2018, t: "Listed for sale" }],
      photos: [], photoLinks: [S.hpcPage("Aaron Brown House photo", "aaron-brown-house")],
      sources: [S.hpc("Aaron Brown House", "Aaron-Brown-House-Designation-Report"), { label: "The Village Green: the Aaron Brown House is on the market (2018, sponsored)", url: "https://villagegreennj.com/?p=51190" }]
    },

    stonehouse: {
      name: "Old Stone House (Montgomery-Ogden House)", type: "Colonial house & first station", kind: "house", place: "stonehouse", built: 1720, builtLabel: "18th century",
      address: "22 Jefferson Avenue", lat: 40.735086, lon: -74.271191, designation: "Local landmark (2010); recorded by HABS (NJ-482)",
      tagline: "An 18th-century house that served as Maplewood's first railroad stop.",
      sections: [
        { h: "The Piersons' stone house", p: [
          "The house has a one-story 18th-century wood-frame section and a later stone wing of evenly coursed brownstone, from the early 19th century. Its first owner and builder may have been Joseph Pierson Sr. (1693–1759). It stood at the corner of Jefferson Avenue and the road to Pierson's Mills, and Deacon Joseph Pierson later owned it and lived there.",
          "An architect who studied the house believed the original section was of Dutch construction and estimated it at 1710–1720. That date has not been verified."] },
        { h: "The flag stop", p: [
          "When the Morris & Essex Railroad opened through the area in 1837–38, trains stopped here on request. The stop was known as the \"Stone House\" station, and it served from about 1838 until 1856–59, when a new depot named Maplewood was built near Baker Street. Betsy Durand and Daniel Beach lived in the house from 1837 to 1864.",
          "In 1936 the Historic American Buildings Survey photographed and measured the house. It is one of only two Maplewood houses in the survey. The township designated it a local landmark in 2010."] }
      ],
      facts: ["Maplewood's commuter story began here, at a farmhouse door, not at a station.", "The 1936 HABS photos include details of the mantels and stair, and they are in the public domain."],
      timeline: [{ y: "c. 1720?", t: "Original section built (architect's unverified estimate)" }, { y: "early 1800s", t: "Stone wing added" }, { y: 1838, t: "Becomes the \"Stone House\" flag stop" }, { y: 1859, t: "Flag stop replaced by the Maplewood depot" }, { y: 1936, t: "Documented by HABS" }, { y: 2010, t: "Designated a local landmark" }],
      photos: [{ src: "img/landmarks/stonehouse-1936-se.jpg", year: 1936, caption: "Southeast elevation", credit: "R. Merritt Lacey, Historic American Buildings Survey", license: PD_HABS, link: "https://commons.wikimedia.org/wiki/Category:Montgomery_Ogden_House_(Maplewood,_New_Jersey)", hero: true }],
      photoLinks: [{ label: "All 34 HABS photos and drawings on Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/Category:Montgomery_Ogden_House_(Maplewood,_New_Jersey)" }],
      sources: [S.hpcPage("The Old Stone House", "the-old-stone-house"), S.matters, S.wiki("Maplewood station", "Maplewood_station")]
    },

    vauxhall: {
      name: "Vaux Hall (Lewis Pierson House)", type: "Greek Revival house & mill", kind: "house", built: 1843, builtLabel: "1843",
      address: "693 Valley Street", lat: 40.7236, lon: -74.2782, approx: true, designation: "Local landmark (2006)",
      tagline: "A rare temple-front Greek Revival house beside the 1831 Pierson's Mill, owned by one family for 157 years.",
      sections: [
        { h: "The miller", p: [
          "Lewis Pierson (1801–1889) was the youngest son of Samuel and Mary Jones Pierson. He went to the Jefferson Village public school, and a trip to Rensselaersville, New York, in 1824 may have inspired him to build a mill on the family land along the East Branch of the Rahway River.",
          "On September 10, 1831, he wrote in his journal that he had started the water wheel of his mill \"for the first time ever a wheel went by water on this hill\". He married Abby Susannah Beach in 1832."] },
        { h: "Living in the barn", p: [
          "In May 1843 Abby wrote in her diary that the family had \"moved in the barn today while we have a house built.\" The result is a two-story wood-frame Greek Revival house with a temple front. It is thought to be the only high-style temple-front Greek Revival house left in Essex County.",
          "The name Vaux Hall echoes London's famous pleasure garden, but it was used for this area as early as the 18th century. The Revolutionary War skirmish at the Vaux Hall (Littel's) Bridge took place nearby."] },
        { h: "157 years of Piersons", p: [
          "The youngest child, Hubert Lewis Pierson, was the first born in the new house, in 1847. In 1884, while setting dynamite charges to blast stumps in the river, he was blinded in an accident. The Pierson family owned and lived in Vaux Hall from 1843 until 2000. The Pierson diaries were given to the library on microfilm in 1981. The house is one of only two early Maplewood houses that still keep a large share of their land."] }
      ],
      facts: ["The Pierson family diaries survive and are on microfilm at the Maplewood Memorial Library.", "A sun porch and single-car garage were added in 1939."],
      timeline: [{ y: 1831, t: "Pierson's Mill water wheel turns for the first time" }, { y: 1832, t: "Lewis Pierson marries Abby Beach" }, { y: 1843, t: "Vaux Hall built" }, { y: 1847, t: "Hubert Lewis Pierson born in the new house" }, { y: 1884, t: "Hubert blinded in a blasting accident" }, { y: 1939, t: "Sun porch added" }, { y: 2000, t: "Pierson family ownership ends" }, { y: 2006, t: "Designated a local landmark" }],
      photos: [], photoLinks: [S.hpcPage("Vaux Hall photo", "vaux-hall")],
      sources: [S.hpc("Vaux Hall", "Vaux-Hall-Designation-Report"), S.dh("Lewis Pierson House, Vauxhall, 1843", "lewis-pierson-house-vauxhall-1843"), S.libPanels]
    },

    headley: {
      name: "Headley/Zellers House", type: "Victorian farmhouse", kind: "house", built: 1873, builtLabel: "after 1873",
      address: "36–40 Burnett Avenue (No. 38)", lat: 40.7186, lon: -74.2638, approx: true, designation: "Local landmark",
      tagline: "The farmhouse of a Middleville storekeeper, from Hilton's heyday as its own village.",
      sections: [
        { h: "Middleville's merchant", p: [
          "This 2½-story house is a vernacular building with Gothic Revival touches. It probably was built by Sears Roberts Headley Sr. (1832–1890), who owned the property from 1873. Headley was a well-regarded merchant in Middleville, renamed Hilton in 1880, and his store was a village hub that later also held a post office.",
          "Eleazer C. and Polly Townley owned the land from 1842 to 1873. After Headley's death his son and daughters kept it until 1897."] },
        { h: "The fruit grower", p: [
          "Joseph Zellers Sr. (1849–1910) bought the house when he retired in 1897 and started a fruit growing and selling business in Hilton. After 1910 his heirs built houses on the subdivided lots. The house is one of the oldest buildings left on Burnett Avenue and represents Hilton's high point, from about 1875 to 1915, as an independent village."] }
      ],
      facts: ["Boyden Avenue was known as \"the road to the Harbor\", a port on the Elizabeth River.", "The front walk is laid with large square and rectangular bluestone slabs."],
      timeline: [{ y: 1842, t: "Townley family owns the land" }, { y: 1873, t: "Sears Headley buys the property" }, { y: 1880, t: "Middleville renamed Hilton" }, { y: 1897, t: "Joseph Zellers buys the house" }, { y: 1910, t: "Zellers heirs subdivide" }, { y: 1975, t: "Horner family era" }],
      photos: [], photoLinks: [S.hpcPage("Headley/Zellers House photo", "headley-zellers-house")],
      sources: [S.hpc("Headley/Zellers House", "Headley-Zellers-House-Designation-Report"), S.hpcPage("Headley/Zellers House", "headley-zellers-house")]
    },

    hickories: {
      name: "The Hickories & Roosevelt Park", type: "Lost estate", kind: "house", place: "hickories", built: 1863, builtLabel: "c. 1863–65",
      address: "Ridgewood Road between Durand Road and Curtiss Place (site)", lat: 40.7348, lon: -74.2828, approx: true,
      tagline: "Theodore Roosevelt's uncle's country estate, where the future president's love of nature took root.",
      sections: [
        { h: "A Roosevelt estate", p: [
          "In 1855 Cornelius Van Schaack Roosevelt Sr., grandfather of Theodore Roosevelt, bought the first of two parcels on Ridgewood Road, about 100 acres in all, from the heirs of Revolutionary War captain Isaac Smith. The land ran from today's Durand Road to Curtiss Place and up to South Mountain. In 1857 he gave it to his son, C.V.S. Roosevelt Jr.",
          "Around 1863–65 Roosevelt Jr. built a large, ornate mansion called The Hickories. It mixed Italianate and Second Empire styles, and its mansard-roofed tower stood out on the mountain slope."] },
        { h: "Young Theodore", p: [
          "As a sickly, asthmatic boy, Theodore Roosevelt spent summers here, in a room in the northeast wing, exploring the woods and streams. A page of his natural-history notebook dated \"Orange, NJ, Sept. 16th, 1872\" lists a dozen local animals and birds, including a goshawk seen on the estate."] },
        { h: "From estate to suburb", p: [
          "C.V.S. Roosevelt Jr. died in 1887, and his wife Laura in 1900. In 1902 failed financier William H. Curtiss bought the house and land for $60,000 but made only four sales in two years. In December 1904 the T.B. Ackerson Company bought most of the tract for $116,830 and laid out Roosevelt Park, and by 1908 100 of 125 lots were sold. The old mansion burned in 1905.",
          "The Maplewood Field Club, which became the Maplewood Country Club, was organized on leased estate land in 1903. Illustrator W. Clinton Pettee turned the estate's barn into a house at 104 Durand Road in 1909. His 1912 All-Story cover was the first published image of Tarzan."] }
      ],
      facts: ["Roosevelt, Kermit and Hickory are street names that remember the estate.", "Several Ackerson Company model homes still stand on Curtiss Place, at numbers 18, 31 and 34."],
      timeline: [{ y: 1855, t: "C.V.S. Roosevelt Sr. buys the land" }, { y: 1863, t: "The Hickories mansion built (about)" }, { y: 1872, t: "Young Theodore Roosevelt's nature notebook" }, { y: 1887, t: "C.V.S. Roosevelt Jr. dies" }, { y: 1902, t: "W.H. Curtiss buys the estate" }, { y: 1903, t: "Maplewood Field Club organized on the grounds" }, { y: 1904, t: "Ackerson Co. lays out Roosevelt Park" }, { y: 1905, t: "Mansion burns" }, { y: 1909, t: "Roosevelt barn becomes Clinton Pettee's home" }],
      photos: [], photoLinks: [S.dh("The Hickories: A Fashionable Country Retreat", "a-fashionable-country-retreat")],
      sources: [S.dh("\"The Hickories\" and Theodore Roosevelt", "the-hickories-and-theodore-roosevelt"), S.dh("William Howard Curtiss", "william-howard-curtiss-visionary-or-failed-promoter"), S.dh("Thomas Benton Ackerson, Master Developer", "thomas-benton-ackerson-master-developer"), S.dh("The Ackerson Company Houses", "the-ackerson-company-houses"), S.dh("Clinton Pettee & the Old Roosevelt Barn", "clinton-pettee-the-roosevelt-barn"), S.mcc]
    },

    station1902: {
      name: "Maplewood Station", type: "Railroad station", kind: "transport", place: "station1902", built: 1902, builtLabel: "1902",
      address: "Dunnell Road", lat: 40.7310095, lon: -74.2753901, designation: "In the Maplewood Village area",
      tagline: "From a farmhouse flag stop to a Midtown Direct station. The depot gave the town its name.",
      sections: [
        { h: "A stop at the Stone House", p: [
          "The Morris & Essex Railroad's first trains ran through in September 1837. At first they stopped only on request at the 18th-century Stone House on Jefferson Avenue. Around 1859–60 a land speculator built a depot near Baker Street and Maplewood Avenue. Local histories name him as John Shedden and say he gave the railroad an acre. The station was named Maplewood, reportedly for a large maple near the depot, and that is the first appearance of the town's name. Sources differ on the exact year: the station's Wikipedia article gives about 1860, while another account ties the name to 1838."] },
        { h: "Up on the embankment", p: [
          "In 1901–1903 the Delaware, Lackawanna & Western raised the tracks through Maplewood onto an embankment. The present station was finished in January 1902 at the top of the hill on the east side of the tracks, replacing the old depot at the foot of Lenox Place. The line was electrified on December 18, 1930.",
          "In 1996 NJ Transit's Midtown Direct service began running trains straight into Manhattan. In 2025 the station averaged 1,969 weekday boardings."] }
      ],
      facts: ["The town is named after the station, not the other way around.", "Memorial Park was planned right next to the 1902 station, so commuters step off the train into an Olmsted landscape."],
      timeline: [{ y: 1837, t: "First trains; Stone House flag stop" }, { y: "c. 1860", t: "Maplewood depot near Baker St." }, { y: 1902, t: "Present station completed" }, { y: 1930, t: "Line electrified (Dec. 18)" }, { y: 1996, t: "Midtown Direct to Manhattan" }],
      photos: [{ src: "img/landmarks/station-2015.jpg", year: 2015, caption: "Maplewood station, March 2015", credit: "Adam Moss", license: "CC BY-SA 2.0", link: "https://commons.wikimedia.org/wiki/File:Maplewood_Station_-_March_2015.jpg", hero: true }],
      sources: [S.wiki("Maplewood station", "Maplewood_station"), S.hpc("Municipal Building (railroad history)", "Municipal-Bldg-Designation-Report"), S.matters, S.commons("Maplewood Station, March 2015", "Maplewood_Station_-_March_2015.jpg")]
    },

    library: {
      name: "Maplewood Memorial Library", type: "Public library", kind: "culture", place: "library", built: 1913, builtLabel: "1913 / 1956",
      address: "51 Baker Street (Hilton Branch: 1688 Springfield Avenue)", lat: 40.7295345, lon: -74.2757733, architect: "Ray O. Peck (1956); William E. Lehman (1970 addition)",
      tagline: "Founded by a group of women in 1913, it holds the city directories, scrapbooks and house files behind this site.",
      sections: [
        { h: "Founded in a living room", p: [
          "In 1913, when the place was still officially South Orange Township and had about 4,000 residents, a group of women met at the home of Mrs. W. J. Morrison to discuss starting a library. A public meeting at the Ricalton School created the Maplewood Library Association, which first met on April 30, 1913.",
          "The first library was on the third floor of the Ricalton School, now part of Maplewood Middle School. Librarian Grace I. Pollard was paid $2 a week. The collection started with 600 books and about 300 members, and within a year it had ten times the books and twice the members. In January 1922 it became a free municipal library."] },
        { h: "Old Town Hall to Baker Street", p: [
          "In 1932 the library moved into the old Township Hall at 162 Maplewood Avenue. That building was built in 1869 as Maplewood School and served as Town Hall from 1904. It stayed there until 1956, and the old building was torn down in 1958 to make way for the post office.",
          "In 1949 the township planned a new library on Baker Street beside Memorial Park. More than 20 architects were interviewed and Ray O. Peck of Westfield was chosen. The $265,000 Maplewood Memorial Library opened on August 12, 1956, as a war memorial. An addition designed by William E. Lehman's firm doubled its size; it was completed in December 1969 and dedicated on July 4, 1970."] },
        { h: "Hilton's own library", p: [
          "The Hilton Branch began in March 1882 as a reading club at the Hilton Public School, at Boyden Avenue and Academy Street. In 1889 it became the Hilton Public Library Association, with Andrew J. Van Ness as first librarian, and he donated about 1,000 of his own books. Some of them are still in the collection.",
          "In 1922 the branch moved into the 1911 Hilton firehouse. A new $220,000 branch by Ray O. Peck, beside Maplecrest Park, opened on January 28, 1959. Behind it, Durand-Hedden's Robert H. Grasmere Local History Center keeps photographs, maps and house files."] }
      ],
      facts: ["The library won a Junior Literary Guild award for its 1938 \"Traveling Caravan\" book exhibit.", "The Friends of the Maplewood Library were founded in 1942. A 1947 Friends dinner featured novelist Agnes Sligh Turnbull, who lived in Maplewood.", "The card catalog was replaced by an online catalog in 2001.", "Helen Van Dyke Winter, director from 1949 to 1973, oversaw both new buildings and the addition."],
      timeline: [{ y: 1882, t: "Hilton reading club organized" }, { y: 1889, t: "Hilton Public Library Association; A.J. Van Ness librarian" }, { y: 1913, t: "Maplewood Library Association founded (Apr. 30)" }, { y: 1922, t: "Becomes a free municipal library" }, { y: 1932, t: "Moves to old Town Hall, 162 Maplewood Ave." }, { y: 1956, t: "Memorial Library opens on Baker St. (Aug. 12)" }, { y: 1959, t: "New Hilton Branch opens (Jan. 28)" }, { y: 1970, t: "Addition dedicated (July 4)" }, { y: 2001, t: "Online catalog replaces cards" }],
      photos: [{ src: "img/landmarks/library-2009.jpg", year: 2009, caption: "Maplewood Memorial Library on Baker Street", credit: "Jim Henderson", license: "Public domain", link: "https://commons.wikimedia.org/wiki/File:Maplewood_Library_jeh.jpg", hero: true }],
      photoLinks: [S.libPanels, { label: "Library digital archive", url: "https://www.maplewoodlibrary.org/research-maplewooddigital-archive" }],
      sources: [S.libPanels, { label: "Maplewood Memorial Library: Library History", url: "https://www.maplewoodlibrary.org/research-maplewoodlibrary-history" }, S.commons("Maplewood Library", "Maplewood_Library_jeh.jpg")]
    },

    chs: {
      name: "Columbia High School", type: "High school", kind: "civic", place: "chs", built: 1927, builtLabel: "1927",
      address: "17 Parker Avenue (Valley Street & Parker Avenue)", lat: 40.7348213, lon: -74.2663698, architect: "Guilbert & Betelle",
      tagline: "A Collegiate Gothic school with roots in 1814, where Ultimate Frisbee was born.",
      sections: [
        { h: "From the Columbian School", p: [
          "Columbia High School traces its roots to South Orange's Columbian School of 1814. After the 1867 state school law the area's school associations were merged, and in 1894 they formally became the South Orange–Maplewood School District.",
          "The present building at Valley Street and Parker Avenue opened in September 1927, at a cost of over $2,000,000. It was designed by Guilbert & Betelle of Newark, the firm James Betelle carried on after Ernest Guilbert's death in 1916. The same firm designed most of Maplewood's schools and the Municipal Building."] },
        { h: "The birthplace of Ultimate", p: [
          "In 1968 Columbia students played the first game of Ultimate Frisbee, a new team sport with the flying disc. Some accounts trace its roots to Amherst College in 1965–66. The first interscholastic game followed in 1970: Columbia 43, Millburn 10. A plaque in the student parking lot marks the birthplace of the sport."] },
        { h: "Stage and screen", p: [
          "Columbia graduates include Oscar-winning actress Teresa Wright, who returned to the Maplewood Theater in a touring \"Our Town\", and Roy Scheider, star of \"Jaws\". \"Jaws\" played at the Maplewood Theater for months in 1975. In 2004 Zach Braff, another graduate, filmed a scene of \"Garden State\" in front of the school.",
          "The school was a National Blue Ribbon School in 1992–93. In 2025 its old natatorium reopened as a student commons."] }
      ],
      facts: ["The 1970 Columbia–Millburn game, 43–10, was the first interscholastic Ultimate game.", "The school serves both Maplewood and South Orange, even though the two towns split in 1904."],
      timeline: [{ y: 1814, t: "Columbian School founded in South Orange" }, { y: 1894, t: "South Orange–Maplewood district formalized" }, { y: 1927, t: "Present building opens (September)" }, { y: 1968, t: "First Ultimate Frisbee game" }, { y: 1970, t: "First interscholastic Ultimate game" }, { y: 1993, t: "National Blue Ribbon School" }, { y: 2004, t: "\"Garden State\" filmed here" }, { y: 2025, t: "Natatorium becomes student commons" }],
      photos: [{ src: "img/landmarks/frisbee-plaque.jpg", year: 2019, caption: "Ultimate Frisbee birthplace plaque", credit: "dkg", license: "CC BY-SA 2.5", link: "https://commons.wikimedia.org/wiki/File:Ultimate_Frisbee_Birthplace_Plaque,_Maplewood,_NJ.jpg", hero: true }],
      sources: [S.wiki("Columbia High School (New Jersey)", "Columbia_High_School_(New_Jersey)"), S.wiki("Ultimate (sport)", "Ultimate_(sport)"), S.wiki("Guilbert and Betelle", "Guilbert_and_Betelle"), { label: "Durand-Hedden: Maplewood, in the Orange Mountains", url: "https://www.durandhedden.org/post/maplewood-in-the-orange-mountains" }, S.dhTheaterNews]
    },

    theater: {
      name: "Maplewood Theater", type: "Movie palace & stage", kind: "culture", place: "theater", built: 1927, builtLabel: "1927",
      address: "155 Maplewood Avenue", lat: 40.7314564, lon: -74.2765702, architect: "William E. Lehman", designation: "Inside the Maplewood Village Historic District (National Register, 2022)",
      tagline: "Valentino, vaudeville, Tallulah Bankhead's lion cub, Porgy and Bess and \"Jaws\", all on Maplewood Avenue.",
      sections: [
        { h: "Too late for vaudeville", p: [
          "The Maplewood Theater opened on March 15, 1927, as one of New Jersey's largest combined vaudeville and movie houses, with Rudolph Valentino in \"The Four Horsemen of the Apocalypse\". Its timing was bad. \"The Jazz Singer\" arrived months later, sound equipment came only in 1929, and the costly organ and vaudeville stage were soon obsolete. After the 1929 crash the owners went bankrupt in May 1930 over a $240,000 debt.",
          "Early on, a Western so violent that children hid their eyes led the Woman's Club to form a Better Films Committee. A later manager promised to show only club-approved films. A fierce 1935 fight over Sunday movies ended with a recount, and the first Sunday shows, on December 8, 1935, were standing-room only."] },
        { h: "Broadway comes to Maplewood", p: [
          "From June 1938 producer Frank McCoy staged 46 Broadway revivals here at 55 cents for matinees and $1.10 for evenings, with stars such as Ethel Barrymore, Gypsy Rose Lee and Edward Everett Horton. The New York Times headlined it \"Maplewood: Theatre 1, Movies 0\". In 1939, under director Anton Bundsman (later Hollywood's Anthony Mann), a touring \"Our Town\" brought back Columbia graduate Teresa Wright.",
          "From 1940 to 1942 producer Cheryl Crawford staged 48 shows, with Helen Hayes, Ingrid Bergman, Paul Robeson, Gloria Swanson and Tallulah Bankhead among the stars. In 1941 her trimmed-down revival of Gershwin's \"Porgy and Bess\" opened here and went on to become a Broadway hit. After one show, Bankhead drove Crawford home with her pet lion cub in the back seat."] },
        { h: "\"Jaws\" and after", p: [
          "In the 1950s and '60s the air-conditioned theater fought television with Cinemascope and 3-D. In 1975 it won the northern New Jersey exclusive for \"Jaws\", starring Columbia graduate Roy Scheider, and for three weeks the lines reached Baker Street.",
          "The theater closed in 1988 and reopened on June 8, 1990, later as a multiplex. It closed in March 2020, permanently that December. It sits in the Maplewood Village Historic District, listed on the National Register on April 25, 2022, but that listing doesn't protect it from demolition. A November 2025 redevelopment plan allows demolition if an engineering study finds the structure unsound. Preservationists and a film society are campaigning to save it."] }
      ],
      facts: ["The theater had about 1,300–1,400 seats; sources differ.", "Edna Ferber acted in her own play \"The Royal Family\" here.", "During \"Jaws\" the manager was a Columbia biology teacher, Lolis Carroll Brooks."],
      timeline: [{ y: 1927, t: "Opens with Valentino (Mar. 15)" }, { y: 1929, t: "Sound pictures arrive" }, { y: 1930, t: "Bankruptcy and reopening" }, { y: 1935, t: "First Sunday movies (Dec. 8)" }, { y: 1938, t: "Frank McCoy's Broadway revivals" }, { y: 1941, t: "Porgy and Bess revival" }, { y: 1975, t: "\"Jaws\" exclusive" }, { y: 1990, t: "Reopens (June 8)" }, { y: 2020, t: "Closes" }, { y: 2022, t: "Village Historic District listed" }, { y: 2025, t: "Redevelopment plan allows possible demolition" }],
      photos: [], photoLinks: [S.cinema, S.dhTheaterNews, S.pnj],
      sources: [S.dhTheaterNews, S.cinema, S.pnj, { label: "Wikipedia: Cheryl Crawford", url: "https://en.wikipedia.org/wiki/Cheryl_Crawford" }, S.nrhp]
    },

    mpark: {
      name: "Memorial Park", type: "Olmsted park", kind: "nature", place: "mpark", built: 1922, builtLabel: "1922–1931",
      address: "Valley Street, Baker Street, Dunnell Road & Oakland Road", lat: 40.7304421, lon: -74.2740888, architect: "Olmsted Brothers; Brinley & Holbrook",
      designation: "National Register of Historic Places (Aug. 3, 2015); local landmark",
      tagline: "A 25-acre Olmsted-planned war memorial that turned the old mill bottomland into the town's front lawn.",
      sections: [
        { h: "From mills to meadow", p: [
          "The low land along the East Branch of the Rahway River was long home to mills, small industry, farming and grazing. The township began buying it in 1913 and set up playgrounds north of Oakview Avenue in 1920. In 1922, the year the town took the name Maplewood, it hired the Olmsted Brothers, the firm that designed South Mountain Reservation, to plan a park.",
          "The 1922 plan called for a pond, playfields, tennis courts and a World War I memorial. Planting began in 1923 and took two years. The National Park Service says the planting was the only part of the Olmsted design actually built. Other sources also credit the landscape architects Brinley & Holbrook."] },
        { h: "A boulder, not granite", p: [
          "The park was dedicated in 1931 to Maplewood's men and women who served in World War I. The Olmsted firm wanted a simple granite base for the war memorial, but the Memorial Committee chose a large boulder, which still stands near Baker Street.",
          "The Civic House, an Arts and Crafts building by Charles C. Grant, was built in 1929. Some sources say it was completed in 1932. William Mitchell's Skate House followed in 1929–30 beside the winter skating pond. Three rustic footbridges of stone and timber cross the river."] },
        { h: "Saving it again", p: [
          "The park was listed on the National Register on August 3, 2015. A conservancy formed in 2017, modeled on Central Park's, and since 2018 it has restored Flagpole Hill from the original Olmsted planting plans. Other projects include redesigning the Vietnam Veterans Memorial area (2020) and the gateway opposite the station (2022). A bronze plaque marked Maplewood's centennial in November 2022. Every summer, Maplewoodstock fills the park with music."] }
      ],
      facts: ["In 2016 New Jersey planners named it one of the state's \"Great Public Places\".", "The park is the civic center's front lawn, with Town Hall facing it across Valley Street."],
      timeline: [{ y: 1913, t: "Township begins buying riverside land" }, { y: 1922, t: "Olmsted Brothers hired" }, { y: 1923, t: "Planting begins" }, { y: 1929, t: "Civic House and Skate House built" }, { y: 1931, t: "Dedicated as a WWI memorial" }, { y: 2015, t: "National Register listing (Aug. 3)" }, { y: 2017, t: "Conservancy founded" }, { y: 2022, t: "Centennial plaque" }],
      photos: [
        { src: "img/landmarks/mpark-ww1.jpg", year: 2019, caption: "The World War I memorial boulder", credit: "Cornellrockey", license: "CC BY-SA 4.0", link: "https://commons.wikimedia.org/wiki/File:WW1_memorial,_Memorial_Park,_Maplewood_New_Jersey.jpg", hero: true },
        { src: "img/landmarks/mpark-skatehouse.jpg", year: 2016, caption: "The 1929–30 Skate House", credit: "Jerrye & Roy Klotz, M.D.", license: "CC BY-SA 4.0", link: "https://commons.wikimedia.org/wiki/File:MAPLEWOOD_MEMORIAL_PARK,_ESSEX_COUNTY,_NEW_JERSEY.jpg" }
      ],
      photoLinks: [{ label: "Olmsted Archives on Flickr", url: "https://www.flickr.com/photos/olmsted_archives/collections/72157671383078913/" }],
      sources: [S.nps, S.hpc("Maplewood Memorial Park", "Maplewood-Memorial-Park-Desig-Report"), S.conservancy, S.nrhp, S.hpc("Municipal Building (park history)", "Municipal-Bldg-Designation-Report")]
    },

    townhall: {
      name: "Municipal Building (Town Hall)", type: "Civic building", kind: "civic", place: "townhall", built: 1931, builtLabel: "1930–31",
      address: "574 Valley Street", lat: 40.7302531, lon: -74.2715614, architect: "Guilbert & Betelle (James Betelle)",
      designation: "National Register of Historic Places (Oct. 1, 2014); local landmark (2009)",
      tagline: "A Georgian Revival town hall built through the Depression to give a new town a civic heart.",
      sections: [
        { h: "A town in search of an identity", p: [
          "When South Orange Township became Maplewood in 1922, its population was soaring and the old Town Hall on Maplewood Avenue was far too small. Town leaders set out to give the community a distinct identity, with a civic center around the new Memorial Park."] },
        { h: "Building through the Depression", p: [
          "Mayor John S. DeHart's Township Committee picked Guilbert & Betelle of Newark. The firm's James Betelle also designed Columbia High School and seven elementary schools. Public pressure over Depression-era costs and the location of the jail changed early plans. The committee cited President Hoover's advice to keep up public works and went ahead.",
          "The Georgian Revival building, with its white wooden cupola and limestone Doric colonnade, was dedicated in 1931 to the \"promotion of good government and civic consciousness.\" The police headquarters nearby was dedicated on May 30, 1931. A pyramidal stone war-veterans memorial stands on the lawn."] },
        { h: "Recognition", p: [
          "The Historic Preservation Commission designated the building a local landmark in December 2009, and it was listed on the National Register of Historic Places on October 1, 2014."] }
      ],
      facts: ["The building faces Memorial Park across Valley Street, so the park serves as its grand lawn.", "The town's greenhouses sit behind the building."],
      timeline: [{ y: 1922, t: "Township renamed Maplewood" }, { y: 1926, t: "Ordinance to acquire land for municipal buildings" }, { y: 1930, t: "Construction" }, { y: 1931, t: "Dedicated" }, { y: 2009, t: "Local landmark" }, { y: 2014, t: "National Register (Oct. 1)" }],
      photos: [
        { src: "img/landmarks/townhall-2026.jpg", year: 2026, caption: "The Municipal Building from Valley Street", credit: "Mr. Matté", license: "CC BY-SA 4.0", link: "https://commons.wikimedia.org/wiki/File:Maplewood,_NJ_Municipal_Building,_Oct._2026.jpg", hero: true },
        { src: "img/landmarks/townhall-2009.jpg", year: 2009, caption: "Looking southeast", credit: "Jim Henderson", license: "Public domain", link: "https://commons.wikimedia.org/wiki/File:Maplewood_Municipal_Bldg_jeh.JPG" }
      ],
      sources: [S.hpc("Maplewood Municipal Building", "Municipal-Bldg-Designation-Report"), S.hpcPage("Maplewood Municipal Building", "the-maplewood-municipal-building"), S.nrhp, S.wiki("Guilbert and Betelle", "Guilbert_and_Betelle")]
    },

    womansclub: {
      name: "Woman's Club Clubhouse (The Woodland)", type: "Clubhouse", kind: "culture", built: 1930, builtLabel: "1929–30",
      address: "60 Woodland Road", lat: 40.732352, lon: -74.2777685, architect: "Clifford C. Wendehack", designation: "Local landmark (2013)",
      tagline: "Built by the largest woman's club in New Jersey, which also helped save the Durand-Hedden House.",
      sections: [
        { h: "A club for a growing suburb", p: [
          "The Woman's Club of Maplewood was founded in November 1916, led by journalist Etta Gould Lee. During World War I members organized the Maplewood Red Cross. They later volunteered at the Essex Mountain Sanitarium and the Ivy Hill Alms House, and in 1923 they started the Vauxhall Well-Baby Clinic.",
          "The club also kept an eye on the movies. It set up a Better Films Committee after a violent Western shocked audiences at the new Maplewood Theater."] },
        { h: "The clubhouse", p: [
          "Members had raised more than $3,000 by 1922 and bought the lot in 1923. In April 1928 they voted to build, limiting membership to 1,000 plus a waiting list. A 1929 movie benefit at the theater was followed by groundbreaking on October 11, and the building was finished in October 1930. It was designed by Clifford C. Wendehack, a leading designer of country clubs, in a colonial style to match the town's civic buildings.",
          "By 1941 it was the largest woman's club in New Jersey, and it raised money for a fighter plane during World War II. In 1979 its evening department helped found the Durand-Hedden House & Garden Association. As membership declined, the club sold the building to the township in May 2013. It is now The Woodland, an event space."] }
      ],
      facts: ["A sandstone millstone set by the front stoop carries a bronze plaque from the Daughters of the American Revolution, presented in September 1930.", "The Junior Woman's Club, for women 18 to 25, ran from 1927 to 2007."],
      timeline: [{ y: 1916, t: "Club founded (November)" }, { y: 1923, t: "Lot purchased; Well-Baby Clinic opens" }, { y: 1928, t: "Members vote to build" }, { y: 1929, t: "Groundbreaking (Oct. 11)" }, { y: 1930, t: "Clubhouse completed" }, { y: 1941, t: "Largest woman's club in NJ" }, { y: 1979, t: "Helps found Durand-Hedden" }, { y: 2013, t: "Sold to township; local landmark" }],
      photos: [], photoLinks: [S.hpcPage("Woman's Club photo", "the-womans-club-of-maplewood-aka-60-woodland-road")],
      sources: [S.hpc("Woman's Club of Maplewood", "Maplewood-WomansClub-desig-report"), S.dh("The Woman's Club of Maplewood: A Century of Service", "the-woman-s-club-of-maplewood-a-century-of-service"), S.dhTheaterNews]
    },

    golf: {
      name: "Maplewood Country Club", type: "Golf club", kind: "culture", place: "tee", built: 1903, builtLabel: "1903",
      address: "Baker Street & Valley Street", lat: 40.7256647, lon: -74.2785945, architect: "Course: Alfred Williams (1919); clubhouse: Kenneth W. Dalzell (1921–22)",
      tagline: "Born on the Roosevelt estate, home of the Reddy Tee and, it's said, golf's first gallery ropes.",
      sections: [
        { h: "A field club on a Roosevelt estate", p: [
          "In August 1903 eighty members organized the Maplewood Field Club on land leased from W.H. Curtiss, the former Roosevelt estate known as The Hickories. Its first officers included builder Edward C. Balch, the \"Father of Maplewood\". Like other field clubs of the day it offered baseball and a few golf holes.",
          "On March 2, 1908, the club leased 11 acres from Charles De Grasse on the south side of Baker Street, west of Valley Street, and turned an old frame barn into a clubhouse. The holdings grew to 50 acres. The club incorporated in 1911, which is why that year, mistakenly, appears on its logo."] },
        { h: "Building a golf course", p: [
          "In March 1919 the club raised $16,500 for more land and the first nine holes. They were designed by Alfred Williams, a protégé of two-time British Open champion Willie Park, and opened on August 30, 1919. Renamed the Maplewood Country Club, it hired Kenneth W. Dalzell to design a $200,000 clubhouse. In 1922 members approved a $250-a-head assessment to pay for it. The full 18 holes opened on Memorial Day, May 30, 1922."] },
        { h: "The Reddy Tee", p: [
          "Member Dr. William Lowell, a dentist, took up golf at 59. He disliked the messy custom of teeing up on a pinch of wet sand. He whittled a peg tee, had 5,000 made of birch, and painted them red so they'd show on the grass: the Reddy Tee. Sales took off after Walter Hagen used them on his 1922 tour, for a $1,500 endorsement. Fans scrambled so hard for the discarded tees that courses had to rope off the tee boxes, said to be the first gallery ropes in American golf. By the mid-1920s Woolworth alone had ordered a billion tees.",
          "On Election Day, November 6, 1923, Hagen and trick-shot artist Joe Kirkwood came to Maplewood and beat amateur champions Jerome Travers and William Reekie, 3 and 2."] }
      ],
      facts: ["Kirkwood shot a 71, even par, in the 1923 exhibition.", "The member-guest tournament, begun in June 1933, became the John F. Roche Memorial in 1935.", "The course still plays to par 71."],
      timeline: [{ y: 1903, t: "Maplewood Field Club organized" }, { y: 1908, t: "Moves to Baker Street" }, { y: 1911, t: "Incorporated" }, { y: 1919, t: "First nine holes open (Aug. 30)" }, { y: 1921, t: "Reddy Tee invented by member Dr. Lowell" }, { y: 1922, t: "18 holes open (May 30); Hagen tours with the tee" }, { y: 1923, t: "Hagen and Kirkwood play Maplewood (Nov. 6)" }, { y: 1953, t: "Golden Jubilee" }],
      photos: [], photoLinks: [S.mcc],
      sources: [S.mcc, { label: "Wikipedia: William Lowell Sr.", url: "https://en.wikipedia.org/wiki/William_Lowell_Sr." }, S.dh("Kenneth Dalzell: A Maplewood Architect Rediscovered", "kenneth-dalzell-a-maplewood-architect-rediscovered")]
    },

    ward: {
      name: "Ward Homestead (Winchester Gardens)", type: "Institution", kind: "civic", place: "ward", built: 1927, builtLabel: "1926–27",
      address: "333 Elmwood Avenue", lat: 40.7267524, lon: -74.254934, architect: "John Russell Pope; landscape by the Olmsted Brothers",
      tagline: "A rusticated Gothic home for \"aged and respectable bachelors and widowers\", by the architect of the Jefferson Memorial.",
      sections: [
        { h: "A governor's son's bequest", p: [
          "Marcus L. Ward was the son of Marcus Lawrence Ward, a New Jersey governor and U.S. congressman. When the younger Ward died (sources point to 1921–22), his will created a home \"for Aged and Respectable Bachelors and Widowers\". Most of his estate of more than $4.88 million went to it. Sources give the building's cost as $1.5 million or $1,750,000."] },
        { h: "Pope and the Olmsteds", p: [
          "The home was designed by John Russell Pope (who also designed the National Archives and the Jefferson Memorial) in a rusticated Gothic style of stone and slate. The grounds were landscaped by the Olmsted Brothers. Construction began in 1925–26 and the home opened on August 31, 1927.",
          "Women were admitted in the 1980s, and in the 1990s it grew with apartments and villas. It is now Winchester Gardens, and the original Pope building still anchors the campus."] }
      ],
      facts: ["The Olmsted Brothers worked on both Memorial Park and the Ward Homestead in the same decade.", "A 1928 book, \"The Marcus L. Ward Home at Maplewood, N.J.\", documents its creation."],
      timeline: [{ y: 1922, t: "Marcus L. Ward's bequest" }, { y: 1925, t: "Construction begins" }, { y: 1927, t: "Opens (Aug. 31)" }, { y: "1980s", t: "Women admitted" }, { y: "1990s", t: "Major expansion; becomes Winchester Gardens" }],
      photos: [],
      sources: [S.wiki("Ward Homestead", "Ward_Homestead"), { label: "Durand-Hedden: Maplewood, in the Orange Mountains", url: "https://www.durandhedden.org/post/maplewood-in-the-orange-mountains" }]
    }
  };
})();
