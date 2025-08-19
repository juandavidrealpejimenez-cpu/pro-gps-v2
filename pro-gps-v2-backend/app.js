// pro-gps-v2 backend - demo in-memory simulator
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static frontend build when packaged
app.use(express.static(path.join(__dirname, '..', 'pro-gps-v2-frontend', 'build')));

// Simple API
app.get('/api/devices', (req, res) => {
  res.json(Object.values(devices));
});

// In-memory devices (simulated)
const devices = {
  "1001": { imei: "1001", name: "Camión 1001", lat: 4.6500, lon: -74.1000, speed: 40 },
  "1002": { imei: "1002", name: "Van 1002", lat: 4.6550, lon: -74.1050, speed: 30 },
  "1003": { imei: "1003", name: "Moto 1003", lat: 4.6450, lon: -74.0950, speed: 55 }
};

// Broadcast helper
function broadcast() {
  const payload = JSON.stringify({ type: 'devices', data: Object.values(devices) });
  wss.clients.forEach(c => {
    if (c.readyState === WebSocket.OPEN) c.send(payload);
  });
}

// Simulate movement (small random walk)
setInterval(() => {
  Object.values(devices).forEach(d => {
    const dx = (Math.random() - 0.5) * 0.0008;
    const dy = (Math.random() - 0.5) * 0.0008;
    d.lat += dx;
    d.lon += dy;
    d.updated = new Date().toISOString();
  });
  broadcast();
}, 2000);

// WebSocket for real-time updates
wss.on('connection', ws => {
  ws.send(JSON.stringify({ type: 'devices', data: Object.values(devices) }));
});

// For packaging: start server on port from env or 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Pro GPS V2 backend listening on http://localhost:${PORT}`);
});
