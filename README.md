
# Pro GPS V2 - Demo (ready to upload to GitHub)

This package includes a **demo, self-contained** version of Pro GPS V2 for testing and packaging.

## What is included
- pro-gps-v2-backend/   -> Express + WebSocket demo backend (in-memory simulated devices)
- pro-gps-v2-frontend/  -> Static frontend build (Leaflet map) in `build/`
- pro-gps-v2-desktop/   -> Electron wrapper that starts the backend and loads the frontend
- .github/workflows/    -> Workflow stub for building the installer (you need to configure secrets if building actual releases)
- README.md

## How to use locally (no installation required)
1. Install Node.js (if you want to test locally):
   - Backend: open a terminal, `cd pro-gps-v2-backend` then `npm install` and `npm start`
   - Frontend: the frontend is static in `pro-gps-v2-frontend/build`; the backend serves it when running.
   - Desktop: to test Electron, `cd pro-gps-v2-desktop`, `npm install`, then `npm start` (requires Electron runtime).

2. Upload to GitHub in a repo named `pro-gps-v2` (public). The provided GitHub Actions workflow is a stub and must be adapted to your CI runner secrets to produce installer artifacts.

## About the demo
- This demo uses an **in-memory simulator** (no MongoDB required) and ships with simulated moving devices so you can see the map in action immediately.
- For production: integrate MongoDB Atlas by editing backend connection and enabling persistence.

## Next steps to produce installer on GitHub
1. Create a GitHub repo and push the contents of this folder.
2. Configure `.github/workflows/build.yml` with appropriate runner and secrets (if using electron-builder and signing).
3. Enable Actions and allow the build to run; artifacts (installer) will appear in Releases.

---
Pro GPS V2 - Demo
