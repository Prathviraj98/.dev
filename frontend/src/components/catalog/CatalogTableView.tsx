'use client';

import { CatalogItem } from '@/types/catalog';
import { Star, Eye, Sliders, ExternalLink, ShieldCheck, Activity } from 'lucide-react';

interface CatalogTableViewProps {
  items: CatalogItem[];
  onPreview: (item: CatalogItem) => void;
  onCustomize: (item: CatalogItem) => void;
}

export default function CatalogTableView({
  items,
  onPreview,
  onCustomize,
}: CatalogTableViewProps) {
  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/80 border-b border-white/10 text-[11px] font-mono uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-4 font-semibold">Application / Template</th>
              <th className="py-3.5 px-4 font-semibold">Domain</th>
              <th className="py-3.5 px-4 font-semibold">Platform</th>
              <th className="py-3.5 px-4 font-semibold">Tech Stack</th>
              <th className="py-3.5 px-4 font-semibold text-center">Audit Score</th>
              <th className="py-3.5 px-4 font-semibold">Pricing</th>
              <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs font-sans text-slate-200">
            {items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                onClick={() => onPreview(item)}
              >
                {/* Title & Creator */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.thumbnail_url}
                      alt={item.title}
                      className="w-10 h-10 rounded-lg object-cover bg-slate-900 border border-white/10 shrink-0"
                    />
                    <div className="space-y-0.5">
                      <div className="font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                        <span>{item.title}</span>
                        {item.featured && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            FEATURED
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 max-w-xs truncate font-mono">
                        {item.tagline}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Domain Badge */}
                <td className="py-3.5 px-4 whitespace-nowrap font-mono">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {item.domain}
                  </span>
                </td>

                {/* Platform Badge */}
                <td className="py-3.5 px-4 whitespace-nowrap font-mono">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-300 border border-white/10">
                    {item.platform}
                  </span>
                </td>

                {/* Tech Stack Chips */}
                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {item.tech_stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {item.tech_stack.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-400">
                        +{item.tech_stack.length - 3}
                      </span>
                    )}
                  </div>
                </td>

                {/* Audit Performance Score */}
                <td className="py-3.5 px-4 text-center whitespace-nowrap font-mono">
                  <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{item.audit_scores.performance}/100</span>
                  </div>
                </td>

                {/* Pricing Model */}
                <td className="py-3.5 px-4 whitespace-nowrap font-mono">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      item.pricing === 'Open Source'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : item.pricing === 'Freemium'
                        ? 'bg-cyan-500/10 text-cyan-300'
                        : 'bg-purple-500/10 text-purple-300'
                    }`}
                  >
                    {item.pricing}
                  </span>
                </td>

                {/* Quick Action Buttons */}
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end space-x-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onPreview(item)}
                      className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors"
                      title="Quick View Live Preview"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onCustomize(item)}
                      className="p-1.5 rounded-lg bg-primary/20 text-indigo-300 border border-primary/40 hover:bg-primary/30 transition-colors"
                      title="Open Live Customizer"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
