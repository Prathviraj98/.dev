import { CustomizerConfig } from '@/types/catalog';

export function getThemeStyles(theme: CustomizerConfig['theme'], customHex?: string) {
  switch (theme) {
    case 'light':
      return {
        bg: '#f8fafc',
        surface: '#ffffff',
        text: '#0f172a',
        muted: '#64748b',
        primary: customHex || '#3b82f6',
        border: 'rgba(0,0,0,0.1)',
      };
    case 'emerald':
      return {
        bg: '#022c22',
        surface: '#064e3b',
        text: '#ecfdf5',
        muted: '#6ee7b7',
        primary: customHex || '#10b981',
        border: 'rgba(16,185,129,0.3)',
      };
    case 'amber':
      return {
        bg: '#1c1917',
        surface: '#292524',
        text: '#fef3c7',
        muted: '#fde68a',
        primary: customHex || '#f59e0b',
        border: 'rgba(245,158,11,0.3)',
      };
    case 'cyberpunk':
      return {
        bg: '#180226',
        surface: '#2e0854',
        text: '#fdf2f8',
        muted: '#f472b6',
        primary: customHex || '#ec4899',
        border: 'rgba(236,72,153,0.3)',
      };
    case 'midnight':
      return {
        bg: '#030712',
        surface: '#0b1329',
        text: '#f1f5f9',
        muted: '#94a3b8',
        primary: customHex || '#06b6d4',
        border: 'rgba(6,182,212,0.3)',
      };
    case 'dark':
    default:
      return {
        bg: '#090d16',
        surface: '#111827',
        text: '#f8fafc',
        muted: '#94a3b8',
        primary: customHex || '#6366f1',
        border: 'rgba(255,255,255,0.12)',
      };
  }
}

export function getFontFamilyCss(fontFamily: CustomizerConfig['fontFamily']) {
  switch (fontFamily) {
    case 'Roboto':
      return "'Roboto', sans-serif";
    case 'Playfair Display':
      return "'Playfair Display', serif";
    case 'JetBrains Mono':
      return "'JetBrains Mono', monospace";
    case 'Inter':
    default:
      return "'Inter', system-ui, sans-serif";
  }
}

export function getBorderRadiusPx(borderRadius: CustomizerConfig['borderRadius']) {
  switch (borderRadius) {
    case 'none':
      return '0px';
    case 'pill':
      return '9999px';
    case 'rounded':
    default:
      return '12px';
  }
}

export function getSpacingPx(spacing: CustomizerConfig['spacing']) {
  switch (spacing) {
    case 'compact':
      return '12px';
    case 'spacious':
      return '32px';
    case 'normal':
    default:
      return '20px';
  }
}

export function generateTailwindConfig(config: CustomizerConfig): string {
  const styles = getThemeStyles(config.theme, config.primaryColor);
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '${styles.bg}',
        surface: '${styles.surface}',
        primary: '${styles.primary}',
        text: '${styles.text}',
      },
      fontFamily: {
        custom: ['${config.fontFamily}', 'sans-serif'],
      },
      borderRadius: {
        preset: '${getBorderRadiusPx(config.borderRadius)}',
      }
    }
  }
};`;
}

export function buildSandboxSrcDoc(
  templateHtml: string,
  config: CustomizerConfig,
  itemTitle: string,
  itemTagline: string
): string {
  const styles = getThemeStyles(config.theme, config.primaryColor);
  const fontFamilyCss = getFontFamilyCss(config.fontFamily);
  const borderRadiusPx = getBorderRadiusPx(config.borderRadius);
  const spacingPx = getSpacingPx(config.spacing);

  const headline = config.headlineOverride || itemTitle;
  const subheadline = config.subheadlineOverride || itemTagline;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${itemTitle} - Live Sandbox</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;700&family=Playfair+Display:ital,wght@0,600;1,400&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --color-bg: ${styles.bg};
      --color-surface: ${styles.surface};
      --color-primary: ${styles.primary};
      --color-text: ${styles.text};
      --color-muted: ${styles.muted};
      --color-border: ${styles.border};
      --border-radius: ${borderRadiusPx};
      --spacing-unit: ${spacingPx};
    }
    body {
      background-color: var(--color-bg);
      color: var(--color-text);
      font-family: ${fontFamilyCss};
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      transition: all 0.3s ease;
    }
    .custom-card {
      background-color: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      padding: var(--spacing-unit);
    }
    .custom-btn {
      background-color: var(--color-primary);
      color: #ffffff;
      border-radius: var(--border-radius);
      padding: 10px 20px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }
    .custom-btn:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
  </style>
</head>
<body class="min-h-screen p-6 flex flex-col justify-between">
  <div>
    <!-- Sandbox Dynamic Header -->
    <header class="flex items-center justify-between pb-6 mb-6 border-b" style="border-color: var(--color-border)">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-lg" style="background-color: var(--color-primary)">
          ${headline.charAt(0)}
        </div>
        <span class="font-extrabold text-lg tracking-tight">${headline}</span>
      </div>
      <div class="flex items-center space-x-3">
        <button class="custom-btn">Launch App</button>
      </div>
    </header>

    <!-- Interactive Hero Section -->
    <section class="my-8 text-center max-w-2xl mx-auto space-y-4">
      <span class="inline-block px-3 py-1 text-xs font-mono font-semibold rounded-full" style="background-color: rgba(99,102,241,0.15); color: var(--color-primary)">
        LIVE TEMPLATE PLAYGROUND
      </span>
      <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight" style="color: var(--color-text)">
        ${headline}
      </h1>
      <p class="text-sm sm:text-base leading-relaxed" style="color: var(--color-muted)">
        ${subheadline}
      </p>
    </section>

    <!-- Custom Content Sandbox Body -->
    <div class="max-w-4xl mx-auto my-6">
      ${templateHtml}
    </div>
  </div>

  <footer class="pt-6 border-t text-center text-xs font-mono" style="border-color: var(--color-border); color: var(--color-muted)">
    <span>Powered by .DEV Live Customizer Engine</span>
  </footer>
</body>
</html>`;
}
