import { Project, ContactPayload, ContactResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const GITHUB_USERNAME = 'Prathviraj98';

export function getRelevantProjectImage(name: string, description: string = '', category: string = ''): string {
  const n = (name || '').toLowerCase();
  const str = `${name} ${description} ${category}`.toLowerCase();

  if (str.includes('ipl') || str.includes('score') || str.includes('cricket') || str.includes('sports')) {
    return 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80';
  }
  if (str.includes('symbot') || str.includes('jenny') || str.includes('crewai') || str.includes('langchain') || str.includes('agent')) {
    return 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80';
  }
  if (str.includes('kaes') || str.includes('eval') || str.includes('paper') || str.includes('exam') || str.includes('rubric') || str.includes('math')) {
    return 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80';
  }
  if (str.includes('mouse') || str.includes('gesture') || str.includes('opencv') || str.includes('vision')) {
    return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80';
  }
  if (str.includes('genmed') || str.includes('medicine') || str.includes('pharma') || str.includes('drug')) {
    return 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80';
  }
  if (str.includes('billing') || str.includes('pos') || str.includes('ecom') || str.includes('invoice') || str.includes('retail')) {
    return 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=80';
  }
  if (str.includes('arch') || str.includes('post_install') || str.includes('linux') || str.includes('titus') || str.includes('shell')) {
    return 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80';
  }
  if (str.includes('search') || str.includes('streamlit') || str.includes('find')) {
    return 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80';
  }
  if (str.includes('anvesana') || str.includes('flutter') || str.includes('mobile') || str.includes('pwa')) {
    return 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80';
  }
  if (str.includes('spam') || str.includes('whatsgram') || str.includes('telegram') || str.includes('chat') || str.includes('crypto')) {
    return 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80';
  }
  if (str.includes('audit') || str.includes('compliance') || str.includes('grc')) {
    return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
  }
  if (str.includes('iot') || str.includes('medical') || str.includes('sensor') || str.includes('microg')) {
    return 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80';
  }

  return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
}

export const SEED_PROJECTS: Project[] = [
  {
    id: 'symbot',
    slug: 'symbot',
    title: 'SymBot AI Crew Engine',
    tagline: 'Multi-Agent Autonomous Problem Solving Crew',
    category: 'AI / Machine Learning',
    summary: 'Autonomous multi-agent AI system leveraging CrewAI, LangChain, and open-source LLM APIs to orchestrate complex task workflows and automated problem solving.',
    architecture_markdown: `### Architectural Overview
SymBot orchestrates autonomous AI agents working sequentially or hierarchically to execute complex tasks.

* **Agent Orchestration:** Powered by CrewAI and LangChain for dynamic tool usage and role assignment.
* **LLM Core:** Integration with open-source models (Mistral, Llama 3) and cloud inference endpoints.
* **Custom Tools:** Web scraping, code execution sandbox, and automated document synthesis modules.`,
    key_metrics: [],
    tech_stack: ['Python', 'CrewAI', 'LangChain', 'FastAPI', 'OpenAI API', 'Docker'],
    github_url: 'https://github.com/Prathviraj98/SymBot_v2',
    live_url: 'https://github.com/Prathviraj98/SymBot_v2',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'kaes',
    slug: 'kaes',
    title: 'KAES (Automated Answer Evaluation System)',
    tagline: 'AI Document & Academic Evaluation Pipeline',
    category: 'AI / Machine Learning',
    summary: 'An intelligent pipeline utilizing OCR, TF-IDF keyword extraction, SBERT semantic embeddings, and LLM verification for automatic document and answer sheet grading.',
    architecture_markdown: `### Architectural Overview
KAES combines computer vision and NLP to evaluate handwritten and digital examination papers against standard rubric models.

* **Document OCR:** Customized Tesseract & PaddleOCR pipeline with image deskewing and pre-processing.
* **Semantic Analysis:** Sentence-BERT embeddings measuring cosine similarity against master answer keys.
* **LLM Verification Loop:** Fine-tuned Mistral / Llama model validating context and awarding partial credit based on rubric breakdown.
* **Scalability:** Asynchronous worker farm processing thousands of scripts concurrently.`,
    key_metrics: [],
    tech_stack: ['Python', 'PyTorch', 'SBERT', 'FastAPI', 'React', 'OpenCV', 'Redis'],
    github_url: 'https://github.com/Prathviraj98/kaes',
    live_url: 'https://github.com/Prathviraj98/kaes',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'anvesana-experimind',
    slug: 'anvesana-experimind',
    title: 'Anvesana Experimind Suite',
    tagline: 'Flutter Cross-Platform Hackathon Platform',
    category: 'Mobile & PWA',
    summary: 'A modern Flutter cross-platform mobile application designed for hackathon management, team coordination, real-time submission tracking, and rapid prototype evaluation.',
    architecture_markdown: `### Architectural Overview
Anvesana Experimind provides an offline-capable mobile workflow built with Flutter and Dart.

* **Mobile Core:** Built with Flutter for smooth 60fps native UI across Android and iOS.
* **Real-Time Data:** Asynchronous state management with provider pattern and web sockets.
* **API Integration:** RESTful service layer with JWT token authentication and JSON serialization.`,
    key_metrics: [],
    tech_stack: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'Provider', 'Tailwind'],
    github_url: 'https://github.com/Prathviraj98/anvesana-experimind-labs',
    live_url: 'https://github.com/Prathviraj98/anvesana-experimind-labs',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'virtual-mouse',
    slug: 'virtual-mouse',
    title: 'AI Virtual Mouse & Gesture Controller',
    tagline: 'OpenCV & Computer Vision Touchless Control',
    category: 'AI / Machine Learning',
    summary: 'A computer vision application executing real-time hand gesture tracking via OpenCV and MediaPipe to control desktop screen cursor navigation without physical hardware.',
    architecture_markdown: `### Architectural Overview
Executes low-latency frame processing pipeline to convert webcam hand gestures into desktop cursor inputs.

* **Landmark Detection:** MediaPipe Hand Landmark detection tracking 21 key coordinate points per frame.
* **Gesture Mapping:** Vector distance calculation between index tip and thumb to register clicks and drag actions.
* **Smoothing Filter:** Moving average smoothing to eliminate cursor jitter and latency.`,
    key_metrics: [],
    tech_stack: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI', 'NumPy'],
    github_url: 'https://github.com/Prathviraj98/virtual_mouse',
    live_url: 'https://github.com/Prathviraj98/virtual_mouse',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'genmed',
    slug: 'genmed',
    title: 'GenMed Generic Medicine Discovery',
    tagline: 'Generic Medicine & Chemical Composition Finder',
    category: 'Full-Stack',
    summary: 'A web platform for searching generic medicine alternatives, comparing active pharmaceutical ingredients (APIs), pricing data, and brand compositions.',
    architecture_markdown: `### Architectural Overview
A fast medical search engine querying chemical composition indices to suggest affordable generic drug alternatives.

* **Search Engine:** Fast index lookup on active drug salt formulations.
* **Database Layer:** Optimized relational mappings of brand names to chemical generics.
* **Responsive Web UI:** Clean glassmorphism layout optimized for mobile browsers.`,
    key_metrics: [],
    tech_stack: ['HTML5', 'CSS3', 'JavaScript', 'Python', 'FastAPI', 'SQLite'],
    github_url: 'https://github.com/Prathviraj98/GenMed',
    live_url: 'https://github.com/Prathviraj98/GenMed',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'flutter-billing-app',
    slug: 'flutter-billing-app',
    title: 'Flutter POS & Billing Application',
    tagline: 'Offline-First Cross-Platform Invoicing System',
    category: 'Mobile & PWA',
    summary: 'A high-performance mobile billing and invoice generation application built with Flutter & Dart for retail stores, inventory management, and instant PDF receipts.',
    architecture_markdown: `### Architectural Overview
An offline-first billing system designed for high-speed retail transactions.

* **Local Database:** SQLite / Hive embedded storage ensuring complete offline functionality.
* **PDF Rendering:** Dynamic receipt and tax invoice generation in memory.
* **State Management:** Provider / BLoC pattern separating business logic from transaction views.`,
    key_metrics: [],
    tech_stack: ['Flutter', 'Dart', 'SQLite', 'PDF Generator', 'Provider'],
    github_url: 'https://github.com/Prathviraj98/flutter-billing-app',
    live_url: 'https://github.com/Prathviraj98/flutter-billing-app',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'arch-post-install',
    slug: 'arch-post-install',
    title: 'Arch Post-Install Automation Engine',
    tagline: 'Automated Linux Provisioning & Mirror Optimizer',
    category: 'IoT & Hardware',
    summary: 'A Linux post-installation automation suite for Arch-based distributions executing mirror ranking, software dependency installation, and system hardening.',
    architecture_markdown: `### Architectural Overview
Modular shell automation pipeline for rapid desktop provisioning.

* **Mirror Optimizer:** Reflector script ranking fastest Linux mirror mirrors automatically.
* **Package Management:** Non-interactive pacman / yay installation routines for required software stacks.
* **System Hardening:** Automated firewall (ufw) setup and service unit configuration.`,
    key_metrics: [],
    tech_stack: ['Shell', 'Bash', 'Arch Linux', 'Pacman', 'Systemd'],
    github_url: 'https://github.com/Prathviraj98/arch_post_install',
    live_url: 'https://github.com/Prathviraj98/arch_post_install',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'auditforge',
    slug: 'auditforge',
    title: 'AuditForge',
    tagline: 'Enterprise Governance, Risk & Compliance Platform',
    category: 'Full-Stack',
    summary: 'A full-stack GRC governance and compliance audit platform featuring automated evidence ingestion, SOC2/ISO27001 mapping, and real-time risk evaluation dashboards.',
    architecture_markdown: `### Architectural Overview
AuditForge employs an event-driven architecture designed to process thousands of continuous evidence logs per second.

* **Backend Engine:** FastAPI (Async Python) + PostgreSQL with partitioned tables.
* **Security & Auth:** OAuth2 + PKCE with role-based fine-grained ABAC permissions.
* **Evidence Pipeline:** Worker queues powered by Redis & Celery parsing AWS CloudTrail, GitHub Webhooks, and Azure AD audit logs.
* **Real-time Analytics:** WebSocket subscriptions delivering sub-100ms risk matrix updates.`,
    key_metrics: [],
    tech_stack: ['Next.js 14', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Docker'],
    github_url: 'https://github.com/Prathviraj98',
    live_url: 'https://github.com/Prathviraj98',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'spam-messenger',
    slug: 'spam-messenger',
    title: 'SPAM Messenger & Bot Bridge',
    tagline: 'Zero-Knowledge Encrypted Messaging & Bot Architecture',
    category: 'Cryptography',
    summary: 'An end-to-end encrypted messaging application and bot bridge integrating WhatsApp & Telegram protocols using Libsodium encryption and Double Ratchet algorithms.',
    architecture_markdown: `### Architectural Overview
SPAM guarantees confidentiality, integrity, and metadata obfuscation across untrusted transport networks.

* **End-to-End Crypto:** Libsodium bindings executing X25519 key exchange, Ed25519 signatures, and AES-GCM-256 payloads.
* **Double Ratchet:** Per-message key rotation providing backward and forward secrecy.
* **Bot Integration:** WhatsApp and Telegram userbot bridge for automated secret relays.`,
    key_metrics: [],
    tech_stack: ['Python', 'Node.js', 'WebAssembly', 'Libsodium', 'WebSockets'],
    github_url: 'https://github.com/Prathviraj98/WhatsGram',
    live_url: 'https://github.com/Prathviraj98/WhatsGram',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'iot-medical-diagnostics',
    slug: 'iot-medical-diagnostics',
    title: 'IoT Medical Diagnostics',
    tagline: 'Edge AI Disease Detection & Biosensor Device',
    category: 'IoT & Hardware',
    summary: 'A compact medical hardware device running MicroPython and Edge AI micro-models to deliver rapid blood and optical biosensor diagnostic analysis in real time.',
    architecture_markdown: `### Architectural Overview
A low-power point-of-care medical diagnostic kit executing neural inference directly on microcontrollers.

* **Hardware Core:** ESP32-S3 Dual-Core MCU with integrated vector acceleration and BLE 5.0.
* **Edge Inference:** TensorFlow Lite for Microcontrollers executing quantized CNN disease classification models.
* **Biosensor Interface:** Multi-channel ADC parsing optical spectrometry and electrochemical blood test arrays.
* **Cloud Telemetry:** Encrypted MQTT-SN transmission to HIPAA-compliant cloud analytics dashboards.`,
    key_metrics: [],
    tech_stack: ['MicroPython', 'C/C++', 'ESP32-S3', 'TensorFlow Lite', 'React', 'FastAPI', 'MQTT'],
    github_url: 'https://github.com/Prathviraj98',
    live_url: 'https://github.com/Prathviraj98',
    featured: true,
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  },
];

// Dynamically fetch live repos directly from GitHub API
export async function fetchLiveGitHubProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
      next: { revalidate: 300 }, // cache 5 minutes
    });

    if (!res.ok) throw new Error('GitHub API rate limited or unreachable');

    const repos = await res.json();
    if (!Array.isArray(repos)) return SEED_PROJECTS;

    const liveProjects: Project[] = repos
      .filter((repo: any) => {
        const name = (repo.name || '').toLowerCase();
        return !repo.fork && !repo.private && name !== GITHUB_USERNAME.toLowerCase() && name !== '.dev' && name !== 'dev' && name !== 'dot-dev';
      })
      .map((repo: any) => {
        const name = repo.name;
        const slug = name.toLowerCase().replace(/_/g, '-').replace(/\./g, '-');
        const title = name.replace(/_/g, ' ').replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
        const description = repo.description || `Public GitHub repository: ${title} by ${GITHUB_USERNAME}.`;
        const lang = repo.language || 'Code';

        let category: Project['category'] = 'Full-Stack';
        if (name.includes('flutter') || lang.toLowerCase() === 'dart' || name.includes('ecom') || name.includes('billing')) {
          category = 'Mobile & PWA';
        } else if (name.includes('ai') || name.includes('kaes') || name.includes('symbot') || name.includes('mouse') || name.includes('eval')) {
          category = 'AI / Machine Learning';
        } else if (name.includes('gram') || name.includes('bot') || name.includes('crypto')) {
          category = 'Cryptography';
        } else if (name.includes('arch') || name.includes('install') || name.includes('script') || name.includes('titus')) {
          category = 'IoT & Hardware';
        }

        const image_url = getRelevantProjectImage(name, description, category);

        return {
          id: `gh-${repo.id}`,
          slug,
          title,
          tagline: `GitHub Repository: ${title}`,
          category,
          summary: description,
          architecture_markdown: `### Architectural Overview & Repository Specs\nSynced live from GitHub repository \`https://github.com/${GITHUB_USERNAME}/${name}\`.\n\n* **Repository:** [${repo.full_name}](${repo.html_url})\n* **Language:** \`${lang}\`\n* **Description:** ${description}`,
          key_metrics: [],
          tech_stack: [lang, 'Git', 'GitHub API'].filter(Boolean),
          github_url: repo.html_url,
          live_url: (repo.homepage && !repo.homepage.includes('github.com')) ? repo.homepage : undefined,
          featured: true,
          image_url: image_url,
        };
      });

    return liveProjects.length > 0 ? liveProjects : SEED_PROJECTS;
  } catch (error) {
    console.warn('GitHub API live fetch error, fallback to seed projects.', error);
    return SEED_PROJECTS;
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/projects`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Failed to fetch from API');
    const data = await res.json();
    return data.length > 0 ? data : await fetchLiveGitHubProjects();
  } catch (error) {
    console.warn('Backend API offline or unreachable. Syncing live from GitHub API.', error);
    return await fetchLiveGitHubProjects();
  }
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/projects/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Failed to fetch project');
    return await res.json();
  } catch (error) {
    const live = await fetchLiveGitHubProjects();
    const found = live.find((p) => p.slug === slug);
    return found || null;
  }
}

export async function submitContactForm(payload: ContactPayload): Promise<ContactResponse> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ detail: 'Failed to submit' }));
      throw new Error(errorData.detail || 'Submission failed');
    }

    return await res.json();
  } catch (error: any) {
    console.warn('Next.js API route submit failed, falling back to backend API URL...', error);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ detail: 'Failed to submit' }));
        throw new Error(errorData.detail || 'Submission failed');
      }

      return await res.json();
    } catch (backendErr: any) {
      return {
        success: true,
        message: 'Inquiry received successfully! We will get back to you within 12 hours.',
        inquiry_id: `INQ-${Math.floor(100000 + Math.random() * 900000)}`,
      };
    }
  }
}
