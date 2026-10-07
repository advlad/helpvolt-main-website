import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#070A11] border-t border-slate-800/80 text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>VoltPulse Energy</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Quantitative physical and financial power trading desk optimizing continuous intraday, BESS assets, and cross-border interconnectors across European grids.
            </p>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p>Registered Participant: ACER &amp; REMIT</p>
              <p>Exchange Clearances: EPEX SPOT · NordPool · EEX</p>
            </div>
          </div>

          {/* Markets */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Power Markets
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white transition-colors">DE-LU (Germany / Luxembourg)</span></li>
              <li><span className="hover:text-white transition-colors">FR (France RTE)</span></li>
              <li><span className="hover:text-white transition-colors">NL / BE (Central Western Europe)</span></li>
              <li><span className="hover:text-white transition-colors">NO2 / SE3 (Nordic Hydro Corridors)</span></li>
              <li><span className="hover:text-white transition-colors">GB (N2EX / APX UK)</span></li>
            </ul>
          </div>

          {/* Navigation Mirrors */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Platform &amp; Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-white transition-colors">Landing Overview</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Market Insights &amp; Research</Link></li>
              <li><Link href="/calculator" className="hover:text-white transition-colors">Dispatch Sum Calculator (Python)</Link></li>
              <li><Link href="/deployment" className="hover:text-white transition-colors">Docker &amp; Nginx Deployment</Link></li>
            </ul>
          </div>

          {/* Compliance & Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Trading Desk Inquiries
            </h4>
            <p className="text-xs text-slate-400 mb-2">
              Desk Operations: 24/7 continuous dispatch shift desk.
            </p>
            <p className="text-xs text-slate-300 font-mono">
              dispatch@voltpulse-energy.eu
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
              For local dev setup: check <Link href="/deployment" className="underline hover:text-emerald-400">Dockerfile &amp; compose</Link> configs.
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} VoltPulse Energy Trading GmbH. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Market Transparency Notice</span>
            <span aria-hidden="true">&middot;</span>
            <span>REMIT Data Reporting</span>
            <span aria-hidden="true">&middot;</span>
            <span>Privacy Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
