'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  BookOpen,
  X,
  Share2,
  Check,
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  author: {
    name: string;
    role: string;
  };
  date: string;
  readTime: string;
  summary: string;
  content: {
    executiveSummary: string;
    sections: {
      heading: string;
      paragraphs: string[];
    }[];
    keyTakeaways: string[];
    marketData?: {
      label: string;
      val: string;
    }[];
  };
}

const articles: Article[] = [
  {
    id: 'bess-intraday-arbitrage',
    title: 'Navigating Intraday Power Volatility with Utility-Scale BESS Arbitrage',
    slug: 'bess-intraday-arbitrage',
    category: 'Battery Storage',
    image: '/images/blog_battery_storage_1791349327965.jpg',
    author: {
      name: 'Dr. Elena Vance',
      role: 'Head of Quantitative Storage Optimization',
    },
    date: 'October 2026',
    readTime: '6 min read',
    summary:
      'As renewable penetration crosses 60% on European grids, midday negative pricing creates unprecedented opportunities for utility-scale battery energy storage systems (BESS). We analyze algorithmic multi-market revenue stacking across FCR, aFRR, and continuous intraday auctions.',
    content: {
      executiveSummary:
        'Rapid renewable deployment across Germany and the Netherlands has deepened intra-day price spreads from €35/MWh in 2022 to over €110/MWh in recent quarters. This briefing breaks down how VoltPulse algorithmic dispatch models maximize battery storage IRR while strictly preserving manufacturer cycle degradation warranties.',
      sections: [
        {
          heading: '1. The Evolution of European Duck Curves and Negative Pricing',
          paragraphs: [
            'During peak photovoltaic generation hours (11:00 to 15:00 CET), wholesale spot prices on EPEX SPOT consistently crash below zero, occasionally touching -€50/MWh. For merchant storage operators, this presents a two-fold opportunity: getting paid to consume energy during surplus generation, followed by discharging during the evening residential ramp (18:00 to 21:00 CET) when prices frequently clear above €120/MWh.',
            'However, simple day-ahead spread capture leaves substantial margin on the table. Over 45% of total battery arbitrage value now materializes in the continuous 15-minute intraday market, where forecasting errors from wind farms trigger emergency transmission system operator (TSO) rebalancing.',
          ],
        },
        {
          heading: '2. Multi-Market Revenue Stacking Architecture',
          paragraphs: [
            'Rather than dedicating an asset to a single revenue stream, our algorithmic dispatch engine dynamically fragments storage capacity into three synchronized tiers: Tier 1 bids into Frequency Containment Reserves (FCR) for guaranteed capacity payments; Tier 2 provides automatic Frequency Restoration Reserves (aFRR); and Tier 3 trades continuous 15-minute wholesale arbitrage.',
            'By evaluating real-time battery cell temperature, State of Charge (SoC), and depth-of-discharge curves, our linear optimization algorithms preserve battery cycle life while capturing high-value intraday price spikes.',
          ],
        },
        {
          heading: '3. Risk Mitigation & Degradation Constraints',
          paragraphs: [
            'Aggressive cycling can void OEM warranty coverage within 4 years. VoltPulse embeds electrochemical degradation penalty factors directly into our order routing algorithm, ensuring a trade is only executed when the anticipated gross margin exceeds the marginal cell wear cost by a minimum 2.5x safety multiplier.',
          ],
        },
      ],
      keyTakeaways: [
        'Over 45% of merchant BESS revenue is generated in continuous 15-minute intraday markets rather than Day-Ahead auctions.',
        'Dynamic multi-market stacking across FCR, aFRR, and spot markets improves overall asset IRR by 34% compared to single-market bidding.',
        'Algorithmic cell temperature and depth-of-discharge constraints extend operational battery life by an estimated 2.8 calendar years.',
      ],
      marketData: [
        { label: 'Average Midday Solar Price (Q2-Q3 2026)', val: '-€18.40 / MWh' },
        { label: 'Evening Peak Clearing Price', val: '€112.50 / MWh' },
        { label: 'Average Captured Gross Spread', val: '€130.90 / MWh' },
        { label: 'Degradation Boundary Hurdle', val: '€14.20 / MWh equivalent' },
      ],
    },
  },
  {
    id: 'cross-border-congestion-redispatch',
    title: 'Cross-Border Transmission Congestion and Real-Time Grid Redispatch in Central Europe',
    slug: 'cross-border-congestion-redispatch',
    category: 'Grid Transmission',
    image: '/images/blog_grid_dispatch_1791349337969.jpg',
    author: {
      name: 'Marcus Lindqvist',
      role: 'Lead Interconnector Trader',
    },
    date: 'September 2026',
    readTime: '8 min read',
    summary:
      'Flow-Based Market Coupling (FBMC) has revolutionized cross-border power flows, but internal transmission bottlenecks between Northern wind hubs and Southern industrial clusters generate structural price divergences. We examine physical loop flows and redispatch strategies.',
    content: {
      executiveSummary:
        'Transmission bottlenecks remain the single greatest driver of regional electricity price divergence in Central Western Europe (CWE). This paper examines how cross-border market participants trade around Critical Network Elements with Contingencies (CNECs) and how Flow-Based Market Coupling governs cross-zonal capacities.',
      sections: [
        {
          heading: '1. The Physical Reality of European Loop Flows',
          paragraphs: [
            'While European electricity markets are financially structured into distinct national and regional bidding zones, electrical power obeys Kirchhoff’s physical laws, flowing across the path of least physical resistance rather than commercial contracts. Offshore wind generated in the German North Sea frequently loops through the Dutch, Polish, and Czech grids on its trajectory to industrial load centers in Bavaria and Austria.',
            'To prevent line overloads, Transmission System Operators (TSOs) increasingly restrict cross-border Net Transfer Capacity (NTC), directly impacting price convergence and creating localized market dislocations.',
          ],
        },
        {
          heading: '2. Flow-Based Market Coupling (FBMC) in Practice',
          paragraphs: [
            'The transition to Flow-Based Market Coupling allows the European Single Day-Ahead Coupling (SDAC) algorithm to calculate commercial capacity using physical grid equations rather than static border caps. For quantitative trading desks, this creates opportunities to model TSO security margins and predict redispatch interventions before market clearing.',
            'VoltPulse runs high-resolution telemetry simulations that forecast when critical interconnectors (such as BritNed, NorNed, and ALEGrO) will hit capacity ceilings, allowing our algorithmic books to hedge locational marginal price spreads.',
          ],
        },
        {
          heading: '3. Outlook: The Split Bidding Zone Debate',
          paragraphs: [
            'The ongoing European Commission bidding zone review continues to evaluate whether Germany should split into Northern and Southern price zones. We explore how such structural market changes would reshape forward contract liquidity and cross-border hedging strategies.',
          ],
        },
      ],
      keyTakeaways: [
        'Loop flows continue to absorb up to 22% of available cross-border physical transmission capacity during high wind periods.',
        'FBMC domain modeling provides a predictive edge for forecasting Day-Ahead border clearance prices across CWE.',
        'TSO redispatch costs in Germany exceeded €3.1B in 2025, underscoring the urgent market demand for targeted storage and flexibility assets.',
      ],
      marketData: [
        { label: 'DE-LU to FR Interconnector Utilization', val: '94.2% peak capacity' },
        { label: 'Average Cross-Zonal Spread (DE vs FR)', val: '€16.80 / MWh' },
        { label: 'Redispatch Energy Volume (Central Europe)', val: '24.1 TWh annualized' },
        { label: 'FBMC MinRAM Requirement', val: '70% European mandate' },
      ],
    },
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = ['All', 'Battery Storage', 'Grid Transmission'];

  const filteredArticles =
    selectedCategory === 'All'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <BookOpen className="w-4 h-4" />
          <span>VoltPulse Quantitative Research &amp; Market Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          European Power Market Insights
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          In-depth technical papers, quantitative trading strategies, and regulatory analyses published by the VoltPulse energy trading desk and storage optimization team.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 pt-4">
          <span className="text-xs text-slate-400 mr-2">Filter Topics:</span>
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid (2 placeholder entries) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-colors flex flex-col group"
          >
            {/* Visual media carrier */}
            <div className="aspect-[16/10] relative w-full overflow-hidden bg-slate-950">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                {/* Unboxed clean metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-emerald-400 font-medium">{article.category}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{article.date}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{article.readTime}</span>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                  {article.title}
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              {/* Author & Read Action */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-white">{article.author.name}</p>
                  <p className="text-[11px] text-slate-400">{article.author.role}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveArticle(article)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Read Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </article>
        ))}
      </div>

      {/* Link to calculator */}
      <div className="p-6 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Need to evaluate aggregate physical dispatch schedules?</h3>
          <p className="text-xs text-slate-400 mt-0.5">Use our secure Python 3 backend dispatch sum calculator.</p>
        </div>
        <Link
          href="/calculator"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap"
        >
          <span>Open Calculator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* FULL ARTICLE MODAL / DRAWER */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B101E] border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-10 relative space-y-8 my-8 text-slate-200">
            
            {/* Modal Header Controls */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-emerald-400 font-medium">{activeArticle.category}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{activeArticle.date}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{activeArticle.readTime}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Copy paper link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Close briefing"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Article Title */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {activeArticle.title}
              </h2>
              <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
                <span className="font-medium text-slate-200">{activeArticle.author.name}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{activeArticle.author.role}</span>
              </div>
            </div>

            {/* Hero Image in Article */}
            <div className="aspect-[16/9] relative w-full rounded-xl overflow-hidden border border-slate-800">
              <Image
                src={activeArticle.image}
                alt={activeArticle.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Executive Summary */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                Executive Summary
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeArticle.content.executiveSummary}
              </p>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                Key Strategic Takeaways
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                {activeArticle.content.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Body Sections */}
            <div className="space-y-6 pt-4 border-t border-slate-800">
              {activeArticle.content.sections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-lg font-bold text-white">
                    {section.heading}
                  </h3>
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-sm text-slate-300 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Market Data Table */}
            {activeArticle.content.marketData && (
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Key Quantitative Metrics
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeArticle.content.marketData.map((d, dIdx) => (
                    <div key={dIdx} className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-xs text-slate-400 block">{d.label}</span>
                      <span className="text-base font-semibold text-emerald-400 font-mono tabular-nums">{d.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">VoltPulse Energy Research Desk</span>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Close Briefing
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
