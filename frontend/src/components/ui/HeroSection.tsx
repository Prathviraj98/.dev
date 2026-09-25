'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Terminal, ShieldCheck, Cpu, Zap, Code2 } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden z-10 w-full max-w-full">
      <div className="max-w-6xl w-full mx-auto text-center space-y-8">
        {/* Top Tagline Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex max-w-full flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-[11px] xs:text-xs sm:text-sm font-mono text-cyan-300 shadow-neon-cyan text-center"
        >
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 animate-pulse shrink-0" />
          <span className="truncate max-w-full">Full-Stack Engineering & High-Performance 3D Web Systems</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
        >
          Engineering the <br className="hidden sm:inline" />
          <span className="text-gradient-cyan">Future of Software</span>
        </motion.h1>

        {/* Subtitle / Value Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl mx-auto text-sm xs:text-base sm:text-xl text-slate-300 font-normal leading-relaxed"
        >
          We architect mission-critical distributed systems, AI evaluation pipelines, and high-performance WebGL 3D interfaces designed for high scalability and sub-second performance.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4"
        >
          <a
            href="#capabilities"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 min-h-[44px] rounded-xl bg-gradient-to-r from-primary via-indigo-600 to-accent-cyan text-white font-semibold text-sm sm:text-base flex items-center justify-center space-x-3 shadow-lg shadow-primary/30 hover:shadow-neon-indigo transition-all transform hover:-translate-y-0.5"
          >
            <span>View Capabilities</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#portfolio"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 min-h-[44px] rounded-xl glass-card text-white font-medium text-sm sm:text-base flex items-center justify-center space-x-2 border border-white/10 hover:border-white/20 transition-all hover:bg-white/5"
          >
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>Explore Projects</span>
          </a>
        </motion.div>

        {/* Stat Badges Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto pt-8 sm:pt-12"
        >
          {[
            { icon: ShieldCheck, label: 'Audit Compliance', value: 'SOC2 & ISO Ready' },
            { icon: Cpu, label: 'Sub-50ms API', value: 'Redis + FastAPI' },
            { icon: Terminal, label: 'Code Standards', value: '100% Type-Safe' },
            { icon: Zap, label: 'FPS Target', value: '60 FPS Canvas' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass-card p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-1 sm:space-y-1.5 border border-white/5 hover:border-cyan-500/30 transition-all"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center text-cyan-400">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-sm xs:text-base sm:text-xl font-bold font-mono text-white truncate max-w-full">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider truncate max-w-full">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
