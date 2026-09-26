import { Suspense } from 'react';
import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/ui/HeroSection';
import CapabilitiesSection from '@/components/ui/CapabilitiesSection';
import ProjectGrid from '@/components/ui/ProjectGrid';
import ContactSection from '@/components/ui/ContactSection';
import CatalogSection from '@/components/catalog/CatalogSection';
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
      <ProjectGrid projects={projects} />
      <ContactSection />
      <Suspense
        fallback={
          <div className="py-20 text-center font-mono text-xs text-slate-400 animate-pulse">
            Loading App Templates Catalog Showcase &amp; Sandbox...
          </div>
        }
      >
        <CatalogSection />
      </Suspense>
      <Footer />
      <MobileBottomDock />
    </main>
  );
}
