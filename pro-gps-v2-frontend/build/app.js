// Pro GPS V2 - frontend static app.js (connects to backend WS)
let devices = {};
const listEl = document.getElementById('list');
const map = L.map('map').setView([4.65, -74.10], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const markers = {};

function renderList() {
  listEl.innerHTML = '';
  Object.values(devices).forEach(d => {
    const div = document.createElement('div');
    div.className = 'device';
    div.innerHTML = `<div style="font-weight:700">${d.name}</div>
      <div class="muted">${d.imei} · ${d.speed || 0} km/h</div>
      <div class="muted">${new Date(d.updated||Date.now()).toLocaleString()}</div>`;
    listEl.appendChild(div);
  });
}

function updateMap() {
  Object.values(devices).forEach(d => {
    if (!d.lat || !d.lon) return;
    if (!markers[d.imei]) {
      markers[d.imei] = L.marker([d.lat, d.lon]).addTo(map).bindPopup(d.name);
    } else {
      markers[d.imei].setLatLng([d.lat, d.lon]);
    }
  });
}

function connect() {
  const proto = location.protocol === 'https:' ? 'wss' : 'ws';
  const host = location.hostname || 'localhost';
  const wsUrl = proto + '://' + host + ':5000/';
  const ws = new WebSocket(wsUrl);
  ws.onopen = () => console.log('ws open', wsUrl);
  ws.onmessage = (ev) => {
    try {
      const msg = JSON.parse(ev.data);
      if (msg.type === 'devices') {
        devices = {};
        msg.data.forEach(d => devices[d.imei] = d);
        renderList();
        updateMap();
      }
    } catch(e){ console.error(e); }
  };
  ws.onclose = () => {
    console.log('ws closed, retrying in 2s');
    setTimeout(connect, 2000);
  };
}

connect();
