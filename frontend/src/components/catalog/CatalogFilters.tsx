'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  Check,
  RotateCcw,
  X,
  ChevronDown,
  Layers,
  Smartphone,
  Tag,
  Code2,
} from 'lucide-react';
import {
  DomainSegment,
  PlatformType,
  PricingModel,
  FilterState,
} from '@/types/catalog';
import {
  DOMAIN_OPTIONS,
  PLATFORM_OPTIONS,
  PRICING_OPTIONS,
  ALL_TECH_OPTIONS,
} from '@/lib/catalogData';

interface CatalogFiltersProps {
  filters: FilterState;
  onToggleDomain: (domain: DomainSegment) => void;
  onTogglePlatform: (platform: PlatformType) => void;
  onTogglePricing: (price: PricingModel) => void;
  onToggleTech: (tech: string) => void;
  onReset: () => void;
  totalResults: number;
}

export default function CatalogFilters({
  filters,
  onToggleDomain,
  onTogglePlatform,
  onTogglePricing,
  onToggleTech,
  onReset,
  totalResults,
}: CatalogFiltersProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    domain: true,
    platform: true,
    pricing: true,
    tech: false,
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeFilterCount =
    filters.domains.length +
    filters.platforms.length +
    filters.pricing.length +
    filters.techStack.length;

  const FilterContent = () => (
    <div className="space-y-6 text-xs font-mono">
      {/* Active Filters Summary Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2 text-slate-200 font-bold">
          <Filter className="w-4 h-4 text-cyan-400" />
          <span>Catalog Filters ({activeFilterCount})</span>
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center space-x-1 text-rose-400 hover:text-rose-300 transition-colors text-[11px]"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* 1. Domain / Segment Filter */}
      <div className="space-y-2">
        <button
          onClick={() => toggleSection('domain')}
          className="w-full flex items-center justify-between font-bold text-slate-300 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Domain Segment</span>
          </span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSections.domain ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections.domain && (
          <div className="space-y-1 pt-1">
            {DOMAIN_OPTIONS.map((domain) => {
              const selected = filters.domains.includes(domain);
              return (
                <button
                  key={domain}
                  onClick={() => onToggleDomain(domain)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition-colors ${
                    selected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <span>{domain}</span>
                  {selected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Platform / Type Filter */}
      <div className="space-y-2 pt-2 border-t border-white/10">
        <button
          onClick={() => toggleSection('platform')}
          className="w-full flex items-center justify-between font-bold text-slate-300 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
            <span>Platform Type</span>
          </span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSections.platform ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections.platform && (
          <div className="space-y-1 pt-1">
            {PLATFORM_OPTIONS.map((platform) => {
              const selected = filters.platforms.includes(platform);
              return (
                <button
                  key={platform}
                  onClick={() => onTogglePlatform(platform)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition-colors ${
                    selected
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <span>{platform}</span>
                  {selected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Pricing Model Filter */}
      <div className="space-y-2 pt-2 border-t border-white/10">
        <button
          onClick={() => toggleSection('pricing')}
          className="w-full flex items-center justify-between font-bold text-slate-300 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pricing Model</span>
          </span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSections.pricing ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections.pricing && (
          <div className="space-y-1 pt-1">
            {PRICING_OPTIONS.map((price) => {
              const selected = filters.pricing.includes(price);
              return (
                <button
                  key={price}
                  onClick={() => onTogglePricing(price)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition-colors ${
                    selected
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <span>{price}</span>
                  {selected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Tech Stack Filter */}
      <div className="space-y-2 pt-2 border-t border-white/10">
        <button
          onClick={() => toggleSection('tech')}
          className="w-full flex items-center justify-between font-bold text-slate-300 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Framework / Stack</span>
          </span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSections.tech ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections.tech && (
          <div className="flex flex-wrap gap-1.5 pt-1 max-h-48 overflow-y-auto">
            {ALL_TECH_OPTIONS.map((tech) => {
              const selected = filters.techStack.includes(tech);
              return (
                <button
                  key={tech}
                  onClick={() => onToggleTech(tech)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                    selected
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Filters */}
      <aside className="hidden md:block w-64 glass-panel p-5 rounded-2xl border border-white/10 shrink-0 h-fit sticky top-24">
        <FilterContent />
      </aside>

      {/* Mobile Drawer Floating Toggle Button */}
      <div className="md:hidden fixed bottom-16 right-4 z-30">
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="flex items-center space-x-2 px-4 py-3 rounded-full bg-cyan-500 text-slate-950 font-mono font-bold text-xs shadow-2xl shadow-cyan-500/40"
        >
          <Filter className="w-4 h-4" />
          <span>Filters ({activeFilterCount})</span>
        </button>
      </div>

      {/* Mobile Bottom Sheet Drawer */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative glass-panel bg-slate-950 border-t border-white/20 rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto z-10 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="font-mono font-bold text-sm text-white">Filter Web Catalog</span>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2 rounded-full glass-card text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <FilterContent />

              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-mono font-bold text-xs shadow-neon-cyan mt-4"
              >
                Apply Filters ({totalResults} Results)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
