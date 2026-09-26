'use client';

import { AnimatePresence } from 'framer-motion';
import { CatalogItem } from '@/types/catalog';
import CatalogItemCard from './CatalogItemCard';

interface CatalogGridProps {
  items: CatalogItem[];
  loading?: boolean;
  onPreview: (item: CatalogItem) => void;
  onCustomize: (item: CatalogItem) => void;
  onReset: () => void;
}

export default function CatalogGrid({
  items,
  loading = false,
  onPreview,
  onCustomize,
  onReset,
}: CatalogGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl h-80 animate-pulse p-4 flex flex-col justify-between border border-white/5"
          >
            <div className="w-full h-40 bg-slate-900 rounded-xl" />
            <div className="space-y-2">
              <div className="w-3/4 h-4 bg-slate-800 rounded" />
              <div className="w-1/2 h-3 bg-slate-900 rounded" />
            </div>
            <div className="w-full h-8 bg-slate-900 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="glass-panel p-12 rounded-3xl text-center space-y-4 border border-white/10 max-w-lg mx-auto my-12">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center font-mono text-xl font-bold">
          !
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">No Curated Items Match Filters</h3>
          <p className="text-xs font-mono text-slate-400">
            Try adjusting your search terms, domain selections, or pricing parameters.
          </p>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-semibold hover:bg-cyan-500/30 transition-colors"
        >
          Reset All Catalog Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <CatalogItemCard
            key={item.id}
            item={item}
            onPreview={onPreview}
            onCustomize={onCustomize}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
