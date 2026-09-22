'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Filter } from 'lucide-react';
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
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Title & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
              <Briefcase className="w-3.5 h-3.5" />
              <span>PROJECT CATALOG & CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured <span className="text-gradient-cyan">Engineering Work</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Explore production deployments, high-scale backend engines, AI pipelines, and cryptographic mobile applications.
            </p>
          </div>

          {/* Category Filter Pills (Non-scrollable flex-wrap layout) */}
          <div className="flex flex-wrap items-center gap-1.5 glass-panel p-2 rounded-2xl border border-white/10 max-w-full">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id || project.slug}
              project={project}
              onSelect={setActiveProject}
              index={index}
            />
          ))}
        </div>

        {/* Case Study Modal */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </section>
  );
}
