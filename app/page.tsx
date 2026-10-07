'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Zap,
  Globe,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

export default function HomePage() {
  // Interactive market simulation state
  const [activeZone, setActiveZone] = useState('DE-LU');

  const marketZones = [
    {
      code: 'DE-LU',
      name: 'Germany / Luxembourg',
      dayAhead: 74.8,
      intraday: 89.2,
      spread: 14.4,
      volumeTwh: '7.8 TWh',
      trend: '+4.2%',
    },
    {
      code: 'FR',
      name: 'France (RTE)',
      dayAhead: 68.3,
      intraday: 72.1,
      spread: 3.8,
      volumeTwh: '4.9 TWh',
      trend: '-1.1%',
    },
    {
      code: 'NL',
      name: 'Netherlands (TenneT)',
      dayAhead: 79.5,
      intraday: 93.0,
      spread: 13.5,
      volumeTwh: '3.4 TWh',
      trend: '+6.8%',
    },
    {
      code: 'NO2',
      name: 'Norway South (Statnett)',
      dayAhead: 41.2,
      intraday: 43.5,
      spread: 2.3,
      volumeTwh: '3.1 TWh',
      trend: '+0.5%',
    },
    {
      code: 'GB',
      name: 'Great Britain (N2EX)',
      dayAhead: 83.1,
      intraday: 97.4,
      spread: 14.3,
      volumeTwh: '2.4 TWh',
      trend: '+5.4%',
    },
  ];

  const currentZoneData = marketZones.find((z) => z.code === activeZone) || marketZones[0];

  return (
    <div className="w-full space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Algorithmic Power Trading &middot; Physical Grid Optimization</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Precision Quantitative Execution Across European Power Grids
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              VoltPulse operates continuous 24/7 algorithmic power dispatch, cross-border transmission arbitrage, and battery storage optimization across EPEX SPOT, NordPool, and EEX.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-lg shadow-emerald-950/40"
              >
                <span>Launch Dispatch Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 rounded-lg transition-colors"
              >
                <span>Read Research Insights</span>
              </Link>
            </div>

            {/* Proof metrics row adjacent to proposition */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
              <div>
                <p className="text-2xl font-bold text-white font-mono tabular-nums">&euro;4.8B</p>
                <p className="text-xs text-slate-400 mt-0.5">2025 Trading Turnover</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-mono tabular-nums">21.6 TWh</p>
                <p className="text-xs text-slate-400 mt-0.5">Power Dispatched</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">&lt; 8ms</p>
                <p className="text-xs text-slate-400 mt-0.5">Order Routing Latency</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-mono tabular-nums">14 Zones</p>
                <p className="text-xs text-slate-400 mt-0.5">Coupled Market Hubs</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Media Carrier */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl bg-slate-900 group">
              <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] relative w-full">
                <Image
                  src="/images/hero_energy_trading_1791349317887.jpg"
                  alt="VoltPulse European Energy Trading Floor and Operations Center"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/30 to-transparent" />
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/50 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Central Operations Center &middot; Frankfurt</p>
                  <p className="text-[11px] text-slate-400">Algorithmic dispatch across EPEX SPOT &amp; NordPool</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>ONLINE</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. LIVE INTERACTIVE MARKET ZONES TICKER & MONITOR */}
      <section id="markets" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Real-Time Electricity Spreads
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                European Bidding Zone Monitor
              </h2>
            </div>
            
            {/* Zone Selector Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950/80 rounded-lg border border-slate-800">
              {marketZones.map((z) => (
                <button
                  key={z.code}
                  onClick={() => setActiveZone(z.code)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    activeZone === z.code
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {z.code}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive display panel for current zone */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-xl bg-slate-950/50 border border-slate-800/80 mb-6">
            <div>
              <p className="text-xs text-slate-400">Active Bidding Area</p>
              <p className="text-lg font-semibold text-white mt-0.5">{currentZoneData.name}</p>
              <span className="text-[11px] text-slate-500 font-mono">Code: {currentZoneData.code}</span>
            </div>

            <div>
              <p className="text-xs text-slate-400">Day-Ahead Base Price</p>
              <p className="text-2xl font-bold text-white font-mono tabular-nums mt-0.5">
                &euro;{currentZoneData.dayAhead.toFixed(2)}
                <span className="text-xs text-slate-400 font-sans ml-1">/ MWh</span>
              </p>
              <p className="text-[11px] text-slate-400">EPEX Auction 12:00 CET</p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Intraday Continuous VWAP</p>
              <p className="text-2xl font-bold text-emerald-400 font-mono tabular-nums mt-0.5">
                &euro;{currentZoneData.intraday.toFixed(2)}
                <span className="text-xs text-slate-400 font-sans ml-1">/ MWh</span>
              </p>
              <p className="text-[11px] text-emerald-400/90 font-mono">Trend: {currentZoneData.trend}</p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Arbitrage Spread (DA vs ID)</p>
              <p className="text-2xl font-bold text-amber-400 font-mono tabular-nums mt-0.5">
                +&euro;{currentZoneData.spread.toFixed(2)}
                <span className="text-xs text-slate-400 font-sans ml-1">/ MWh</span>
              </p>
              <p className="text-[11px] text-slate-400">Desk Volume: {currentZoneData.volumeTwh}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-400 gap-2 border-t border-slate-800 pt-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Data source: Simulated continuous EPEX SPOT &amp; NordPool physical schedules</span>
            </div>
            <Link href="/calculator" className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1">
              Calculate aggregate dispatch volume &rarr;
            </Link>
          </div>

        </div>
      </section>

      {/* 3. CAPABILITIES BENTO GRID */}
      <section id="capabilities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Trading Infrastructure
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Institutional Asset Optimization
          </h2>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl">
            Our algorithmic models ingest multi-gigabyte weather forecasts, live transmission constraint telemetry, and generation ramp data to deliver market-leading risk-adjusted returns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Large Col-span-8 */}
          <div className="md:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-emerald-400">01. Continuous Arbitrage</span>
              <Cpu className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Intraday 15-Minute Contract Arbitrage
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Real-time programmatic execution across European 15-minute and 30-minute power products. When sudden cloud cover or offshore wind dropouts cause severe supply/demand imbalances, our sub-second algorithmic quoting engines extract liquidity and stabilize the wholesale clearing price.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-400 block">Execution Speed</span>
                <span className="text-white font-mono font-semibold">Sub-8 Millisecond</span>
              </div>
              <div>
                <span className="text-slate-400 block">Order Book Access</span>
                <span className="text-white font-mono font-semibold">EPEX / NordPool FIX</span>
              </div>
              <div>
                <span className="text-slate-400 block">Market Share</span>
                <span className="text-white font-mono font-semibold">~3.8% German Intraday</span>
              </div>
            </div>
          </div>

          {/* Card 2: Col-span-4 */}
          <div className="md:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-emerald-400">02. Storage Assets</span>
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Utility BESS Optimization
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Multi-market revenue stacking for large battery storage systems. Balancing degradation wear against Frequency Containment Reserves (FCR) and dynamic wholesale spreads.
            </p>
            <Link href="/blog" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1">
              Read BESS Research Paper &rarr;
            </Link>
          </div>

          {/* Card 3: Col-span-4 */}
          <div className="md:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-emerald-400">03. Grid Corridors</span>
              <Globe className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Cross-Border Interconnectors
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Capturing cross-zonal transmission differentials between high-hydro Scandinavia, nuclear France, and wind-heavy Germany using JAO transmission capacity rights.
            </p>
            <div className="pt-2 text-xs text-slate-400">
              Active lines: BritNed, NorNed, IFA2, Nemo Link.
            </div>
          </div>

          {/* Card 4: Col-span-8 */}
          <div className="md:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-emerald-400">04. Merchant Risk Management</span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Renewable PPA Firming &amp; Imbalance Hedging
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Independent power producers face steep balance group penalty fees when output forecasts diverge from physical generation. VoltPulse offers automated physical firming and volumetric hedge contracts that insulate project financiers from negative clearing price hours.
            </p>
            <div className="flex items-center gap-6 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
              <span>99.98% SLA Availability</span>
              <span aria-hidden="true">&middot;</span>
              <span>Fully Collateralized Clean Hedging</span>
              <span aria-hidden="true">&middot;</span>
              <span>Direct TSO Dispatch Gateway</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. FEATURED INSIGHTS TEASER (WITH GENERATED IMAGES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Market Intelligence
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Latest Quantitative Research
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1.5"
          >
            <span>View All Research Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Article 1 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-colors flex flex-col group">
            <div className="aspect-[16/9] relative w-full overflow-hidden bg-slate-950">
              <Image
                src="/images/blog_battery_storage_1791349327965.jpg"
                alt="Battery Energy Storage System BESS Market Arbitrage"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span>Battery Storage</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>Published October 2026</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>6 min read</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                  Navigating Intraday Power Volatility with Utility-Scale BESS Arbitrage
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                  How high renewable penetration creates negative price spikes in midday solar hours, and the quantitative models used to sequence battery charging and frequency response stacking.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">By Dr. Elena Vance</span>
                <Link href="/blog" className="text-xs font-semibold text-emerald-400 hover:underline">
                  Read Article &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Article 2 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-colors flex flex-col group">
            <div className="aspect-[16/9] relative w-full overflow-hidden bg-slate-950">
              <Image
                src="/images/blog_grid_dispatch_1791349337969.jpg"
                alt="European Cross-Border Transmission Congestion"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span>Grid Transmission</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>Published September 2026</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>8 min read</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                  Cross-Border Transmission Congestion and Real-Time Grid Redispatch
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                  Analysis of loop flows, Flow-Based Market Coupling (FBMC) constraints, and redispatch costs impacting power price convergence across Germany, France, and Benelux.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">By Marcus Lindqvist</span>
                <Link href="/blog" className="text-xs font-semibold text-emerald-400 hover:underline">
                  Read Article &rarr;
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. CALCULATOR CALLOUT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-2">
              <Terminal className="w-4 h-4" />
              <span>Isolated Python 3 Backend Worker</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Institutional Dispatch &amp; Power Sum Calculator
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Test our secure backend calculation pipeline. Input your trader email and two integer capacities. The sum is executed exclusively in an isolated Python 3 subprocess on the server, ensuring zero intellectual property leakage to client browsers.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-md shadow-emerald-950"
              >
                <span>Open Calculator Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/deployment"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <span>View Docker &amp; Nginx Setup</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
