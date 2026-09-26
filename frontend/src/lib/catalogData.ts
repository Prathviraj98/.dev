import { CatalogItem } from '@/types/catalog';

const DOMAINS = ['FinTech', 'HealthTech', 'E-commerce', 'DevTools', 'EdTech', 'SaaS', 'Web3', 'AI & ML', 'Cybersecurity'] as const;
const PLATFORMS = ['Web App', 'Mobile App', 'Landing Page', 'Dashboard', 'Chrome Extension'] as const;
const PRICINGS = ['Open Source', 'Freemium', 'Paid'] as const;

const TECH_OPTIONS = [
  'React', 'Next.js 14', 'Vue 3', 'TypeScript', 'Tailwind CSS', 'FastAPI',
  'PostgreSQL', 'Redis', 'PyTorch', 'WebAssembly', 'Solidity', 'Flutter',
  'GraphQL', 'Node.js', 'Rust', 'Docker', 'Kubernetes', 'Three.js'
];

const TEMPLATE_SNIPPETS = [
  `<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="custom-card space-y-2">
      <div class="text-xs font-mono uppercase tracking-wider" style="color: var(--color-muted)">Total Balance</div>
      <div class="text-2xl font-bold">$142,850.00</div>
      <div class="text-xs text-emerald-400 font-semibold">+14.2% from last month</div>
    </div>
    <div class="custom-card space-y-2">
      <div class="text-xs font-mono uppercase tracking-wider" style="color: var(--color-muted)">Active Users</div>
      <div class="text-2xl font-bold">28,400</div>
      <div class="text-xs text-emerald-400 font-semibold">+8.5% weekly peak</div>
    </div>
    <div class="custom-card space-y-2">
      <div class="text-xs font-mono uppercase tracking-wider" style="color: var(--color-muted)">Latency SLA</div>
      <div class="text-2xl font-bold">14.2 ms</div>
      <div class="text-xs font-semibold" style="color: var(--color-primary)">Sub-50ms Guaranteed</div>
    </div>
  </div>`,

  `<div class="custom-card space-y-4">
    <div class="flex items-center justify-between border-b pb-3" style="border-color: var(--color-border)">
      <h3 class="font-bold text-base">Real-Time Data Pipeline Monitor</h3>
      <span class="px-2 py-1 text-xs font-mono rounded" style="background-color: var(--color-primary); color: white">ONLINE</span>
    </div>
    <div class="space-y-2 font-mono text-xs">
      <div class="flex justify-between"><span>[STREAM #1] Neural Embeddings Pipeline</span><span class="text-emerald-400">99.98% OK</span></div>
      <div class="flex justify-between"><span>[STREAM #2] Postgres Replication Sync</span><span class="text-emerald-400">SYNCED</span></div>
      <div class="flex justify-between"><span>[STREAM #3] Redis Cluster Cache Hit</span><span class="text-emerald-400">98.4% HIT</span></div>
    </div>
  </div>`,

  `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div class="custom-card space-y-3">
      <h4 class="font-bold text-sm">Security & Audit Metrics</h4>
      <p class="text-xs" style="color: var(--color-muted)">Zero-Knowledge Cryptographic Chain Validation with Libsodium and WebAssembly.</p>
      <button class="custom-btn text-xs">Run Verification Scan</button>
    </div>
    <div class="custom-card space-y-3">
      <h4 class="font-bold text-sm">AI Inference Engine</h4>
      <p class="text-xs" style="color: var(--color-muted)">SBERT Model Sentence Similarity Scoring Pipeline running on TensorRT.</p>
      <button class="custom-btn text-xs">Test Model Prompt</button>
    </div>
  </div>`
];

