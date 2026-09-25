import type { Metadata, Viewport } from 'next';
import './globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import { ThemeProvider } from '@/components/providers/ThemeContext';
import Background3D from '@/components/3d/Background3D';
import AstronautCursor from '@/components/ui/AstronautCursor';

export const metadata: Metadata = {
  title: '.Dev',
  description: 'Elite full-stack software architecture, AI document pipelines, 3D WebGL interfaces, zero-knowledge encryption, and high-performance distributed web applications.',
  keywords: ['Full Stack Engineer', 'Next.js 14', 'FastAPI', 'Three.js', 'React Three Fiber', 'PostgreSQL', 'Redis', 'WebGL'],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark overflow-x-hidden max-w-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
      </head>
      <body className="bg-background text-slate-100 antialiased relative min-h-screen selection:bg-primary selection:text-white day-mode w-full max-w-full overflow-x-hidden">
        <ThemeProvider>
          <SmoothScrollProvider>
            {/* 3D WebGL Interactive Coding Theme Canvas */}
            <Background3D />

            {/* Astronaut Avatar Cursor & Particle Trail */}
            <AstronautCursor />

            {/* Main App Content Container */}
            <div className="relative z-10 flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
              {children}
            </div>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
