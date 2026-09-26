'use client';

import { useState } from 'react';
import {
  Palette,
  Type,
  Maximize,
  Copy,
  Check,
  Download,
  Share2,
  Sliders,
  Sparkles,
  Layout,
  RefreshCw,
} from 'lucide-react';
import { CustomizerConfig, CatalogItem } from '@/types/catalog';
import { generateTailwindConfig } from '@/lib/customizerUtils';

interface LiveCustomizerPlaygroundProps {
  item: CatalogItem;
  config: CustomizerConfig;
  onChange: (newConfig: CustomizerConfig) => void;
  onReset: () => void;
}

export default function LiveCustomizerPlayground({
  item,
  config,
  onChange,
  onReset,
}: LiveCustomizerPlaygroundProps) {
  const [copiedTailwind, setCopiedTailwind] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  const themePresets: Array<{ id: CustomizerConfig['theme']; name: string; hex: string }> = [
    { id: 'dark', name: 'Indigo Dark', hex: '#6366f1' },
    { id: 'midnight', name: 'Deep Cyan', hex: '#06b6d4' },
    { id: 'emerald', name: 'Cyber Emerald', hex: '#10b981' },
    { id: 'amber', name: 'Solar Amber', hex: '#f59e0b' },
    { id: 'cyberpunk', name: 'Dusk Magenta', hex: '#ec4899' },
    { id: 'light', name: 'Clean Light', hex: '#3b82f6' },
  ];

  const fontOptions: CustomizerConfig['fontFamily'][] = [
    'Inter',
    'Roboto',
    'Playfair Display',
    'JetBrains Mono',
  ];

  const handleCopyTailwind = () => {
    const configStr = generateTailwindConfig(config);
    navigator.clipboard.writeText(configStr);
    setCopiedTailwind(true);
    setTimeout(() => setCopiedTailwind(false), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(config, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${item.slug}-customizer-preset.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyShareLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('c_theme', config.theme);
    if (config.primaryColor) url.searchParams.set('c_color', config.primaryColor.replace('#', ''));
    url.searchParams.set('c_font', config.fontFamily);
    url.searchParams.set('c_radius', config.borderRadius);
    navigator.clipboard.writeText(url.toString());
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2000);
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-6 font-mono text-xs text-slate-200">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2 font-bold text-white">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span>Live Customizer Engine</span>
        </div>

        <button
          onClick={onReset}
          className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors text-[11px]"
          title="Reset Customizer Defaults"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Theme Presets & Color Picker */}
      <div className="space-y-2.5">
        <label className="text-slate-300 font-bold flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-cyan-400" />
            <span>Theme & Accent Color</span>
          </span>
          <span className="text-[10px] text-cyan-400 uppercase">{config.theme}</span>
        </label>

        <div className="grid grid-cols-3 gap-2">
          {themePresets.map((preset) => {
            const active = config.theme === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() =>
                  onChange({
                    ...config,
                    theme: preset.id,
                    primaryColor: preset.hex,
                  })
                }
                className={`p-2 rounded-xl flex items-center space-x-2 border transition-all text-left ${
                  active
                    ? 'bg-white/10 border-cyan-400 text-white font-bold shadow-neon-cyan'
                    : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0"
                  style={{ backgroundColor: preset.hex }}
                />
                <span className="text-[10px] truncate">{preset.name}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Hex Color Picker */}
        <div className="flex items-center space-x-2 pt-1">
          <input
            type="color"
            value={config.primaryColor || '#6366f1'}
            onChange={(e) => onChange({ ...config, primaryColor: e.target.value })}
            className="w-8 h-8 rounded-lg border-0 bg-transparent cursor-pointer shrink-0"
          />
          <input
            type="text"
            value={config.primaryColor || '#6366f1'}
            onChange={(e) => onChange({ ...config, primaryColor: e.target.value })}
            placeholder="#6366f1"
            className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs font-mono uppercase focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* 2. Typography Selector */}
      <div className="space-y-2 pt-2 border-t border-white/10">
        <label className="text-slate-300 font-bold flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-indigo-400" />
          <span>Font Family</span>
        </label>

        <div className="grid grid-cols-2 gap-2">
          {fontOptions.map((font) => {
            const active = config.fontFamily === font;
            return (
              <button
                key={font}
                onClick={() => onChange({ ...config, fontFamily: font })}
                className={`p-2 rounded-xl text-left border transition-all ${
                  active
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 font-bold'
                    : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="text-xs block truncate">{font}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Border Radius & Spacing */}
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
        <div className="space-y-2">
          <label className="text-slate-300 font-bold flex items-center gap-1.5">
            <Maximize className="w-3.5 h-3.5 text-emerald-400" />
            <span>Border Radius</span>
          </label>
          <select
            value={config.borderRadius}
            onChange={(e) =>
              onChange({
                ...config,
                borderRadius: e.target.value as CustomizerConfig['borderRadius'],
              })
            }
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="none">Sharp (0px)</option>
            <option value="rounded">Rounded (12px)</option>
            <option value="pill">Pill (Fully Round)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-slate-300 font-bold flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5 text-amber-400" />
            <span>Spacing</span>
          </label>
          <select
            value={config.spacing}
            onChange={(e) =>
              onChange({
                ...config,
                spacing: e.target.value as CustomizerConfig['spacing'],
              })
            }
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="compact">Compact</option>
            <option value="normal">Normal</option>
            <option value="spacious">Spacious</option>
          </select>
        </div>
      </div>

      {/* 4. Live Content Override Inputs */}
      <div className="space-y-2 pt-2 border-t border-white/10">
        <label className="text-slate-300 font-bold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Live Headline Text Override</span>
        </label>
        <input
          type="text"
          value={config.headlineOverride ?? item.title}
          onChange={(e) => onChange({ ...config, headlineOverride: e.target.value })}
          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* 5. Export Options Bar */}
      <div className="pt-3 border-t border-white/10 space-y-2">
        <button
          onClick={handleCopyTailwind}
          className="w-full py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold hover:bg-cyan-500/30 transition-colors flex items-center justify-center space-x-2"
        >
          {copiedTailwind ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copiedTailwind ? 'Copied Config!' : 'Copy Tailwind Config'}</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleDownloadJson}
            className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 font-semibold flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handleCopyShareLink}
            className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 font-semibold flex items-center justify-center space-x-1.5 transition-colors"
          >
            {copiedShareLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedShareLink ? 'Link Copied' : 'Share Preset'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