const CURATED_SEED: Array<{ title: string; tagline: string; domain: typeof DOMAINS[number]; platform: typeof PLATFORMS[number]; pricing: typeof PRICINGS[number]; tech: string[] }> = [
  { title: 'NexusVault Pro', tagline: 'Zero-Knowledge Encrypted Asset Vault & Multi-Sig Custody', domain: 'FinTech', platform: 'Web App', pricing: 'Freemium', tech: ['Next.js 14', 'TypeScript', 'WebAssembly', 'Tailwind CSS'] },
  { title: 'AuraHealth Intelligence', tagline: 'AI-Powered Clinical Diagnostics & EHR Sync Engine', domain: 'HealthTech', platform: 'Dashboard', pricing: 'Paid', tech: ['React', 'FastAPI', 'PyTorch', 'PostgreSQL'] },
  { title: 'OmniCart Engine', tagline: 'Ultra-Fast Sub-Second Headless E-Commerce Suite', domain: 'E-commerce', platform: 'Landing Page', pricing: 'Open Source', tech: ['Next.js 14', 'TypeScript', 'GraphQL', 'Tailwind CSS'] },
  { title: 'AuditForge Core', tagline: 'Cryptographic Automated Code Audit & Compliance Pipeline', domain: 'DevTools', platform: 'Web App', pricing: 'Freemium', tech: ['Rust', 'WebAssembly', 'FastAPI', 'Docker'] },
  { title: 'Lumina LMS', tagline: 'Interactive Adaptive Learning Platform with Real-Time AI Tutoring', domain: 'EdTech', platform: 'Web App', pricing: 'Freemium', tech: ['React', 'Node.js', 'PyTorch', 'Redis'] },
  { title: 'PulseSaaS Admin', tagline: 'High-Scale Analytics Dashboard & Billing Platform', domain: 'SaaS', platform: 'Dashboard', pricing: 'Paid', tech: ['Vue 3', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'] },
  { title: 'EtherShield Protocol', tagline: 'Decentralized Smart Contract Security Guard', domain: 'Web3', platform: 'Chrome Extension', pricing: 'Open Source', tech: ['Solidity', 'TypeScript', 'React', 'WebAssembly'] },
  { title: 'KAES Evaluator AI', tagline: 'Sentence Transformer AI Rubric & NLP Scoring Pipeline', domain: 'AI & ML', platform: 'Web App', pricing: 'Freemium', tech: ['PyTorch', 'FastAPI', 'Next.js 14', 'Redis'] },
  { title: 'ZeroTrace Mesh', tagline: 'Metadata-Free E2EE P2P Messaging Gateway', domain: 'Cybersecurity', platform: 'Mobile App', pricing: 'Open Source', tech: ['Flutter', 'Rust', 'Libsodium', 'WebAssembly'] },
  { title: 'QuantumStock Terminal', tagline: 'Sub-Millisecond Algorithmic Trading & Order Book Viewer', domain: 'FinTech', platform: 'Dashboard', pricing: 'Paid', tech: ['React', 'Three.js', 'Redis', 'TypeScript'] },
  { title: 'BioGene Scanner', tagline: 'Genomic Sequence Alignment & Protein Folding Visualizer', domain: 'HealthTech', platform: 'Web App', pricing: 'Open Source', tech: ['Three.js', 'Python', 'WebAssembly', 'Docker'] },
  { title: 'HyperStore PWA', tagline: 'Offline-First Progressive Web App Storefront', domain: 'E-commerce', platform: 'Mobile App', pricing: 'Freemium', tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'GraphQL'] },
  { title: 'DevFlow Terminal', tagline: 'Cloud IDE & Containerized Microservice Sandbox', domain: 'DevTools', platform: 'Web App', pricing: 'Freemium', tech: ['Docker', 'Kubernetes', 'Node.js', 'React'] },
  { title: 'Edumentor Virtual Lab', tagline: 'Immersive 3D Physics & Chemistry Simulation Engine', domain: 'EdTech', platform: 'Web App', pricing: 'Paid', tech: ['Three.js', 'React', 'TypeScript', 'WebAssembly'] },
  { title: 'ScaleOps Manager', tagline: 'Kubernetes Cluster Autoscaling & Metric Visualizer', domain: 'SaaS', platform: 'Dashboard', pricing: 'Open Source', tech: ['Kubernetes', 'Docker', 'Vue 3', 'FastAPI'] },
  { title: 'ChainRelay Oracle', tagline: 'Cross-Chain Decentralized Data Feed Router', domain: 'Web3', platform: 'Web App', pricing: 'Freemium', tech: ['Solidity', 'Rust', 'TypeScript', 'GraphQL'] },
  { title: 'VisionGen AI', tagline: 'Generative Multi-Modal Image Synthesis Playground', domain: 'AI & ML', platform: 'Landing Page', pricing: 'Freemium', tech: ['PyTorch', 'FastAPI', 'Next.js 14', 'Tailwind CSS'] },
  { title: 'Sentinel Defense Guard', tagline: 'Automated Threat Detection & Zero-Day Patching Suite', domain: 'Cybersecurity', platform: 'Dashboard', pricing: 'Paid', tech: ['Rust', 'PostgreSQL', 'React', 'Docker'] },
  { title: 'PayMatrix Gateway', tagline: 'Global Crypto & Fiat Payment Gateway Processor', domain: 'FinTech', platform: 'Web App', pricing: 'Paid', tech: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Redis'] },
  { title: 'TeleMed Sync', tagline: 'HIPAA-Compliant Remote Telemedicine & Video Consultation Hub', domain: 'HealthTech', platform: 'Mobile App', pricing: 'Freemium', tech: ['Flutter', 'Node.js', 'WebAssembly', 'Tailwind CSS'] },
];

function generate100Items(): CatalogItem[] {
  const items: CatalogItem[] = [];

  // Repeat seed patterns to generate 105 realistic items
  for (let i = 0; i < 105; i++) {
    const seed = CURATED_SEED[i % CURATED_SEED.length];
    const itemNum = i + 1;
    const domain = seed.domain;
    const platform = seed.platform;
    const pricing = seed.pricing;

    const title = i < CURATED_SEED.length ? seed.title : `${seed.title} ${Math.floor(i / CURATED_SEED.length) + 1}.0`;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    items.push({
      id: `item-${itemNum}`,
      slug,
      title,
      tagline: seed.tagline,
      description: `Production-grade ${domain} solution built for high throughput, seamless ${platform} experience, and enterprise scalability. Includes verified type-safe architecture, automated test suite, and sub-50ms latency optimizations.`,
      domain,
      platform,
      pricing,
      tech_stack: seed.tech,
      rating: Number((4.5 + (i % 5) * 0.1).toFixed(1)),
      stars: 120 + i * 37,
      downloads: 450 + i * 180,
      featured: i % 7 === 0,
      trending: i % 5 === 0,
      created_at: new Date(Date.now() - i * 86400000 * 2).toISOString().split('T')[0],
      thumbnail_url: `https://images.unsplash.com/photo-${1550751827 + (i % 10) * 100}-4bd374c3f58b?auto=format&fit=crop&w=800&q=80`,
      demo_url: 'https://dotdev.dpdns.org',
      github_url: 'https://github.com/Prathviraj98/.dev',
      creator: {
        name: i % 2 === 0 ? '.DEV Core Architecture' : 'Antigravity AI Lab',
        avatar_url: '/icon.svg',
        handle: i % 2 === 0 ? '@dotdev' : '@antigravity',
        verified: true,
      },
      audit_scores: {
        performance: 92 + (i % 8),
        ui_clarity: 95 + (i % 5),
        accessibility: 90 + (i % 10),
        security: 98,
      },
      features: [
        'Sub-50ms API Latency Guarantee',
        '100% Type-Safe Architecture',
        'SOC2 & ISO Ready Audit Logs',
        'Real-Time Customizer & Theme Injection',
        'Responsive Mobile-First Viewports',
      ],
      default_customizer: {
        theme: (['dark', 'midnight', 'emerald', 'amber', 'cyberpunk'][i % 5] as any),
        primaryColor: (['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'][i % 5]),
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
