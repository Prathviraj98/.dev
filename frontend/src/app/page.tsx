import { Suspense } from 'react';
import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/ui/HeroSection';
import CapabilitiesSection from '@/components/ui/CapabilitiesSection';
import CatalogSection from '@/components/catalog/CatalogSection';
import ProjectGrid from '@/components/ui/ProjectGrid';
import ContactSection from '@/components/ui/ContactSection';
import Footer from '@/components/ui/Footer';
import MobileBottomDock from '@/components/ui/MobileBottomDock';
import { fetchProjects } from '@/lib/api';

export default async function HomePage() {
  const projects = await fetchProjects();

  return (
    <main className="flex-1 w-full max-w-full relative overflow-x-hidden pb-16 md:pb-0">
      <Navbar />
      <HeroSection />
      <CapabilitiesSection />
      <Suspense
        fallback={
          <div className="py-20 text-center font-mono text-xs text-slate-400 animate-pulse">
            Loading Catalog Showcase &amp; Sandbox...
          </div>
        }
      >
        <CatalogSection />
      </Suspense>
      <ProjectGrid projects={projects} />
      <ContactSection />
      <Footer />
      <MobileBottomDock />
    </main>
  );
}
