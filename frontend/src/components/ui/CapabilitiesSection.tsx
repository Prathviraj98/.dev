'use client';

import { motion } from 'framer-motion';
import { Cpu, Layers, ShieldCheck, Zap, Globe, Sparkles, Server, Terminal as TerminalIcon } from 'lucide-react';
import TerminalShowcase from './TerminalShowcase';

export default function CapabilitiesSection() {
  const capabilities = [
    {
      title: 'Full-Stack Distributed Systems',
      description: 'Engineering microservice architectures with Next.js 14 App Router, FastAPI, PostgreSQL, and Redis caching layers optimized for low latency and high availability.',
      icon: Server,
      accent: 'from-cyan-500 to-blue-600',
      highlights: ['Next.js 14 App Router', 'FastAPI & Async IO', 'PostgreSQL / PostGIS', 'Redis Caching'],
    },
    {
      title: 'AI & Document NLP Pipelines',
      description: 'Building end-to-end intelligent evaluation workflows combining OCR, Sentence Transformers (SBERT), PyTorch, and fine-tuned LLMs with asynchronous task queues.',
      icon: Cpu,
      accent: 'from-indigo-500 to-purple-600',
      highlights: ['SBERT Embeddings', 'Tesseract & OpenCV', 'Vector Databases', 'PyTorch / HuggingFace'],
    },
    {
      title: 'Zero-Knowledge Cryptography',
      description: 'Designing end-to-end encrypted messaging systems using Libsodium, Double Ratchet algorithm implementations, and metadata-free protocol designs.',
      icon: ShieldCheck,
      accent: 'from-emerald-500 to-teal-600',
      highlights: ['Libsodium Crypto', 'Double Ratchet Protocol', 'WebAssembly (Wasm)', 'Forward Secrecy'],
    },
    {
      title: 'Real-Time 3D WebGL Graphics',
      description: 'Crafting fluid 60fps WebGL visual experiences using Three.js, GLSL shaders, React Three Fiber, and Framer Motion for immersive user interfaces.',
      icon: Sparkles,
      accent: 'from-pink-500 to-rose-600',
      highlights: ['Three.js & R3F', 'GLSL Custom Shaders', 'Lenis Smooth Scroll', 'Framer Motion'],
    },
  ];

  return (
    <section id="capabilities" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-16 sm:scroll-mt-20 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl w-full mx-auto space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center gap-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-cyan-400 text-xs font-mono"
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>CORE TECHNICAL CAPABILITIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight sm:leading-none my-0"
          >
            Architected for <span className="text-gradient-cyan">Scale & Speed</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed my-0"
          >
            We bridge deep software engineering with modern visual aesthetics, delivering robust backend pipelines and ultra-responsive user experiences.
          </motion.p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-4 xs:p-6 sm:p-8 rounded-2xl relative overflow-hidden group border border-white/5 hover:border-white/15"
              >
                {/* Accent Background Glow */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cap.accent} opacity-10 rounded-full blur-2xl group-hover:opacity-25 transition-opacity`}
                />

                <div className="space-y-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cap.accent} p-[1px]`}>
                    <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cap.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {cap.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {cap.highlights.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Code Architecture Lab Showcase */}
        <div id="architecture" className="pt-6 sm:pt-8 scroll-mt-16 sm:scroll-mt-20">
          <div className="text-center space-y-3 mb-8">
            <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">
              Interactive System Design
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Inspecting Production-Grade Code Architecture
            </h3>
          </div>
          <TerminalShowcase />
        </div>
      </div>
    </section>
  );
}
