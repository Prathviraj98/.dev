'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Cpu, Code2, Briefcase, Mail } from 'lucide-react';

export default function MobileBottomDock() {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      const capabilitiesEl = document.getElementById('capabilities');
      const architectureEl = document.getElementById('architecture');
      const portfolioEl = document.getElementById('portfolio');
      const contactEl = document.getElementById('contact');

      if (contactEl && scrollPosition >= contactEl.offsetTop) {
        setActiveSection('contact');
      } else if (portfolioEl && scrollPosition >= portfolioEl.offsetTop) {
        setActiveSection('portfolio');
      } else if (architectureEl && scrollPosition >= architectureEl.offsetTop) {
        setActiveSection('architecture');
      } else if (capabilitiesEl && scrollPosition >= capabilitiesEl.offsetTop) {
        setActiveSection('capabilities');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', name: 'Home', href: '#', icon: Home },
    { id: 'capabilities', name: 'Services', href: '#capabilities', icon: Cpu },
    { id: 'architecture', name: 'Engine', href: '#architecture', icon: Code2 },
    { id: 'portfolio', name: 'Projects', href: '#portfolio', icon: Briefcase },
    { id: 'contact', name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm md:hidden pointer-events-auto">
      <nav className="glass-panel bg-slate-950/90 backdrop-blur-2xl border border-white/20 rounded-full px-2 py-1.5 flex items-center justify-around shadow-[0_12px_32px_rgba(0,0,0,0.7)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              className="relative flex flex-col items-center justify-center min-w-[48px] min-h-[48px] py-1 px-2 group focus:outline-none"
              aria-label={item.name}
            >
              {/* Active Indicator Glow Background Pill */}
              {isActive && (
                <motion.div
                  layoutId="activeDockIndicator"
                  className="absolute inset-0 rounded-full bg-cyan-500/20 border border-cyan-500/40 shadow-neon-cyan"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              {/* Icon */}
              <Icon
                className={`w-4 h-4 transition-colors z-10 ${
                  isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-white'
                }`}
              />

              {/* Text Label */}
              <span
                className={`text-[9px] font-mono font-medium tracking-tight mt-0.5 z-10 transition-colors ${
                  isActive ? 'text-cyan-300 font-bold' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              >
                {item.name}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
