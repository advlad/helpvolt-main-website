# VoltPulse Energy Trading Platform

Institutional energy trading platform for European power markets, continuous intraday arbitrage, battery energy storage (BESS) dispatch, and cross-border interconnector optimization.

Built with **Next.js 15 (App Router)**, **Tailwind CSS**, and an **isolated Python 3 backend computation engine**.

---

## Architecture Overview

```
                          [ Client Browser ]
                                   │
                                   ▼
                   [ Nginx Reverse Proxy (Port 80/8080) ]
                   - Gzip Compression
                   - Static Asset Caching
                   - Security Headers (X-Frame, CSP, etc.)
                                   │
                                   ▼
                   [ Next.js 15 Standalone (Port 3000) ]
                   - Server-Side App Router
                   - API Route: POST /api/calculator
                                   │  (IPC / Child Process)
                                   ▼
               [ Isolated Python 3 Runtime (calculate_sum.py) ]
               - Strict Integer & Email Validation
               - Proprietary Dispatch Arithmetic
               - Never exposed to client bundle
```

---

## 1. Fast Start with Docker Compose (Recommended for Dev Machines)

The easiest way to run the entire stack (Next.js app with Python 3 runtime + Nginx reverse proxy) locally:

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (macOS / Windows / Linux)
- Docker Compose v2+

### Run with One Command:
```bash
docker compose up --build -d
```

### Accessing the Services:
- **Application via Nginx Proxy**: Open [http://localhost](http://localhost) (or [http://localhost:8080](http://localhost:8080) if port 80 is occupied on your host).
- **Direct Next.js Container**: [http://localhost:3000](http://localhost:3000)

### Stopping Containers:
```bash
docker compose down
```

---

## 2. Direct Local Development (Without Docker)

If you prefer to run directly on your workstation without Docker:

### Prerequisites
- Node.js 20+ and npm
- Python 3.10+ (standard installation, no extra pip packages required)

### Steps:
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run dev server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 3. Testing the Secure Python Backend Directly

The calculation script `scripts/calculate_sum.py` is invoked server-side by the Next.js API route (`/api/calculator`). You can test it standalone in your terminal:

```bash
python3 ./scripts/calculate_sum.py 250 175 "trader@voltpulse-energy.eu"
```

**Expected JSON output:**
```json
{
  "success": true,
  "sum": 425,
  "input_a": 250,
  "input_b": 175,
  "email": "trader@voltpulse-energy.eu",
  "runtime": {
    "engine": "Python 3 Backend Worker",
    "version": "3.10.12",
    "execution_platform": "linux",
    "timestamp_utc": "2026-10-07T05:03:45.732230+00:00",
    "pid": 153
  },
  "energy_metrics": {
    "total_aggregated_mw": 425,
    "est_daily_settlement_eur": 714000,
    "co2_impact_tons": 170.0
  }
}
```

---

## 4. Features & Pages

- **Landing Page (`/`)**: Institutional energy trading company profile, live bidding zone spread monitor (DE-LU, FR, NL, NO2, GB), asymmetrical capabilities bento grid, and proof metrics.
- **Market Insights Blog (`/blog`)**: High-value quantitative research briefings on BESS battery arbitrage and cross-border grid congestion with full modal reader and market data tables.
- **Dispatch Sum Calculator (`/calculator`)**: Trader email and two integer fields, evaluated securely via the isolated backend Python 3 script, complete with session calculation history.
- **Deployment Hub (`/deployment`)**: In-app architecture diagram and one-click code copy for `Dockerfile`, `docker-compose.yml`, and `nginx.conf`.

---

## 5. Security & Isolation Guarantee

The calculation logic (`scripts/calculate_sum.py`) is located outside the Next.js public directories and client bundles. It is invoked exclusively via Node's `child_process.execFile` without shell interpolation, preventing command injection and proprietary algorithm disclosure.
