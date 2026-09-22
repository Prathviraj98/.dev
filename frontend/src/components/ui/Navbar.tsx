'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Cpu, Briefcase, Mail, Menu, X, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDaytime, toggleDaytime } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Capabilities', href: '#capabilities', icon: Cpu },
    { name: 'Architecture', href: '#architecture', icon: Code2 },
    { name: 'Portfolio', href: '#portfolio', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo (Clean .DEV text) */}
          <a
            href="#"
            className="flex items-center space-x-2 group cursor-pointer focus:outline-none"
          >
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white flex items-center">
                <span className="text-cyan-400 font-mono font-extrabold">.</span>DEV
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                System Ready
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 glass-panel px-4 py-1.5 rounded-full border border-white/10">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Availability Status, Theme Toggle & CTA */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Day/Night Coding Ambiance Toggle Button */}
            <button
              onClick={toggleDaytime}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full glass-panel border border-white/10 hover:border-cyan-400/50 transition-all text-xs font-mono text-slate-300 hover:text-white group focus:outline-none"
              title={isDaytime ? 'Solar Day IDE Mode (6 AM - 6 PM)' : 'Night Matrix Hacker Ambiance'}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDaytime ? 'sun' : 'moon'}
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isDaytime ? (
                    <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
                  ) : (
                    <Moon className="w-4 h-4 text-cyan-400 group-hover:-rotate-12 transition-transform" />
                  )}
                </motion.div>
              </AnimatePresence>
              <span className="hidden xl:inline text-[11px] font-semibold tracking-wider text-slate-300">
                {isDaytime ? 'SOLAR IDE' : 'NIGHT MATRIX'}
              </span>
            </button>

            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Available Q3/Q4</span>
            </div>

            <a
              href="#contact"
              className="relative group overflow-hidden rounded-xl p-[1px] font-medium text-xs focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-xl group-hover:opacity-100 transition-opacity opacity-80" />
              <div className="relative px-4 py-2 bg-surface rounded-[11px] flex items-center space-x-2 text-white group-hover:bg-opacity-0 transition-all">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:text-white transition-colors" />
                <span className="font-semibold tracking-wide">Hire Us</span>
              </div>
            </a>
          </div>

          {/* Mobile Menu Button & Mobile Theme Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleDaytime}
              className="p-2 rounded-xl text-slate-300 hover:text-white glass-panel focus:outline-none"
              title="Toggle Day / Night Coding Ambiance"
            >
              {isDaytime ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-cyan-400" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white glass-panel focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-nav border-t border-white/10 mt-3 px-4 pt-4 pb-6 space-y-3"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm text-slate-200 hover:bg-white/5 transition-all"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span className="font-medium">{link.name}</span>
                </a>
              );
            })}
            <div className="pt-2 border-t border-white/10 flex flex-col space-y-3">
              <button
                onClick={toggleDaytime}
                className="w-full py-2.5 px-4 rounded-xl glass-panel flex items-center justify-between text-xs font-mono text-slate-200"
              >
                <span>Theme Mode:</span>
                <span className="flex items-center space-x-1.5 font-bold text-cyan-400">
                  {isDaytime ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
                  <span>{isDaytime ? 'Solar Day IDE' : 'Night Matrix'}</span>
                </span>
              </button>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-cyan-500/20"
              >
                Hire Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
