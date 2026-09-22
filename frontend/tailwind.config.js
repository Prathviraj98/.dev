/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#07090e',
        surface: {
          DEFAULT: '#0d111a',
          lighter: '#151c2a',
          card: 'rgba(15, 23, 42, 0.65)',
        },
        primary: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
          glow: 'rgba(99, 102, 241, 0.35)',
        },
        accent: {
          cyan: '#06b6d4',
          emerald: '#10b981',
          violet: '#8b5cf6',
          pink: '#ec4899',
        },
        border: {
          glass: 'rgba(255, 255, 255, 0.08)',
          highlight: 'rgba(99, 102, 241, 0.3)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass-glow': '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'neon-cyan': '0 0 25px rgba(6, 182, 212, 0.4)',
        'neon-indigo': '0 0 25px rgba(99, 102, 241, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
        glass: '16px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
