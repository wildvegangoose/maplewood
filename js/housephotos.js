/* Historic photographs of specific Maplewood houses (Library of Congress; each item: "No known restrictions on publication").
   Gottscho-Schleisner's 1934 photos of Kenneth Dalzell houses name only the owner; addresses are matched through the
   city directories and marked "probable". */
var MW = window.MW = window.MW || {};
MW.housePhotos = [
 {
  "address": "511 Prospect Street",
  "src": "img/loc/2018734551.jpg",
  "year": 1934,
  "caption": "\"E. D. Martin house\" by Kenneth W. Dalzell. Confirmed as 511 Prospect Street: matches the library's real-estate listing photograph of this house, and Edward D. Martin (vice-president of Thomas A. Edison Inc.) is listed here in Maplewood's 1934–1936 directories.",
  "credit": "Gottscho-Schleisner, Inc. / Library of Congress",
  "license": "No known restrictions on publication",
  "link": "https://www.loc.gov/item/2018734551/",
  "probable": false
 },
 {
  "address": "29 Brookside Road",
  "src": "img/loc/2018734549.jpg",
  "year": 1934,
  "caption": "\"Moran House\" by Kenneth W. Dalzell. Probably this house: Walter L. Moran is the only Moran householder in Maplewood's 1932–1950 directories, at this address, and the library's May 1931 listing card describes a newly built frame Colonial with attached two-car garage on this corner lot.",
  "credit": "Gottscho-Schleisner, Inc. / Library of Congress",
  "license": "No known restrictions on publication",
  "link": "https://www.loc.gov/item/2018734549/",
  "probable": true
 }
];
MW.housePhotosFor = (number, road) => { const n = s => (s || '').toUpperCase().replace(/[^A-Z ]/g, '').replace(/\b(AVENUE|AVE|AV|ROAD|RD|STREET|ST|PLACE|PL|TERRACE|TER|DRIVE|DR|COURT|CT)\b/g, '').trim();
  return MW.housePhotos.filter(p => { const m = p.address.match(/^(\d+)\s+(.+)$/); return m && String(number) === m[1] && n(road) === n(m[2]); }); };
