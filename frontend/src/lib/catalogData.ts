import { CatalogItem } from '@/types/catalog';

const DOMAINS = [
  'FinTech',
  'HealthTech',
  'E-commerce',
  'DevTools',
  'EdTech',
  'SaaS',
  'Web3',
  'AI & ML',
  'Cybersecurity',
] as const;

const PLATFORMS = [
  'Web App',
  'Mobile App',
  'Landing Page',
  'Dashboard',
  'Chrome Extension',
] as const;

const PRICINGS = ['Open Source', 'Freemium', 'Paid'] as const;

const TECH_OPTIONS = [
  'React',
  'Next.js 14',
  'Vue 3',
  'TypeScript',
  'Tailwind CSS',
  'FastAPI',
  'PostgreSQL',
  'Redis',
  'PyTorch',
  'WebAssembly',
  'Solidity',
  'Flutter',
  'GraphQL',
  'Node.js',
  'Rust',
  'Docker',
  'Kubernetes',
  'Three.js',
];

const TEMPLATE_SNIPPETS = [
  /* 1. SaaS KPI Analytics Dashboard Template */
  `<div class="space-y-4">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div class="custom-card space-y-1">
        <div class="text-[11px] font-mono uppercase" style="color: var(--color-muted)">Monthly Recurring Revenue</div>
        <div class="text-xl sm:text-2xl font-extrabold">$84,250.00</div>
        <div class="text-[10px] text-emerald-400 font-bold">+18.4% vs last month</div>
      </div>
      <div class="custom-card space-y-1">
        <div class="text-[11px] font-mono uppercase" style="color: var(--color-muted)">Active SaaS Accounts</div>
        <div class="text-xl sm:text-2xl font-extrabold">14,820</div>
        <div class="text-[10px] text-emerald-400 font-bold">+1,240 new signups</div>
      </div>
      <div class="custom-card space-y-1">
        <div class="text-[11px] font-mono uppercase" style="color: var(--color-muted)">Average Response Time</div>
        <div class="text-xl sm:text-2xl font-extrabold">12.4 ms</div>
        <div class="text-[10px] font-bold" style="color: var(--color-primary)">P99 Sub-20ms SLA</div>
      </div>
    </div>

    <div class="custom-card space-y-3">
      <div class="flex items-center justify-between border-b pb-2" style="border-color: var(--color-border)">
        <span class="font-bold text-xs uppercase font-mono">Live System Workflows</span>
        <span class="px-2 py-0.5 text-[10px] font-mono rounded" style="background-color: var(--color-primary); color: white">ACTIVE</span>
      </div>
      <div class="space-y-2 font-mono text-xs">
        <div class="flex justify-between items-center">
          <span style="color: var(--color-text)">[Worker 01] Stripe Webhook Event Processor</span>
          <span class="text-emerald-400 font-bold">HEALTHY (0 errors)</span>
        </div>
        <div class="flex justify-between items-center">
          <span style="color: var(--color-text)">[Worker 02] PostgreSQL Read-Replica Pool</span>
          <span class="text-emerald-400 font-bold">SYNCED (0.2ms lag)</span>
        </div>
        <div class="flex justify-between items-center">
          <span style="color: var(--color-text)">[Worker 03] Redis In-Memory Cache Cluster</span>
          <span class="text-emerald-400 font-bold">99.1% HIT RATE</span>
        </div>
      </div>
    </div>
  </div>`,

  /* 2. E-Commerce Storefront Checkout Template */
  `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="custom-card space-y-3">
      <div class="flex justify-between items-center border-b pb-2" style="border-color: var(--color-border)">
        <span class="font-bold text-xs font-mono uppercase">Order Summary</span>
        <span class="text-xs font-bold" style="color: var(--color-primary)">3 Items in Cart</span>
      </div>
      <div class="space-y-2 text-xs">
        <div class="flex justify-between">
          <span>Pro UI Component Suite (License)</span>
          <span class="font-bold">$149.00</span>
        </div>
        <div class="flex justify-between"><span>Tailwind Theme Pack</span><span class="font-bold">$49.00</span></div>
        <div class="flex justify-between"><span>Developer Support Addon</span><span class="font-bold">$29.00</span></div>
      </div>
      <div class="pt-2 border-t flex justify-between font-bold text-sm" style="border-color: var(--color-border)">
        <span>Total Due</span>
        <span style="color: var(--color-primary)">$227.00</span>
      </div>
      <button class="custom-btn w-full text-xs">Proceed to Instant Checkout</button>
    </div>

    <div class="custom-card space-y-3">
      <span class="font-bold text-xs font-mono uppercase block">Customer Payment Information</span>
      <div class="space-y-2 text-xs">
        <input type="text" placeholder="Cardholder Name" class="w-full p-2 rounded border bg-transparent" style="border-color: var(--color-border)" />
        <input type="text" placeholder="•••• •••• •••• 4242" class="w-full p-2 rounded border bg-transparent" style="border-color: var(--color-border)" />
        <div class="grid grid-cols-2 gap-2">
          <input type="text" placeholder="MM / YY" class="p-2 rounded border bg-transparent" style="border-color: var(--color-border)" />
          <input type="text" placeholder="CVC" class="p-2 rounded border bg-transparent" style="border-color: var(--color-border)" />
        </div>
      </div>
    </div>
  </div>`,

  /* 3. Task & Project Kanban Workspace Template */
  `<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
    <div class="custom-card space-y-2">
      <div class="flex justify-between items-center text-xs font-mono font-bold border-b pb-1" style="border-color: var(--color-border)">
        <span>BACKLOG (2)</span>
        <span class="text-slate-400">+</span>
      </div>
      <div class="p-2 rounded text-xs space-y-1 bg-black/10">
        <div class="font-bold">OAuth 2.0 Auth Flow Integration</div>
        <div class="text-[10px] text-amber-400 font-mono">PRIORITY: HIGH</div>
      </div>
      <div class="p-2 rounded text-xs space-y-1 bg-black/10">
        <div class="font-bold">Design Token Migration</div>
        <div class="text-[10px] text-slate-400 font-mono">PRIORITY: LOW</div>
      </div>
    </div>

    <div class="custom-card space-y-2">
      <div class="flex justify-between items-center text-xs font-mono font-bold border-b pb-1" style="border-color: var(--color-border)">
        <span>IN PROGRESS (1)</span>
        <span className="text-cyan-400">•</span>
      </div>
      <div class="p-2 rounded text-xs space-y-1 bg-black/10 border-l-2 border-cyan-400">
        <div class="font-bold">WebAssembly Core Compiler Setup</div>
        <div class="text-[10px] text-cyan-400 font-mono">ASSIGNED: @devcore</div>
      </div>
    </div>

    <div class="custom-card space-y-2">
      <div class="flex justify-between items-center text-xs font-mono font-bold border-b pb-1" style="border-color: var(--color-border)">
        <span>COMPLETED (2)</span>
        <span className="text-emerald-400">✓</span>
      </div>
      <div class="p-2 rounded text-xs space-y-1 bg-black/10 opacity-75">
        <div class="font-bold">Docker Multi-Stage Build Script</div>
        <div class="text-[10px] text-emerald-400 font-mono">SHIPPED v1.4</div>
      </div>
    </div>
  </div>`,

  /* 4. AI Content Generator & Prompt Studio Template */
  `<div class="custom-card space-y-4">
    <div class="flex items-center justify-between">
      <span class="font-bold text-xs font-mono uppercase">AI Prompt Studio &amp; Model Playground</span>
      <span class="text-xs font-mono text-emerald-400 font-bold">MODEL: GEMINI 1.5 PRO</span>
    </div>
    <div class="space-y-2">
      <textarea rows="3" class="w-full p-3 rounded border text-xs font-mono bg-transparent" style="border-color: var(--color-border)" placeholder="Enter instructions or topic prompt for AI generation..."></textarea>
      <div class="flex items-center justify-between">
        <div class="flex space-x-2 text-[10px] font-mono">
          <span class="px-2 py-1 rounded bg-black/20">Creativity: 0.7</span>
          <span class="px-2 py-1 rounded bg-black/20">Tokens: 2,048</span>
        </div>
        <button class="custom-btn text-xs">Generate Response</button>
      </div>
    </div>
  </div>`,

  /* 5. Cloud Storage & File Manager Template */
  `<div class="custom-card space-y-3">
    <div class="flex items-center justify-between border-b pb-2" style="border-color: var(--color-border)">
      <span class="font-bold text-xs font-mono uppercase">Cloud Drive Storage</span>
      <span class="text-xs font-mono text-cyan-400">42.8 GB / 100 GB Used</span>
    </div>
    <div class="space-y-2 text-xs font-mono">
      <div class="flex justify-between items-center p-2 rounded bg-black/10">
        <span>📁 production-deployment-v2.zip</span>
        <span class="text-slate-400">142.4 MB</span>
      </div>
      <div class="flex justify-between items-center p-2 rounded bg-black/10">
        <span>📄 dataset-export-2026.json</span>
        <span class="text-slate-400">18.2 MB</span>
      </div>
      <div class="flex justify-between items-center p-2 rounded bg-black/10">
        <span>🖼️ app-hero-mockup.png</span>
        <span class="text-slate-400">4.1 MB</span>
      </div>
    </div>
  </div>`,
];

