export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'Full-Stack' | 'AI / Machine Learning' | 'Mobile & PWA' | 'Cryptography' | 'IoT & Hardware';
  summary: string;
  architecture_markdown: string;
  key_metrics: { label: string; value: string }[];
  tech_stack: string[];
  github_url?: string;
  live_url?: string;
  featured: boolean;
  image_url: string;
  created_at?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  project_scope: string;
  budget_range: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  inquiry_id?: string;
}

export interface SystemCapability {
  title: string;
  description: string;
  iconName: string;
  metrics: string;
  highlights: string[];
}
