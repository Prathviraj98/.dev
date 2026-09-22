'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Maximize2, Minimize2, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  index: number;
  defaultMinimized?: boolean;
  hideMinimizeButton?: boolean;
}

export default function ProjectCard({
  project,
  onSelect,
  index,
  defaultMinimized = true,
  hideMinimizeButton = false,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState<boolean>(defaultMinimized);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // 3D Perspective Tilt on Mouse Movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMinimized) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = (mouseY / height - 0.5) * -10;
    const rY = (mouseX / width - 0.5) * 10;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="perspective-1000 w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(project)}
        style={{
          transform: !isMinimized ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` : 'none',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
        }}
        className={`glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/40 cursor-pointer group relative flex flex-col justify-between transition-all duration-300 shadow-lg ${
          isMinimized ? 'p-4 sm:p-5 hover:bg-white/5' : 'p-0 shadow-neon-cyan'
        }`}
      >
        {isMinimized ? (
          /* Minimized Compact View (Default) */
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-slate-900/90 text-cyan-300 border border-cyan-500/30">
                  {project.category}
                </span>
                <span className="text-slate-500 text-[10px] font-mono">ID: {project.slug}</span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                {project.title}
              </h3>

              <p className="text-xs text-slate-300 line-clamp-1 leading-relaxed">
                {project.summary}
              </p>

              {/* Tech Stack Chips (Compact) */}
              <div className="flex flex-wrap gap-1 pt-1">
                {project.tech_stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-slate-300 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech_stack.length > 3 && (
                  <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-slate-400">
                    +{project.tech_stack.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons (Maximize & View Case Study) */}
            <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
              <button
                onClick={toggleExpand}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-cyan-300 border border-white/10 hover:border-cyan-500/40 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
                title="Maximize Card Details"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Maximize</span>
              </button>

              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ) : (
          /* Maximized Expanded View */
          <div className="flex flex-col h-full">
            {/* Thumbnail Header Image */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
              <img
                src={project.image_url}
                alt={project.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
                }}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Category Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                  {project.category}
                </span>
              </div>

              {/* Minimize Trigger Button */}
              {!hideMinimizeButton && (
                <button
                  onClick={toggleExpand}
                  className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md text-slate-300 hover:text-white border border-white/20 text-xs font-mono font-medium flex items-center gap-1 transition-all"
                  title="Minimize Card"
                >
                  <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Minimize</span>
                </button>
              )}
            </div>

            {/* Maximized Body Content */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>

                <p className="text-xs font-mono text-cyan-400 font-medium">
                  {project.tagline}
                </p>

                <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Metrics Breakdown */}
              {(() => {
                const displayMetrics = (project.key_metrics || []).filter(
                  (m) => !['stars', 'forks', 'open issues'].includes(m.label.toLowerCase())
                );
                if (displayMetrics.length === 0) return null;
                return (
                  <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-white/10 bg-white/5 rounded-xl px-3">
                    {displayMetrics.slice(0, 3).map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <span className="block text-xs font-bold font-mono text-emerald-400">
                          {metric.value}
                        </span>
                        <span className="block text-[10px] text-slate-400 truncate">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* Full Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] font-mono text-slate-300 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
