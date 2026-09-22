'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Cpu, Briefcase, Mail, Menu, X, Sparkles, Sun, Sunrise, Sunset, Moon, Clock } from 'lucide-react';
import { useTheme, TIME_MODES_INFO, TimeMode } from '@/components/providers/ThemeContext';
import Logo from './Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { timeMode, isAuto, cycleTimeMode } = useTheme();

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

  const currentInfo = TIME_MODES_INFO[timeMode];

  const renderThemeIcon = (mode: TimeMode) => {
    switch (mode) {
      case 'morning':
        return <Sunrise className="w-4 h-4 text-amber-400" />;
      case 'afternoon':
        return <Sun className="w-4 h-4 text-cyan-400" />;
      case 'evening':
        return <Sunset className="w-4 h-4 text-pink-400" />;
      case 'night':
      default:
        return <Moon className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo (.DEV SVG Logo) */}
          <a href="#" className="focus:outline-none">
            <Logo className="h-9 w-auto" />
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

          {/* Availability Status, Time Theme Toggle & CTA */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Automatic Space Time-Based Theme Toggle Button */}
            <button
              onClick={cycleTimeMode}
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 hover:border-cyan-400/50 transition-all text-xs font-mono text-slate-300 hover:text-white group focus:outline-none"
              title={`Current Theme: ${currentInfo.name} (${currentInfo.timeRange}). Click to cycle themes.`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={timeMode}
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {renderThemeIcon(timeMode)}
                </motion.div>
              </AnimatePresence>

              <span className="hidden xl:inline text-[11px] font-semibold tracking-wider uppercase text-slate-200">
                {timeMode} SPACE
              </span>

              {isAuto && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  AUTO
                </span>
              )}
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
              onClick={cycleTimeMode}
              className="p-2 rounded-xl text-slate-300 hover:text-white glass-panel focus:outline-none flex items-center gap-1"
              title="Cycle Space Time Theme"
            >
              {renderThemeIcon(timeMode)}
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
                onClick={cycleTimeMode}
                className="w-full py-2.5 px-4 rounded-xl glass-panel flex items-center justify-between text-xs font-mono text-slate-200"
              >
                <span>Space Theme:</span>
                <span className="flex items-center space-x-1.5 font-bold text-cyan-400 uppercase">
                  {renderThemeIcon(timeMode)}
                  <span>{timeMode}</span>
                  {isAuto && <span className="text-[10px] text-cyan-300 font-mono">(AUTO)</span>}
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
