'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  char?: string;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export default function AstronautCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [clickRings, setClickRings] = useState<{ id: number; x: number; y: number }[]>([]);

  const particlesRef = useRef<Particle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const prevPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Hide custom astronaut cursor on touch devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      // Check if hovering interactive elements
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.glass-card') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      const newRing = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
      setClickRings((prev) => [...prev.slice(-4), newRing]);
      setTimeout(() => setIsClicked(false), 200);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Animation Loop for Zero-Gravity Lerp Physics & Jetpack Particles
    let particleIdCounter = 0;
    const codeChars = ['0', '1', '{', '}', ';', '</>', '🚀', '✦'];
    const colors = ['#38bdf8', '#818cf8', '#34d399', '#f472b6', '#a78bfa'];

    const renderLoop = () => {
      // Smooth lerp tracking
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.18;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.18;

      setPos({ x: currentPos.current.x, y: currentPos.current.y });

      // Calculate movement delta & angle
      const dx = currentPos.current.x - prevPos.current.x;
      const dy = currentPos.current.y - prevPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 0.5) {
        const targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        // Smoothly interpolate rotation angle
        setRotation((prev) => {
          let diff = (targetAngle - prev) % 360;
          if (diff > 180) diff -= 360;
          if (diff < -180) diff += 360;
          return prev + diff * 0.15;
        });

        // Spawn Jetpack Thruster Particles when moving
        if (Math.random() < 0.6) {
          particleIdCounter++;
          particlesRef.current.push({
            id: particleIdCounter,
            x: currentPos.current.x,
            y: currentPos.current.y + 16,
            size: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            char: Math.random() < 0.3 ? codeChars[Math.floor(Math.random() * codeChars.length)] : undefined,
            vx: -dx * 0.15 + (Math.random() - 0.5) * 1.5,
            vy: -dy * 0.15 + Math.random() * 2 + 1,
            life: 0,
            maxLife: Math.floor(Math.random() * 20 + 15),
          });
        }
      }

      prevPos.current = { x: currentPos.current.x, y: currentPos.current.y };

      // Update & Draw Thruster Canvas Particles
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);

          particlesRef.current.forEach((p) => {
            p.life++;
            p.x += p.vx;
            p.y += p.vy;
            const alpha = 1 - p.life / p.maxLife;

            ctx.save();
            ctx.globalAlpha = alpha;
            if (p.char) {
              ctx.font = '10px monospace';
              ctx.fillStyle = p.color;
              ctx.fillText(p.char, p.x, p.y);
            } else {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size * (1 - p.life / p.maxLife), 0, Math.PI * 2);
              ctx.fillStyle = p.color;
              ctx.shadowBlur = 8;
              ctx.shadowColor = p.color;
              ctx.fill();
            }
            ctx.restore();
          });
        }
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Update canvas resolution on resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Particle Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
      />

      {/* Quantum Gravitational Shockwave Rings on Click */}
      {clickRings.map((ring) => (
        <motion.div
          key={ring.id}
          initial={{ opacity: 0.8, scale: 0.2 }}
          animate={{ opacity: 0, scale: 2.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed rounded-full border-2 border-cyan-400 pointer-events-none z-[9998] shadow-neon-cyan"
          style={{
            left: ring.x - 24,
            top: ring.y - 24,
            width: 48,
            height: 48,
          }}
        />
      ))}

      {/* Floating Astronaut Avatar Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: pos.x - 18,
          y: pos.y - 18,
          scale: isClicked ? 0.85 : isHovered ? 1.35 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div
          className="relative w-10 h-10 flex items-center justify-center transition-transform duration-200"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Neon Glow Aura */}
          <div
            className={`absolute inset-0 rounded-full blur-md transition-all duration-300 ${
              isHovered
                ? 'bg-cyan-400/60 scale-125'
                : 'bg-indigo-500/30 group-hover:bg-cyan-400/40'
            }`}
          />

          {/* Astronaut SVG Avatar */}
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-9 h-9 relative z-10 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
          >
            {/* Oxygen Backpack / Life Support Unit */}
            <rect x="14" y="24" width="36" height="24" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <rect x="18" y="28" width="8" height="12" rx="2" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
            {/* LED Status Indicators */}
            <circle cx="21" cy="31" r="1.5" fill="#34d399" className="animate-pulse" />
            <circle cx="21" cy="35" r="1.5" fill="#38bdf8" />

            {/* Space Suit Shoulders & Torso */}
            <path
              d="M16 46C16 40 22 36 32 36C42 36 48 40 48 46V54C48 56 46 58 44 58H20C18 58 16 56 16 54V46Z"
              fill="#f8fafc"
              stroke="#0f172a"
              strokeWidth="2"
            />
            {/* Suit Chest Emblem (.DEV Badge) */}
            <rect x="28" y="42" width="8" height="6" rx="1.5" fill="#0284c7" />
            <circle cx="32" cy="45" r="1.5" fill="#38bdf8" />

            {/* Astronaut Helmet Outer Shell */}
            <circle cx="32" cy="22" r="16" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />

            {/* Reflective Cosmic Visor */}
            <ellipse
              cx="32"
              cy="21"
              rx="11"
              ry="9"
              fill="url(#visorGradient)"
              stroke="#38bdf8"
              strokeWidth="1.5"
            />

            {/* Visor Specular Reflection Star */}
            <path
              d="M26 16L27.5 18.5L30 19L27.5 19.5L26 22L24.5 19.5L22 19L24.5 18.5L26 16Z"
              fill="#ffffff"
              opacity="0.85"
            />

            {/* Jetpack Thruster Flame Trail (Bottom) */}
            <path
              d="M26 58L32 64L38 58"
              fill={isHovered ? '#38bdf8' : '#818cf8'}
              className="animate-pulse"
            />

            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="visorGradient" x1="21" y1="12" x2="43" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#06b6d4" />
                <stop offset="0.5" stopColor="#3b82f6" />
                <stop offset="1" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Interactive Target Indicator when Hovering */}
          {isHovered && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-6 -right-6 px-1.5 py-0.5 rounded bg-cyan-500/90 text-[9px] font-mono font-bold text-slate-950 shadow-neon-cyan"
            >
              LOCKED
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
