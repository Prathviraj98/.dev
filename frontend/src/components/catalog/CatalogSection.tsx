'use client';

import { useMemo, useState } from 'react';
import { catalogItems } from '@/lib/catalogData';
import { useCatalogUrlState } from '@/hooks/useCatalogUrlState';
import CatalogHeader from './CatalogHeader';
import CatalogFilters from './CatalogFilters';
import CatalogGrid from './CatalogGrid';
import CatalogTableView from './CatalogTableView';
import CatalogMasonryView from './CatalogMasonryView';
import LivePreviewModal from './LivePreviewModal';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export default function CatalogSection() {
  const {
    filters,
    activeItemId,
    urlCustomizerConfig,
    setSearch,
    toggleDomain,
    togglePlatform,
    togglePricing,
    toggleTech,
    setSort,
    setLayout,
    setActiveItem,
    resetFilters,
  } = useCatalogUrlState();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // 1. Filter items based on active criteria
  const filteredItems = useMemo(() => {
    return catalogItems.filter((item) => {
      // Full-text Search
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTagline = item.tagline.toLowerCase().includes(q);
        const matchesDomain = item.domain.toLowerCase().includes(q);
        const matchesPlatform = item.platform.toLowerCase().includes(q);
        const matchesCreator = item.creator.name.toLowerCase().includes(q);
        const matchesTech = item.tech_stack.some((t) => t.toLowerCase().includes(q));

        if (
          !matchesTitle &&
          !matchesDesc &&
          !matchesTagline &&
          !matchesDomain &&
          !matchesPlatform &&
          !matchesCreator &&
          !matchesTech
        ) {
          return false;
        }
      }

      // Domain Filter
      if (filters.domains.length > 0 && !filters.domains.includes(item.domain)) {
        return false;
      }

      // Platform Filter
      if (filters.platforms.length > 0 && !filters.platforms.includes(item.platform)) {
        return false;
      }

      // Pricing Filter
      if (filters.pricing.length > 0 && !filters.pricing.includes(item.pricing)) {
        return false;
      }

      // Tech Stack Filter
      if (filters.techStack.length > 0) {
        const hasTech = filters.techStack.some((t) => item.tech_stack.includes(t));
        if (!hasTech) return false;
      }

      return true;
    });
  }, [filters.search, filters.domains, filters.platforms, filters.pricing, filters.techStack]);

  // 2. Sort filtered items
  const sortedItems = useMemo(() => {
    const list = [...filteredItems];

    switch (filters.sort) {
      case 'recent':
        return list.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case 'trending':
        return list.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || b.stars - a.stars);
      case 'alphabetical':
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case 'popular':
      default:
        return list.sort((a, b) => b.stars - a.stars);
    }
  }, [filteredItems, filters.sort]);

  // Active preview modal item
  const activeModalItem = useMemo(() => {
    if (!activeItemId) return null;
    return catalogItems.find((i) => i.id === activeItemId) || null;
  }, [activeItemId]);

  return (
    <section id="catalog" className="relative py-12 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-100">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRODUCTION-READY WEB CATALOG</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Curated Showcase &amp; <span className="text-gradient-cyan">Live Sandbox</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed">
          Explore over 100+ standard web application &amp; app templates, SaaS dashboards, e-commerce storefronts, and micro-tools across 9 domain segments. Filter by tech stack, tweak theme customizers, and test responsive viewports in real time.
        </p>
      </div>

      {/* Main Header Toolbar (Search, Sort, View Layouts) */}
      <CatalogHeader
        filters={filters}
        totalItems={sortedItems.length}
        onSearchChange={setSearch}
        onSortChange={setSort}
        onLayoutChange={setLayout}
        onClearFilters={resetFilters}
      />

      {/* Main Layout Grid (Filter Sidebar + Catalog Views) */}
      <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Desktop Left Sidebar Filters */}
        <aside className="hidden lg:block w-72 shrink-0 sticky top-24">
          <CatalogFilters
            filters={filters}
            totalResults={sortedItems.length}
            onToggleDomain={toggleDomain}
            onTogglePlatform={togglePlatform}
            onTogglePricing={togglePricing}
            onToggleTech={toggleTech}
            onReset={resetFilters}
          />
        </aside>

        {/* Mobile Filter Sheet Drawer Button */}
        <div className="lg:hidden w-full flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono">
          <span className="text-slate-300">
            Showing <strong className="text-cyan-400">{sortedItems.length}</strong> items
          </span>

          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter Catalog</span>
          </button>
        </div>

        {/* Mobile Slide-Up Sheet Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-white font-bold">
              <span>Filter Catalog</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-300"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              <CatalogFilters
                filters={filters}
                totalResults={sortedItems.length}
                onToggleDomain={toggleDomain}
                onTogglePlatform={togglePlatform}
                onTogglePricing={togglePricing}
                onToggleTech={toggleTech}
                onReset={resetFilters}
              />
            </div>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 mt-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm"
            >
              Apply Filters ({sortedItems.length})
            </button>
          </div>
        )}

        {/* Catalog Main View Area */}
        <main className="flex-1 w-full min-w-0">
          {filters.layout === 'table' ? (
            <CatalogTableView
              items={sortedItems}
              onPreview={(item) => setActiveItem(item.id)}
              onCustomize={(item) => setActiveItem(item.id)}
            />
          ) : filters.layout === 'masonry' ? (
            <CatalogMasonryView
              items={sortedItems}
              onPreview={(item) => setActiveItem(item.id)}
              onCustomize={(item) => setActiveItem(item.id)}
            />
          ) : (
            <CatalogGrid
              items={sortedItems}
              onPreview={(item) => setActiveItem(item.id)}
              onCustomize={(item) => setActiveItem(item.id)}
              onReset={resetFilters}
            />
          )}
        </main>

      </div>

      {/* Live Preview Modal & Sandbox Viewport */}
      {activeModalItem && (
        <LivePreviewModal
          item={activeModalItem}
          urlCustomizerConfig={urlCustomizerConfig}
          onClose={() => setActiveItem(null)}
        />
      )}

    </section>
  );
}
