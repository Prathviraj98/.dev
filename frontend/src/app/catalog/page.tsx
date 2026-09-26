import { Suspense } from 'react';
import CatalogSection from '@/components/catalog/CatalogSection';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import MobileBottomDock from '@/components/ui/MobileBottomDock';

export const metadata = {
  title: 'Web Catalog & Gallery | 100+ Production Apps & Sandbox',
  description:
    'Explore, filter, and test over 100+ curated web applications, SaaS platforms, micro-tools, and landing pages with real-time viewport sandboxes and customizer presets.',
};

function CatalogLoadingFallback() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center space-y-6">
      <div className="w-12 h-12 rounded-full border-4 border-cyan-500/30 border-t-cyan-400 animate-spin" />
      <p className="text-sm font-mono text-slate-400 animate-pulse">
        Initializing 100+ Web Catalog Items &amp; Sandbox Engine...
      </p>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-1 pt-16 pb-24">
        <Suspense fallback={<CatalogLoadingFallback />}>
          <CatalogSection />
        </Suspense>
      </main>

      <Footer />
      <MobileBottomDock />
    </div>
  );
}
