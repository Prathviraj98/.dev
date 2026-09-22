'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu } from 'lucide-react';
import { Project } from '@/types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-lg z-0"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-3xl overflow-hidden border border-white/20 shadow-2xl z-10 flex flex-col my-auto"
        >
          {/* Modal Header Image & Title */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
            <img
              src={project.image_url}
              alt={project.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
              }}
              className="w-full h-full object-cover object-center opacity-70"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full glass-card text-white hover:bg-white/20 transition-colors z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-6 left-6 right-6 space-y-2 z-10">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                {project.category}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                {project.title}
              </h2>
              <p className="text-cyan-400 font-mono text-sm sm:text-base font-medium">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Modal Body Content (Scrollable) */}
          <div className="p-6 sm:p-8 space-y-8 overflow-y-auto max-h-[calc(90vh-18rem)]">
            {/* Key Performance Metrics Bar (Excludes Stars, Forks, Open Issues) */}
            {(() => {
              const displayMetrics = (project.key_metrics || []).filter(
                (m) => !['stars', 'forks', 'open issues'].includes(m.label.toLowerCase())
              );
              if (displayMetrics.length === 0) return null;
              return (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  {displayMetrics.map((metric, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center text-center p-2">
                      <span className="text-2xl font-black font-mono text-emerald-400">
                        {metric.value}
                      </span>
                      <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              );
            })()}


            {/* Architecture Overview & Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                <span>System Design & Architectural Breakdown</span>
              </h3>
              <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed font-sans space-y-3">
                <p className="text-base text-slate-200">{project.summary}</p>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {project.architecture_markdown}
                </div>
              </div>
            </div>

            {/* Tech Stack Matrix */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Technologies & Frameworks Utilized</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/30 text-cyan-300 text-xs font-mono flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center space-x-3">
                {project.live_url && !project.live_url.includes('github.com') && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-mono font-medium hover:bg-primary-hover transition-colors shadow-lg shadow-primary/25"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demonstration</span>
                  </a>
                )}
              </div>


              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-colors"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
