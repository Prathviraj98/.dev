'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  ExternalLink,
  Eye,
  Sliders,
  Play,
  Bookmark,
  ShieldCheck,
  Download,
  Layers,
  Sparkles,
} from 'lucide-react';
import { CatalogItem } from '@/types/catalog';

interface CatalogItemCardProps {
  item: CatalogItem;
  onPreview: (item: CatalogItem) => void;
  onCustomize: (item: CatalogItem) => void;
}

export default function CatalogItemCard({
  item,
  onPreview,
  onCustomize,
}: CatalogItemCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-xl relative"
    >
      {/* Thumbnail Banner with Hover Action Bar */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        {/* Skeleton Loader */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-slate-900 animate-pulse flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-slate-700 animate-spin" />
          </div>
        )}

        <img
          src={imageError ? 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80' : item.thumbnail_url}
          alt={item.title}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-85' : 'opacity-0'
          }`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
              {item.domain}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-300 bg-slate-900/80 backdrop-blur-md border border-white/10">
              {item.platform}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setBookmarked(!bookmarked);
            }}
            className={`p-1.5 rounded-xl backdrop-blur-md transition-colors ${
              bookmarked
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'bg-slate-950/60 text-slate-400 hover:text-white border border-white/10'
            }`}
            title="Bookmark Template"
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Hover Quick Action Buttons Overlay */}
        <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4 z-20">
          <button
            onClick={() => onPreview(item)}
            className="px-3 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={() => onCustomize(item)}
            className="px-3 py-2 rounded-xl bg-primary/20 text-indigo-300 border border-primary/40 hover:bg-primary/30 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>
        </div>

        {/* Live Status Pill */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Sandbox</span>
        </div>
      </div>

      {/* Card Content Info */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
              {item.title}
            </h3>
            <span className="text-xs font-mono text-amber-400 flex items-center gap-1 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{item.rating}</span>
            </span>
          </div>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {item.tagline}
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <div className="flex flex-wrap gap-1 max-h-12 overflow-hidden">
            {item.tech_stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
            {item.tech_stack.length > 4 && (
              <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-400">
                +{item.tech_stack.length - 4}
              </span>
            )}
          </div>

          {/* Pricing & Metric Stats */}
          <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-slate-400">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                item.pricing === 'Open Source'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : item.pricing === 'Freemium'
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                  : 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
              }`}
            >
              {item.pricing}
            </span>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1" title="GitHub Stars">
                <Star className="w-3 h-3 text-slate-500" />
                <span>{item.stars}</span>
              </span>
              <span className="flex items-center gap-1" title="Downloads / Clones">
                <Download className="w-3 h-3 text-slate-500" />
                <span>{item.downloads}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
