export type DomainSegment =
  | 'FinTech'
  | 'HealthTech'
  | 'E-commerce'
  | 'DevTools'
  | 'EdTech'
  | 'SaaS'
  | 'Web3'
  | 'AI & ML'
  | 'Cybersecurity';

export type PlatformType =
  | 'Web App'
  | 'Mobile App'
  | 'Landing Page'
  | 'Dashboard'
  | 'Chrome Extension';

export type PricingModel = 'Open Source' | 'Freemium' | 'Paid';

export type SortOption = 'popular' | 'recent' | 'alphabetical' | 'trending';

export type LayoutMode = 'grid' | 'table' | 'masonry';

export interface AuditScores {
  performance: number; // 0 - 100
  ui_clarity: number; // 0 - 100
  accessibility: number; // 0 - 100
  security: number; // 0 - 100
}

export interface CreatorInfo {
  name: string;
  avatar_url: string;
  handle: string;
  verified: boolean;
}

export interface CustomizerConfig {
  theme: 'dark' | 'light' | 'emerald' | 'amber' | 'cyberpunk' | 'midnight';
  primaryColor: string;
  fontFamily: 'Inter' | 'Roboto' | 'Playfair Display' | 'JetBrains Mono';
  borderRadius: 'none' | 'rounded' | 'pill';
  spacing: 'compact' | 'normal' | 'spacious';
  heroStyle: 'gradient' | 'minimal' | 'cards';
  headlineOverride?: string;
  subheadlineOverride?: string;
  viewportMode: 'desktop' | 'tablet' | 'mobile';
}

export interface CatalogItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  domain: DomainSegment;
  platform: PlatformType;
  pricing: PricingModel;
  tech_stack: string[];
  rating: number;
  stars: number;
  downloads: number;
  featured: boolean;
  trending: boolean;
  created_at: string;
  thumbnail_url: string;
  demo_url?: string;
  github_url?: string;
  creator: CreatorInfo;
  audit_scores: AuditScores;
  features: string[];
  default_customizer: CustomizerConfig;
  template_html: string;
}

export interface FilterState {
  search: string;
  domains: DomainSegment[];
  platforms: PlatformType[];
  pricing: PricingModel[];
  techStack: string[];
  sort: SortOption;
  layout: LayoutMode;
}
