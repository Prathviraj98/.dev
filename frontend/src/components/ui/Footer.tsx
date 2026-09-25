'use client';

import { Terminal, Github, Twitter, Linkedin, Heart, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 glass-nav py-12 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & System Status */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-black text-white tracking-tight">
              <span className="text-cyan-400 font-mono font-extrabold">.</span>DEV
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            High-Performance Full-Stack & 3D Engineering Architecture
          </p>
        </div>


        {/* Links & Socials */}
        <div className="flex items-center space-x-6 text-slate-400 text-xs font-mono">
          <a href="#capabilities" className="hover:text-white transition-colors">
            Capabilities
          </a>
          <a href="#architecture" className="hover:text-white transition-colors">
            Architecture
          </a>
          <a href="#portfolio" className="hover:text-white transition-colors">
            Portfolio
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>

        {/* Copyright */}
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>© {new Date().getFullYear()} .DEV. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
}
