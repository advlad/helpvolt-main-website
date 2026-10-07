'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Terminal,
  Server,
  Layers,
  Copy,
  Check,
  CheckCircle2,
  Box,
  FileCode,
  Shield,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export default function DeploymentPage() {
  const [activeTab, setActiveTab] = useState<'compose' | 'dockerfile' | 'nginx' | 'python'>('compose');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const dockerComposeSnippet = `services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: voltpulse_web
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - HOSTNAME=0.0.0.0
    networks:
      - voltpulse_network

  nginx:
    image: nginx:alpine
    container_name: voltpulse_nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "8080:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - web
    networks:
      - voltpulse_network

networks:
  voltpulse_network:
    driver: bridge`;

  const dockerfileSnippet = `# Multi-stage Dockerfile for Next.js 15 with Python 3 backend worker
FROM node:20-alpine AS base
RUN apk add --no-cache python3 libc6-compat

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* bun.lock* ./
RUN npm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache python3 bash
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
RUN chmod +x ./scripts/calculate_sum.py

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]`;

  const nginxSnippet = `worker_processes auto;
events { worker_connections 1024; }

http {
    include /etc/nginx/mime.types;
    gzip on;
    gzip_types text/plain text/css application/json application/javascript image/svg+xml;

    upstream nextjs_upstream {
        server web:3000;
        keepalive 32;
    }

    server {
        listen 80;
        server_name localhost;

        location /_next/static/ {
            proxy_pass http://nextjs_upstream;
            expires 365d;
            add_header Cache-Control "public, max-age=31536000, immutable";
        }

        location / {
            proxy_pass http://nextjs_upstream;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}`;

  const pythonSnippet = `#!/usr/bin/env python3
import sys, json, datetime, os

def calculate(int_a: int, int_b: int, email: str):
    total = int_a + int_b
    return {
        "success": True,
        "sum": total,
        "input_a": int_a,
        "input_b": int_b,
        "email": email,
        "runtime": {
            "engine": "Python 3 Backend Worker",
            "version": sys.version.split()[0],
            "timestamp_utc": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "pid": os.getpid()
        },
        "energy_metrics": {
            "total_aggregated_mw": total,
            "est_daily_settlement_eur": total * 24 * 70,
            "co2_impact_tons": round(total * 0.4, 2)
        }
    }

if __name__ == "__main__":
    int_a = int(sys.argv[1])
    int_b = int(sys.argv[2])
    email = sys.argv[3] if len(sys.argv) > 3 else ""
    print(json.dumps(calculate(int_a, int_b, email)))`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <Box className="w-4 h-4" />
          <span>Dev Machine &amp; Container Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Development Machine Deployment Guide
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          The VoltPulse platform is engineered to run both natively in Google AI Studio and on local developer workstations using Docker, Docker Compose, and Nginx.
        </p>
      </div>

      {/* Architecture Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
            <Server className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">Nginx Gateway</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Acts as high-performance reverse proxy on ports 80/8080, handling HTTP keepalive, Gzip payload compression, and security headers.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">Next.js App Server</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Multi-stage Alpine image serving App Router on port 3000. Provides standalone server bundle with optimized static caching.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
            <Shield className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">Python 3 Isolation</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Installed inside the container image. Dispatched securely via Node child_process, protecting quantitative calculations from client inspection.
          </p>
        </div>

      </div>

      {/* Deployment Step-by-Step Instructions */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-white">Quick Start on Local Dev Machine</h2>

        <div className="space-y-6 text-sm text-slate-300">
          
          {/* Step 1 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-white">
              <span className="w-5 h-5 rounded-full bg-emerald-400 text-slate-900 text-xs flex items-center justify-center font-bold">1</span>
              <span>Clone &amp; Verify Prerequisites</span>
            </div>
            <p className="text-xs text-slate-400 pl-7">
              Ensure you have Docker and Docker Compose installed. Alternatively, ensure Node.js 20+ and Python 3 are present on your host.
            </p>
            <div className="pl-7">
              <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-slate-200 border border-slate-800 flex items-center justify-between">
                <span>docker --version &amp;&amp; docker compose version &amp;&amp; python3 --version</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('docker --version && docker compose version && python3 --version', 'cmd1')}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedKey === 'cmd1' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-white">
              <span className="w-5 h-5 rounded-full bg-emerald-400 text-slate-900 text-xs flex items-center justify-center font-bold">2</span>
              <span>Launch with Docker Compose (One-Command Start)</span>
            </div>
            <p className="text-xs text-slate-400 pl-7">
              Builds the multi-stage image, packages standalone Next.js + Python 3, and binds Nginx reverse proxy.
            </p>
            <div className="pl-7">
              <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-slate-200 border border-slate-800 flex items-center justify-between">
                <span>docker compose up --build -d</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('docker compose up --build -d', 'cmd2')}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedKey === 'cmd2' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-emerald-400/90 mt-2">
                &rarr; Open <code className="text-white">http://localhost</code> or <code className="text-white">http://localhost:8080</code> in your browser.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-white">
              <span className="w-5 h-5 rounded-full bg-emerald-400 text-slate-900 text-xs flex items-center justify-center font-bold">3</span>
              <span>Running Natively Without Docker (Direct Local Dev)</span>
            </div>
            <p className="text-xs text-slate-400 pl-7">
              If running directly on macOS/Linux/Windows with Node.js and Python installed:
            </p>
            <div className="pl-7 space-y-2">
              <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-slate-200 border border-slate-800 flex items-center justify-between">
                <span>npm install &amp;&amp; npm run dev</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('npm install && npm run dev', 'cmd3')}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedKey === 'cmd3' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-slate-400">
                The local dev server runs on <code className="text-white">http://localhost:3000</code> and invokes <code className="text-emerald-300">scripts/calculate_sum.py</code> using your local Python 3 interpreter.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-white">
              <span className="w-5 h-5 rounded-full bg-emerald-400 text-slate-900 text-xs flex items-center justify-center font-bold">4</span>
              <span>Direct CLI Testing of Python Backend Script</span>
            </div>
            <p className="text-xs text-slate-400 pl-7">
              You can test the exact calculation script directly from terminal:
            </p>
            <div className="pl-7">
              <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-slate-200 border border-slate-800 flex items-center justify-between">
                <span>python3 ./scripts/calculate_sum.py 250 175 trader@voltpulse-energy.eu</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('python3 ./scripts/calculate_sum.py 250 175 trader@voltpulse-energy.eu', 'cmd4')}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedKey === 'cmd4' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Code Inspector Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('compose')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'compose'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              docker-compose.yml
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('dockerfile')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'dockerfile'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Dockerfile
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('nginx')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'nginx'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              nginx/nginx.conf
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('python')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'python'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              scripts/calculate_sum.py
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              const text =
                activeTab === 'compose'
                  ? dockerComposeSnippet
                  : activeTab === 'dockerfile'
                  ? dockerfileSnippet
                  : activeTab === 'nginx'
                  ? nginxSnippet
                  : pythonSnippet;
              copyToClipboard(text, 'snippet');
            }}
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            {copiedKey === 'snippet' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied Code</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy File Contents</span>
              </>
            )}
          </button>
        </div>

        {/* Code Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto text-xs font-mono text-slate-300">
          <pre>
            {activeTab === 'compose' && dockerComposeSnippet}
            {activeTab === 'dockerfile' && dockerfileSnippet}
            {activeTab === 'nginx' && nginxSnippet}
            {activeTab === 'python' && pythonSnippet}
          </pre>
        </div>
      </div>

      {/* CTA back to calculator */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white">Test the live calculation engine in your browser</h3>
          <p className="text-xs text-slate-400 mt-0.5">Executes instantly on Google AI Studio Cloud Run runtime.</p>
        </div>
        <Link
          href="/calculator"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap"
        >
          <span>Open Calculator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
