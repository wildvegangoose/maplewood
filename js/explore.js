/* Explore page: time-traveling Leaflet map */
document.addEventListener("DOMContentLoaded", () => {
  const MW = window.MW, L = window.L;
  const $ = s => document.querySelector(s);
  const params = new URLSearchParams(location.search);
  let year = +params.get("year") || 1922;
  const focus = params.get("place");
  const kinds = Object.keys(MW.kindLabel);
  const active = new Set(kinds);
  const colors = { house: "#b8381e", civic: "#2f4f5a", transport: "#5a4c40", nature: "#2d5240", culture: "#c98a1e", event: "#4f3b4a", commerce: "#8e2914" };
  const glyph = { house: "⌂", civic: "★", transport: "⛟", nature: "♣", culture: "♪", event: "✦", commerce: "$" };

  if (!L) { $("#map").innerHTML = '<p style="padding:2rem">The map library could not load. Check your connection.</p>'; return; }

  const map = L.map("map", { zoomControl: false, scrollWheelZoom: true, minZoom: 13, maxZoom: 18 }).setView([40.7315, -74.2715], 15);
  L.control.zoom({ position: "bottomright" }).addTo(map);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map);

  // Township boundary with a soft mask outside
  if (window.MW_BOUNDARY) {
    const ring = MW_BOUNDARY.coordinates[0].map(([lon, lat]) => [lat, lon]);
    L.polygon([[[41, -75], [41, -73.5], [40.4, -73.5], [40.4, -75]], ring], { stroke: false, fillColor: "#f6efdf", fillOpacity: .55, interactive: false }).addTo(map);
    const b = L.polygon(ring, { color: "#b8381e", weight: 3, dashArray: "8 6", fill: false, interactive: false }).addTo(map);
    map.fitBounds(b.getBounds(), { padding: [20, 20] });
  }

  // Historic roads, revealed by date
  const roadDates = [1500, 1500, 1806, 1700, 1838];
  const roads = MW.oldRoads.map((r, i) => {
    const line = L.polyline(r.pts, { color: "#e3a33a", weight: 7, opacity: .75, lineCap: "round", className: "oldroad" });
    line.bindTooltip(r.name + (roadDates[i] > 1500 ? ` · from ${roadDates[i] === 1700 ? "colonial times" : roadDates[i]}` : " · Lenape trail origins"), { sticky: true });
    return { line, from: roadDates[i] };
  });

  // Markers
  const markers = MW.places.map(p => {
    const icon = L.divIcon({
      className: "pin-wrap",
      html: `${p.landmark ? '<div class="pin-ring" style="--c:' + colors[p.kind] + '"></div>' : ""}<div class="pin" style="--c:${colors[p.kind]}"><span>${glyph[p.kind]}</span></div>`,
      iconSize: [34, 42], iconAnchor: [17, 40], popupAnchor: [0, -38]
    });
    const m = L.marker([p.lat, p.lon], { icon, title: p.title, riseOnHover: true });
    m.bindPopup(`<div class="mpop">${MW.placeCard(p)}<div class="mpop-actions"><a href="house.html?q=${encodeURIComponent(p.address.split(/[;(]/)[0] + ", Maplewood, NJ")}&lat=${p.lat}&lon=${p.lon}&label=${encodeURIComponent(p.title)}">Tell this spot's story →</a></div></div>`, { maxWidth: 360, className: "mw-popup" });
    return { p, m, state: "hidden" };
  });

  function update(y) {
    year = y;
    $("#bigYear").textContent = y;
    const era = MW.eraFor(y);
    $("#eraLine").innerHTML = `<b>${era.name}</b>. ${era.tagline}`;
    history.replaceState(null, "", "?year=" + y);
    // vintage tint on tiles
    const sep = y < 1900 ? .75 : y < 1950 ? .75 - (y - 1900) / 50 * .5 : y < 2000 ? .25 - (y - 1950) / 50 * .25 : 0;
    document.documentElement.style.setProperty("--tile-filter", `sepia(${sep.toFixed(2)}) saturate(${(1 - sep * .5).toFixed(2)}) contrast(${(1 - sep * .08).toFixed(2)}) brightness(${(1 + sep * .04).toFixed(2)})`);
    $("#mapBadge").innerHTML = `<b>${y}</b> · ${MW.places.filter(p => p.year <= y && (!p.end || p.end >= y)).length} places`;

    roads.forEach(r => { if (y >= r.from) r.line.addTo(map); else r.line.remove(); });

    markers.forEach(o => {
      const { p, m } = o;
      let st = p.year > y || !active.has(p.kind) ? "hidden" : (p.end && p.end < y ? "ghost" : "on");
      if (st === o.state) return;
      if (st === "hidden") m.remove(); else {
        m.addTo(map);
        const el = m.getElement();
        if (el) { el.classList.toggle("ghost", st === "ghost"); if (o.state === "hidden") { el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); } }
      }
      o.state = st;
    });
    renderList();
  }

  function renderList() {
    const shown = markers.filter(o => o.state !== "hidden").sort((a, b) => b.p.year - a.p.year);
    $("#list").innerHTML = shown.length ? shown.map(({ p, state }) => `<button class="li ${state}" data-id="${p.id}">
        <span class="li-year" style="color:${colors[p.kind]}">${p.year < 1600 ? "Pre-1666" : p.year}</span>
        <span class="li-body"><strong>${MW.esc(p.title)}</strong><span class="small muted">${MW.esc(p.address)}${state === "ghost" ? " · gone by " + year : ""}</span></span></button>`).join("")
      : `<p class="muted small" style="padding:1rem">Nothing on the map yet. Try a later year.</p>`;
  }

  $("#list").addEventListener("click", e => {
    const b = e.target.closest(".li"); if (!b) return;
    const o = markers.find(o => o.p.id === b.dataset.id);
    map.flyTo(o.m.getLatLng(), 17, { duration: .8 });
    setTimeout(() => o.m.openPopup(), 850);
  });

  $("#filters").innerHTML = kinds.map(k => `<button class="chip active kchip" data-k="${k}" style="--c:${colors[k]}"><i></i>${MW.kindLabel[k]}</button>`).join("");
  $("#filters").addEventListener("click", e => {
    const b = e.target.closest(".kchip"); if (!b) return;
    const k = b.dataset.k;
    if (active.has(k)) active.delete(k); else active.add(k);
    b.classList.toggle("active", active.has(k));
    update(year);
  });

  const slider = MW.timeSlider($("#slider"), {
    min: 1600, max: 2026, value: year, chips: false,
    ticks: [1666, 1750, 1838, 1904, 1950, 2026], onChange: update
  });
  update(year);

  if (focus) {
    const o = markers.find(o => o.p.id === focus);
    if (o) { slider.set(Math.max(year, o.p.year)); map.setView(o.m.getLatLng(), 17); setTimeout(() => o.m.openPopup(), 400); }
  }

  $("#addrForm").addEventListener("submit", e => {
    const v = e.target.q.value.trim(); if (!v) { e.preventDefault(); }
  });
});
