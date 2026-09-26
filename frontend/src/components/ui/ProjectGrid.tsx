'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Search,
  Sparkles,
  Layers,
} from 'lucide-react';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

interface ProjectGridProps {
  projects: Project[];
}

const CATEGORIES = [
  'All',
  'Full-Stack',
  'AI / Machine Learning',
  'Mobile & PWA',
  'Cryptography',
  'IoT & Hardware',
];

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.summary.toLowerCase().includes(query) ||
        p.tech_stack.some((tech) => tech.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section
      id="portfolio"
      className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-16 sm:scroll-mt-20 w-full max-w-full overflow-hidden text-slate-100"
    >
      <div className="max-w-7xl w-full mx-auto space-y-8 sm:space-y-12">
        {/* Section Title Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
              <Briefcase className="w-3.5 h-3.5" />
              <span>PRODUCTION ARCHITECTURES</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured <span className="text-gradient-cyan">Engineering Work</span>
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed">
              Explore production deployments, AI pipelines, cryptographic engines, and microservices. Click any project card to inspect live architectural specifications and performance metrics.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="space-y-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, tech (e.g. PyTorch, FastAPI)..."
                className="w-full sm:w-80 pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-mono text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 glass-panel p-2 rounded-2xl border border-white/10 max-w-full overflow-x-auto no-scrollbar flex-nowrap sm:flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all shrink-0 min-h-[36px] ${
                    selectedCategory === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-neon-cyan'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              Showing <strong className="text-cyan-300">{filteredProjects.length}</strong> engineering projects
            </span>
          </div>
          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-rose-400 hover:underline text-[11px] font-bold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Projects Grid Display */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id || project.slug}
                project={project}
                index={index}
                onSelect={(p) => setActiveProject(p)}
                defaultMinimized={index > 0}
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel p-12 rounded-3xl text-center space-y-3 border border-white/10">
            <p className="text-slate-300 text-sm font-mono">
              No engineering projects found matching your search.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono"
            >
              Reset Search Filters
            </button>
          </div>
        )}

        {/* Detailed Spec Modal */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </section>
  );
}
