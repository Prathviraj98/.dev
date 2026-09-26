'use client';

import { Search, X, LayoutGrid, Table, Columns, ArrowUpDown, Sparkles } from 'lucide-react';
import { FilterState, SortOption, LayoutMode } from '@/types/catalog';

interface CatalogHeaderProps {
  filters: FilterState;
  totalItems: number;
  onSearchChange: (q: string) => void;
  onSortChange: (sort: SortOption) => void;
  onLayoutChange: (layout: LayoutMode) => void;
  onClearFilters: () => void;
}

export default function CatalogHeader({
  filters,
  totalItems,
  onSearchChange,
  onSortChange,
  onLayoutChange,
  onClearFilters,
}: CatalogHeaderProps) {
  const hasActiveFilters =
    filters.search ||
    filters.domains.length > 0 ||
    filters.platforms.length > 0 ||
    filters.pricing.length > 0 ||
    filters.techStack.length > 0;

  return (
    <div className="space-y-4">
      {/* Top Search & Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 glass-panel p-3.5 sm:p-4 rounded-2xl border border-white/10">
        {/* Full-Text Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search 100+ templates, tech stacks (e.g. Next.js 14, WebAssembly, Rust)..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-[16px] sm:text-xs font-mono text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Layout View Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
            <select
              value={filters.sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="pl-8 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors appearance-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="recent">Recently Added</option>
              <option value="trending">Trending Now</option>
              <option value="alphabetical">Alphabetical (A-Z)</option>
            </select>
          </div>

          {/* Layout Mode Toggles */}
          <div className="flex items-center space-x-1 glass-card p-1 rounded-xl border border-white/10">
            <button
              onClick={() => onLayoutChange('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                filters.layout === 'grid'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onLayoutChange('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                filters.layout === 'table'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <Table className="w-4 h-4" />
            </button>
            <button
              onClick={() => onLayoutChange('masonry')}
              className={`p-1.5 rounded-lg transition-colors ${
                filters.layout === 'masonry'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Masonry View"
            >
              <Columns className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips & Result Counter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs font-mono">
        <div className="flex items-center space-x-2 text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>
            Showing <strong className="text-cyan-300">{totalItems}</strong> curated web templates
          </span>
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-1.5">
            {filters.domains.map((d) => (
              <span
                key={d}
                className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px]"
              >
                {d}
              </span>
            ))}
            {filters.platforms.map((p) => (
              <span
                key={p}
                className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px]"
              >
                {p}
              </span>
            ))}
            {filters.pricing.map((pr) => (
              <span
                key={pr}
                className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px]"
              >
                {pr}
              </span>
            ))}
            <button
              onClick={onClearFilters}
              className="text-[10px] text-rose-400 hover:underline font-bold ml-1"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
