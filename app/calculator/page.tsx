'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  ShieldCheck,
  Terminal,
  Cpu,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCcw,
  Copy,
  Check,
  Zap,
} from 'lucide-react';

interface CalculationRecord {
  id: string;
  timestamp: string;
  email: string;
  num1: number;
  num2: number;
  sum: number;
  runtimeEngine: string;
  pythonVersion: string;
  durationMs: number;
  energyMetrics?: {
    total_aggregated_mw: number;
    est_daily_settlement_eur: number;
    co2_impact_tons: number;
  };
}

export default function CalculatorPage() {
  const [email, setEmail] = useState('');
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [latestResult, setLatestResult] = useState<CalculationRecord | null>(null);
  const [history, setHistory] = useState<CalculationRecord[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Field validation helpers
  const validateInputs = () => {
    if (!email.trim()) {
      return 'Email address is required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address.';
    }

    if (num1.trim() === '') {
      return 'First integer field is required.';
    }
    const val1 = Number(num1);
    if (!Number.isInteger(val1)) {
      return 'First field must be a valid whole integer (e.g. 150, -25). Decimals are not permitted.';
    }

    if (num2.trim() === '') {
      return 'Second integer field is required.';
    }
    const val2 = Number(num2);
    if (!Number.isInteger(val2)) {
      return 'Second field must be a valid whole integer (e.g. 275, 0). Decimals are not permitted.';
    }

    return null;
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const clientValidationError = validateInputs();
    if (clientValidationError) {
      setError(clientValidationError);
      return;
    }

    setLoading(true);
    const startTime = performance.now();

    try {
      const response = await fetch('/api/calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          num1: parseInt(num1, 10),
          num2: parseInt(num2, 10),
        }),
      });

      const data = await response.json();
      const duration = Math.round(performance.now() - startTime);

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Computation failed in backend pipeline.');
      }

      const record: CalculationRecord = {
        id: `calc-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        email: data.email,
        num1: data.input_a,
        num2: data.input_b,
        sum: data.sum,
        runtimeEngine: data.runtime?.engine || 'Python 3 Backend Engine',
        pythonVersion: data.runtime?.version || '3.10',
        durationMs: duration,
        energyMetrics: data.energy_metrics,
      };

      setLatestResult(record);
      setHistory((prev) => [record, ...prev.slice(0, 9)]);
    } catch (err: any) {
      setError(err.message || 'Network error executing backend calculation.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPreset = (a: number, b: number) => {
    setNum1(a.toString());
    setNum2(b.toString());
    if (!email) {
      setEmail('trader@voltpulse-energy.eu');
    }
    setError(null);
  };

  const handleCopyResult = (rec: CalculationRecord) => {
    const text = `VoltPulse Calculation: ${rec.num1} + ${rec.num2} = ${rec.sum} (Email: ${rec.email}, Python ${rec.pythonVersion})`;
    navigator.clipboard?.writeText(text);
    setCopiedId(rec.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    setEmail('');
    setNum1('');
    setNum2('');
    setError(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title & Scope */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <Terminal className="w-4 h-4" />
          <span>Server-Side Isolated Python 3 Runtime</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Institutional Dispatch Sum Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Compute aggregate power capacities and dispatch volumes. To protect proprietary trading logic, computations are executed strictly on the server by an isolated Python 3 subprocess. No computation scripts are exposed to the client-side bundle.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Form (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Calculation Parameters</h2>
              <p className="text-xs text-slate-400 mt-0.5">Required: Trader Email &amp; Two Whole Integers</p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-1.5">
            <span className="text-xs text-slate-400">Quick Energy Presets (MW):</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleApplyPreset(250, 175)}
                className="px-2.5 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
              >
                250 + 175
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset(500, 620)}
                className="px-2.5 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
              >
                500 + 620
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset(-50, 200)}
                className="px-2.5 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
              >
                -50 + 200 (Deficit)
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset(1200, 2800)}
                className="px-2.5 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
              >
                1200 + 2800 (Grid Scale)
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleCalculate} className="space-y-5">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-medium text-slate-200">
                Trader Email Address <span className="text-emerald-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. desk-trader@voltpulse-energy.eu"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                disabled={loading}
                required
              />
              <span className="text-[11px] text-slate-400 block">
                Required for authentication and dispatch audit trails.
              </span>
            </div>

            {/* Integer 1 and Integer 2 Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1.5">
                <label htmlFor="num1" className="block text-xs font-medium text-slate-200">
                  First Integer (Primary MW) <span className="text-emerald-400">*</span>
                </label>
                <input
                  id="num1"
                  type="number"
                  step="1"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  placeholder="e.g. 250"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                  disabled={loading}
                  required
                />
                <span className="text-[11px] text-slate-400 block">
                  Must be a whole integer value.
                </span>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="num2" className="block text-xs font-medium text-slate-200">
                  Second Integer (Ancillary MW) <span className="text-emerald-400">*</span>
                </label>
                <input
                  id="num2"
                  type="number"
                  step="1"
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  placeholder="e.g. 175"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                  disabled={loading}
                  required
                />
                <span className="text-[11px] text-slate-400 block">
                  Must be a whole integer value.
                </span>
              </div>

            </div>

            {/* Error Message banner */}
            {error && (
              <div className="p-3.5 rounded-lg bg-red-950/50 border border-red-800/80 text-xs text-red-200 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">{error}</div>
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-5 rounded-lg bg-emerald-400 hover:bg-emerald-300 disabled:bg-slate-700 text-slate-950 font-bold text-sm transition-all shadow-md shadow-emerald-950/30 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    <span>Executing Python Backend Process...</span>
                  </>
                ) : (
                  <>
                    <Calculator className="w-4 h-4" />
                    <span>Compute Sum via Python Backend</span>
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Security Guarantee Note */}
          <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-850 flex items-start gap-3 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-200 font-medium">Proprietary Isolation Guarantee:</span>{' '}
              The calculation script (<code className="text-emerald-300">calculate_sum.py</code>) executes inside an isolated Python CPython worker process via server-side child_process. Client browsers receive only sanitised JSON outputs.
            </div>
          </div>

        </div>

        {/* Right Column: Execution Output & Architecture (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Latest Result Card */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Calculation Output
              </span>
              {latestResult && (
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Success ({latestResult.durationMs}ms)</span>
                </span>
              )}
            </div>

            {latestResult ? (
              <div className="space-y-5">
                
                {/* Large Computed Sum Banner */}
                <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/30 text-center space-y-1">
                  <span className="text-xs text-slate-400 block font-medium">
                    Computed Sum (Integer A + Integer B)
                  </span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                    {latestResult.sum.toLocaleString()}
                  </div>
                  <span className="text-xs text-emerald-400 font-mono">
                    {latestResult.num1} + {latestResult.num2} = {latestResult.sum} MW
                  </span>
                </div>

                {/* Runtime & Security Verification */}
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Authenticated Email:</span>
                    <span className="text-slate-200 font-mono truncate max-w-[200px]">{latestResult.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Backend Engine:</span>
                    <span className="text-emerald-400 font-mono">{latestResult.runtimeEngine}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Python CPython Version:</span>
                    <span className="text-slate-200 font-mono">v{latestResult.pythonVersion}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Server Execution Time:</span>
                    <span className="text-slate-200 font-mono">{latestResult.timestamp}</span>
                  </div>
                </div>

                {/* Energy Domain Translation */}
                {latestResult.energyMetrics && (
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-400 block">Est. 24h Base Revenue</span>
                      <span className="text-base font-bold text-white font-mono tabular-nums">
                        &euro;{latestResult.energyMetrics.est_daily_settlement_eur.toLocaleString()}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-400 block">CO2 Abatement</span>
                      <span className="text-base font-bold text-emerald-400 font-mono tabular-nums">
                        {latestResult.energyMetrics.co2_impact_tons} t
                      </span>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => handleCopyResult(latestResult)}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    {copiedId === latestResult.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied Summary</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Calculation</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            ) : (
              <div className="py-12 px-4 text-center text-slate-500 space-y-2">
                <Cpu className="w-10 h-10 mx-auto text-slate-700 animate-pulse" />
                <p className="text-sm font-medium text-slate-400">Awaiting input submission</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Enter your email address and two integer values to invoke the Python computation backend.
                </p>
              </div>
            )}
          </div>

          {/* Architecture Explainer */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3 text-xs">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              Secure Pipeline Topology
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Next.js App Router POST <code className="text-slate-300">/api/calculator</code></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Validation &amp; sanitization (rejects non-integers)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Non-shell IPC invocation: <code className="text-slate-300">scripts/calculate_sum.py</code></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Standardized JSON stream returned to client</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-850">
              <Link href="/deployment" className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1">
                View Docker &amp; Nginx deployment configs &rarr;
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* History Log Table */}
      {history.length > 0 && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Session Calculation Log ({history.length})
            </h3>
            <span className="text-xs text-slate-400">Retained in browser session</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-2 px-3">Time</th>
                  <th className="py-2 px-3">Trader Email</th>
                  <th className="py-2 px-3">Integer A</th>
                  <th className="py-2 px-3">Integer B</th>
                  <th className="py-2 px-3">Computed Sum</th>
                  <th className="py-2 px-3">Backend</th>
                  <th className="py-2 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                {history.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3">{rec.timestamp}</td>
                    <td className="py-2.5 px-3 truncate max-w-[150px]">{rec.email}</td>
                    <td className="py-2.5 px-3 tabular-nums">{rec.num1}</td>
                    <td className="py-2.5 px-3 tabular-nums">{rec.num2}</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold tabular-nums">
                      {rec.sum}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">Python {rec.pythonVersion}</td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleCopyResult(rec)}
                        className="text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 transition-colors inline-flex items-center gap-1"
                        title="Copy to clipboard"
                      >
                        {copiedId === rec.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedId === rec.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
