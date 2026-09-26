'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  X,
  Smartphone,
  Tablet,
  Monitor,
  ExternalLink,
  RotateCw,
  Sparkles,
  ShieldCheck,
  Zap,
  Eye,
  Sliders,
  CheckCircle2,
  Share2,
  Check,
  Star,
  Globe,
  Layers,
  Code2,
} from 'lucide-react';
import { CatalogItem, CustomizerConfig } from '@/types/catalog';
import { buildSandboxSrcDoc } from '@/lib/customizerUtils';
import LiveCustomizerPlayground from './LiveCustomizerPlayground';

interface LivePreviewModalProps {
  item: CatalogItem | null;
  urlCustomizerConfig?: Partial<CustomizerConfig>;
  onClose: () => void;
}

export default function LivePreviewModal({
  item,
  urlCustomizerConfig = {},
  onClose,
}: LivePreviewModalProps) {
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'preview' | 'customizer' | 'specs'>('preview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Customizer local state, seeded by item default & URL overrides
  const [customizerConfig, setCustomizerConfig] = useState<CustomizerConfig>(() => {
    if (!item) {
      return {
        theme: 'dark',
        primaryColor: '#6366f1',
        fontFamily: 'Inter',
        borderRadius: 'rounded',
        spacing: 'normal',
        heroStyle: 'gradient',
        viewportMode: 'desktop',
      };
    }
    return {
      ...item.default_customizer,
      ...urlCustomizerConfig,
    };
  });

  // Sync customizer if item or URL parameters change
  useEffect(() => {
    if (item) {
      setCustomizerConfig({
        ...item.default_customizer,
        ...urlCustomizerConfig,
      });
    }
  }, [item, urlCustomizerConfig]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Disable background scrolling when modal is active
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  const handleResetCustomizer = useCallback(() => {
    if (item) {
      setCustomizerConfig(item.default_customizer);
    }
  }, [item]);

  const handleCopyShareLink = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('preview', item?.id || '');
    url.searchParams.set('c_theme', customizerConfig.theme);
    if (customizerConfig.primaryColor) {
      url.searchParams.set('c_color', customizerConfig.primaryColor.replace('#', ''));
    }
    url.searchParams.set('c_font', customizerConfig.fontFamily);
    url.searchParams.set('c_radius', customizerConfig.borderRadius);
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  }, [item, customizerConfig]);

  // Generate live iframe srcdoc HTML payload
  const srcDocPayload = useMemo(() => {
    if (!item) return '';
    return buildSandboxSrcDoc(
      item.template_html,
      customizerConfig,
      item.title,
      item.tagline
    );
  }, [item, customizerConfig]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Container Card */}
      <div className="relative w-full h-[95vh] max-w-7xl bg-slate-900/90 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100 font-sans">
        
        {/* Top Control Bar */}
        <header className="px-4 py-3 bg-slate-950/80 border-b border-white/10 flex items-center justify-between shrink-0 gap-2">
          {/* OS Window Controls & Title */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="hidden sm:flex items-center space-x-1.5">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors"
                title="Close"
              />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-white truncate max-w-[140px] sm:max-w-xs">
                {item.title}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {item.domain}
              </span>
            </div>
          </div>

          {/* Desktop/Tablet/Mobile Viewport Toggle (Center) */}
          <div className="hidden md:flex items-center space-x-1 p-1 rounded-xl bg-slate-900 border border-white/10">
            <button
              onClick={() => setViewportMode('desktop')}
              className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
                viewportMode === 'desktop'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>

            <button
              onClick={() => setViewportMode('tablet')}
              className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
                viewportMode === 'tablet'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet (768px)</span>
            </button>

            <button
              onClick={() => setViewportMode('mobile')}
              className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
                viewportMode === 'mobile'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile (375px)</span>
            </button>
          </div>

          {/* Mobile Screen Tab Switcher */}
          <div className="flex md:hidden items-center space-x-1 p-1 rounded-lg bg-slate-900 border border-white/10 text-[11px]">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-2.5 py-1 rounded-md ${
                activeTab === 'preview'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                  : 'text-slate-400'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab('customizer')}
              className={`px-2.5 py-1 rounded-md ${
                activeTab === 'customizer'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                  : 'text-slate-400'
              }`}
            >
              Customizer
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-2.5 py-1 rounded-md ${
                activeTab === 'specs'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                  : 'text-slate-400'
              }`}
            >
              Specs
            </button>
          </div>

          {/* Actions (Right) */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIframeKey((k) => k + 1)}
              className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
              title="Reload Sandbox Viewport"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopyShareLink}
              className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
              title="Share Live Sandbox Link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <a
              href={item.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* Left / Main Section: Embedded Sandbox Preview */}
          <div
            className={`flex-1 flex flex-col items-center justify-center p-2 sm:p-4 bg-slate-950/60 transition-all ${
              activeTab === 'preview' ? 'flex' : 'hidden md:flex'
            }`}
          >
            {/* Viewport Frame Box */}
            <div
              className={`w-full h-full flex flex-col rounded-xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl transition-all duration-300 ${
                viewportMode === 'tablet'
                  ? 'max-w-[768px] max-h-[90%] my-auto ring-1 ring-cyan-500/30'
                  : viewportMode === 'mobile'
                  ? 'max-w-[375px] max-h-[90%] my-auto ring-1 ring-cyan-500/30'
                  : 'max-w-full h-full'
              }`}
            >
              {/* Iframe Browser Address Header */}
              <div className="px-3 py-2 bg-slate-900/90 border-b border-white/10 flex items-center space-x-2 text-xs font-mono text-slate-400 shrink-0">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="truncate flex-1">
                  https://preview.devcatalog.app/sandbox/{item.slug}
                </span>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">
                  {viewportMode} mode
                </span>
              </div>

              {/* Iframe Viewport */}
              <iframe
                key={iframeKey}
                srcDoc={srcDocPayload}
                title={`${item.title} Live Preview Sandbox`}
                className="w-full h-full border-0 bg-slate-950 flex-1"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>

          {/* Right Section: Specs, Tech Stack & Customizer Engine Sidebar */}
          <div
            className={`w-full md:w-[380px] lg:w-[420px] bg-slate-900 border-l border-white/10 flex flex-col shrink-0 overflow-y-auto ${
              activeTab !== 'preview' ? 'flex' : 'hidden md:flex'
            }`}
          >
            <div className="p-5 space-y-6">
              
              {/* Item Info Summary Header */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">{item.title}</h2>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">by {item.creator.name}</p>
                  </div>

                  <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-bold font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>{item.rating.toFixed(1)}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Audit Radar Scores */}
              <div
                className={`p-4 rounded-xl bg-slate-950/60 border border-white/10 space-y-3 font-mono text-xs ${
                  activeTab === 'specs' || activeTab === 'preview' ? 'block' : 'hidden md:block'
                }`}
              >
                <div className="flex items-center justify-between text-slate-300 font-bold border-b border-white/10 pb-2">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Audit Metrics</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Overall 96/100</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-400" /> Speed
                      </span>
                      <span className="font-bold text-amber-300">{item.audit_scores.performance}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${item.audit_scores.performance}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Eye className="w-3 h-3 text-cyan-400" /> UI Clarity
                      </span>
                      <span className="font-bold text-cyan-300">{item.audit_scores.ui_clarity}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 rounded-full"
                        style={{ width: `${item.audit_scores.ui_clarity}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Accessibility
                      </span>
                      <span className="font-bold text-emerald-300">{item.audit_scores.accessibility}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 rounded-full"
                        style={{ width: `${item.audit_scores.accessibility}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-indigo-400" /> Security
                      </span>
                      <span className="font-bold text-indigo-300">{item.audit_scores.security}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-400 rounded-full"
                        style={{ width: `${item.audit_scores.security}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Features Checklist */}
              <div
                className={`space-y-2 text-xs font-mono ${
                  activeTab === 'specs' || activeTab === 'preview' ? 'block' : 'hidden md:block'
                }`}
              >
                <h3 className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Key Architectural Features</span>
                </h3>
                <ul className="space-y-1.5 text-slate-300">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Integrated Live Customizer Engine */}
              <div
                className={`${
                  activeTab === 'customizer' || activeTab === 'preview' ? 'block' : 'hidden md:block'
                }`}
              >
                <LiveCustomizerPlayground
                  item={item}
                  config={customizerConfig}
                  onChange={setCustomizerConfig}
                  onReset={handleResetCustomizer}
                />
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