const CURATED_SEED: Array<{
  title: string;
  tagline: string;
  domain: (typeof DOMAINS)[number];
  platform: (typeof PLATFORMS)[number];
  pricing: (typeof PRICINGS)[number];
  tech: string[];
}> = [
  {
    title: 'SaaS Pro Analytics Dashboard',
    tagline: 'Enterprise Analytics, KPI Tracking & Subscription Revenue Engine',
    domain: 'SaaS',
    platform: 'Dashboard',
    pricing: 'Freemium',
    tech: ['React', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
  },
  {
    title: 'OmniStore E-Commerce Storefront',
    tagline: 'Modern Headless E-Commerce Suite with Cart & Stripe Checkout',
    domain: 'E-commerce',
    platform: 'Web App',
    pricing: 'Open Source',
    tech: ['Next.js 14', 'TypeScript', 'GraphQL', 'Tailwind CSS'],
  },
  {
    title: 'TaskCraft Kanban Workspaces',
    tagline: 'Agile Task Management, Sprint Planning & Team Kanban Boards',
    domain: 'DevTools',
    platform: 'Web App',
    pricing: 'Freemium',
    tech: ['Vue 3', 'TypeScript', 'Node.js', 'Tailwind CSS'],
  },
  {
    title: 'GenStudio AI Prompt Suite',
    tagline: 'Multi-Modal AI Content Generator & Prompt Engineering Studio',
    domain: 'AI & ML',
    platform: 'Web App',
    pricing: 'Freemium',
    tech: ['FastAPI', 'PyTorch', 'Next.js 14', 'Tailwind CSS'],
  },
  {
    title: 'LeadSphere CRM Platform',
    tagline: 'Sales Pipeline, Lead Management & Customer Relationship Hub',
    domain: 'SaaS',
    platform: 'Dashboard',
    pricing: 'Paid',
    tech: ['React', 'TypeScript', 'PostgreSQL', 'Redis'],
  },
  {
    title: 'CloudDrive File Manager',
    tagline: 'Secure Cloud Storage, File Sharing & Storage Quota Console',
    domain: 'DevTools',
    platform: 'Web App',
    pricing: 'Open Source',
    tech: ['Node.js', 'React', 'TypeScript', 'Docker'],
  },
  {
    title: 'ApexPay FinTech Wallet',
    tagline: 'Digital Wallet, Expense Tracking & Multi-Currency Payments',
    domain: 'FinTech',
    platform: 'Mobile App',
    pricing: 'Freemium',
    tech: ['Flutter', 'TypeScript', 'PostgreSQL', 'Redis'],
  },
  {
    title: 'EduAcademy LMS Portal',
    tagline: 'Online Course Platform, Interactive Quizzes & Progress Tracker',
    domain: 'EdTech',
    platform: 'Web App',
    pricing: 'Paid',
    tech: ['Next.js 14', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'MedPulse Patient Portal',
    tagline: 'Patient Records, EHR Sync & Doctor Consultation Scheduler',
    domain: 'HealthTech',
    platform: 'Dashboard',
    pricing: 'Paid',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'Docker'],
  },
  {
    title: 'CyberGuard Threat Console',
    tagline: 'SOC Security Monitoring, Firewall Alerts & IP Scan Console',
    domain: 'Cybersecurity',
    platform: 'Dashboard',
    pricing: 'Paid',
    tech: ['Rust', 'WebAssembly', 'React', 'PostgreSQL'],
  },
  {
    title: 'APIForge Developer Documentation',
    tagline: 'Interactive API Docs, OpenAPI Specs & Request Testing Sandbox',
    domain: 'DevTools',
    platform: 'Landing Page',
    pricing: 'Open Source',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
  },
  {
    title: 'TeamPulse Workspace Chat',
    tagline: 'Real-Time Team Messaging, Channels & Voice Huddle Suite',
    domain: 'SaaS',
    platform: 'Web App',
    pricing: 'Freemium',
    tech: ['React', 'Node.js', 'Redis', 'WebAssembly'],
  },
  {
    title: 'CryptoVault Web3 Exchange',
    tagline: 'DeFi Token Swap, Crypto Wallet Connect & NFT Marketplace UI',
    domain: 'Web3',
    platform: 'Web App',
    pricing: 'Open Source',
    tech: ['Solidity', 'Next.js 14', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'FoodieDash Restaurant Suite',
    tagline: 'Online Food Ordering, Menu Customizer & Live Delivery Tracker',
    domain: 'E-commerce',
    platform: 'Mobile App',
    pricing: 'Freemium',
    tech: ['Flutter', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    title: 'EstateLand Property Portal',
    tagline: 'Real Estate Listings, Filterable Map Search & Tour Booking',
    domain: 'SaaS',
    platform: 'Web App',
    pricing: 'Paid',
    tech: ['React', 'Next.js 14', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'WorkflowOps Automation Engine',
    tagline: 'Visual Zapier-Style Workflow Automation & Webhook Integration',
    domain: 'DevTools',
    platform: 'Dashboard',
    pricing: 'Freemium',
    tech: ['Vue 3', 'Node.js', 'Redis', 'Docker'],
  },
  {
    title: 'EventHub Ticketing Console',
    tagline: 'Live Event Booking, QR Seat Selection & Ticket Checkout',
    domain: 'E-commerce',
    platform: 'Web App',
    pricing: 'Paid',
    tech: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    title: 'SupportDesk Help Center',
    tagline: 'Customer Support Ticketing, Knowledge Base & AI Chatbot',
    domain: 'SaaS',
    platform: 'Web App',
    pricing: 'Freemium',
    tech: ['React', 'FastAPI', 'PyTorch', 'Node.js'],
  },
  {
    title: 'MetricsHQ Server Monitor',
    tagline: 'Infrastructure Health, Server Uptime Alerts & Metrics Viewer',
    domain: 'DevTools',
    platform: 'Dashboard',
    pricing: 'Open Source',
    tech: ['Rust', 'React', 'Kubernetes', 'Docker'],
  },
  {
    title: 'DocuSign Pro e-Sign Portal',
    tagline: 'Digital Document Signatures, PDF Annotations & Audit Logs',
    domain: 'SaaS',
    platform: 'Web App',
    pricing: 'Paid',
    tech: ['TypeScript', 'Next.js 14', 'PostgreSQL', 'Redis'],
  },
  {
    title: 'FitnessPulse Workout Tracker',
    tagline: 'Fitness Planner, Calorie Log & Health Metrics Dashboard',
    domain: 'HealthTech',
    platform: 'Mobile App',
    pricing: 'Freemium',
    tech: ['Flutter', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    title: 'InventoryPro Logistics Hub',
    tagline: 'Warehouse Stock Management, Barcode Scanner & Supply Chain',
    domain: 'E-commerce',
    platform: 'Dashboard',
    pricing: 'Paid',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    title: 'PodcastStudio Audio Hub',
    tagline: 'Audio Streaming Player, Episode Distribution & Analytics',
    domain: 'SaaS',
    platform: 'Web App',
    pricing: 'Freemium',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Redis'],
  },
  {
    title: 'HotelBook Hospitality Suite',
    tagline: 'Hotel Room Reservations, Amenities Manager & Guest Reviews',
    domain: 'E-commerce',
    platform: 'Web App',
    pricing: 'Paid',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  },
];

function generate100Items(): CatalogItem[] {
  const items: CatalogItem[] = [];

  for (let i = 0; i < 105; i++) {
    const seed = CURATED_SEED[i % CURATED_SEED.length];
    const itemNum = i + 1;
    const domain = seed.domain;
    const platform = seed.platform;
    const pricing = seed.pricing;

    const title =
      i < CURATED_SEED.length
        ? seed.title
        : `${seed.title} Template ${Math.floor(i / CURATED_SEED.length) + 1}`;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    items.push({
      id: `item-${itemNum}`,
      slug,
      title,
      tagline: seed.tagline,
      description: `Standard, production-ready ${domain} application template designed for rapid deployment, clean UI component architecture, seamless ${platform} layout, and responsive multi-device viewports.`,
      domain,
      platform,
      pricing,
      tech_stack: seed.tech,
      rating: Number((4.6 + (i % 4) * 0.1).toFixed(1)),
      stars: 180 + i * 42,
      downloads: 650 + i * 210,
      featured: i % 7 === 0,
      trending: i % 5 === 0,
      created_at: new Date(Date.now() - i * 86400000 * 2).toISOString().split('T')[0],
      thumbnail_url: `https://images.unsplash.com/photo-${1550751827 + (i % 10) * 100}-4bd374c3f58b?auto=format&fit=crop&w=800&q=80`,
      demo_url: 'https://dotdev.dpdns.org',
      github_url: 'https://github.com/Prathviraj98/.dev',
      creator: {
        name: i % 2 === 0 ? '.DEV Template Lab' : 'Standard WebApp Collection',
        avatar_url: '/icon.svg',
        handle: i % 2 === 0 ? '@dotdev' : '@webapptemplates',
        verified: true,
      },
      audit_scores: {
        performance: 94 + (i % 6),
        ui_clarity: 96 + (i % 4),
        accessibility: 92 + (i % 8),
        security: 98,
      },
      features: [
        'Production-Ready UI Component Architecture',
        'Responsive Mobile, Tablet & Desktop Viewports',
        'Real-Time Live Customizer & Theme Injection',
        'Clean Modular Code Structure',
        'Sub-50ms Fast Page Render Guarantee',
      ],
      default_customizer: {
        theme: (['dark', 'midnight', 'emerald', 'amber', 'cyberpunk'][i % 5] as any),
        primaryColor: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'][i % 5],
        fontFamily: (['Inter', 'JetBrains Mono', 'Roboto', 'Playfair Display'][i % 4] as any),
        borderRadius: (['rounded', 'pill', 'none'][i % 3] as any),
        spacing: (['normal', 'compact', 'spacious'][i % 3] as any),
        heroStyle: 'gradient',
        viewportMode: 'desktop',
      },
      template_html: TEMPLATE_SNIPPETS[i % TEMPLATE_SNIPPETS.length],
    });
  }

  return items;
}

export const CATALOG_ITEMS: CatalogItem[] = generate100Items();
export const catalogItems = CATALOG_ITEMS;

export const DOMAIN_OPTIONS = Array.from(DOMAINS);
export const PLATFORM_OPTIONS = Array.from(PLATFORMS);
export const PRICING_OPTIONS = Array.from(PRICINGS);
export const ALL_TECH_OPTIONS = Array.from(TECH_OPTIONS);
