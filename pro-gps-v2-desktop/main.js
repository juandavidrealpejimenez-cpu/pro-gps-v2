// Electron main for Pro GPS V2
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let backendProc = null;

function startBackend() {
  const backendPath = path.join(__dirname, '..', 'pro-gps-v2-backend', 'app.js');
  backendProc = spawn(process.execPath, [backendPath], {
    cwd: path.dirname(backendPath),
    stdio: 'ignore',
    detached: true
  });
  backendProc.unref();
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const indexPath = path.join(__dirname, '..', 'pro-gps-v2-frontend', 'build', 'index.html');
  win.loadFile(indexPath).catch(err => {
    win.loadURL('http://localhost:3000');
  });
}

app.whenReady().then(() => {
  startBackend();
  setTimeout(createWindow, 1200);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
