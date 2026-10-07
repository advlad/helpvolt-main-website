import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'VoltPulse Energy Trading | Quantitative Power Arbitrage & Grid Optimization',
  description:
    'Institutional energy trading platform specializing in cross-border power arbitrage, algorithmic battery storage dispatch, and renewable grid balancing.',
  openGraph: {
    title: 'VoltPulse Energy Trading | Quantitative Power Arbitrage & Grid Optimization',
    description:
      'Institutional energy trading platform specializing in cross-border power arbitrage, algorithmic battery storage dispatch, and renewable grid balancing.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VoltPulse Energy Trading | Quantitative Power Arbitrage & Grid Optimization',
    description:
      'Institutional energy trading platform specializing in cross-border power arbitrage, algorithmic battery storage dispatch, and renewable grid balancing.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#090D16] text-slate-100 antialiased selection:bg-emerald-500/20 selection:text-emerald-300 flex flex-col font-sans" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
