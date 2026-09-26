'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import {
  DomainSegment,
  PlatformType,
  PricingModel,
  SortOption,
  LayoutMode,
  FilterState,
  CustomizerConfig,
} from '@/types/catalog';

export function useCatalogUrlState() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // 1. Read Filter State from URL
  const filters: FilterState = useMemo(() => {
    const search = searchParams.get('q') || '';
    const domains = (searchParams.get('domain')?.split(',').filter(Boolean) || []) as DomainSegment[];
    const platforms = (searchParams.get('platform')?.split(',').filter(Boolean) || []) as PlatformType[];
    const pricing = (searchParams.get('price')?.split(',').filter(Boolean) || []) as PricingModel[];
    const techStack = searchParams.get('tech')?.split(',').filter(Boolean) || [];
    const sort = (searchParams.get('sort') || 'popular') as SortOption;
    const layout = (searchParams.get('view') || 'grid') as LayoutMode;

    return {
      search,
      domains,
      platforms,
      pricing,
      techStack,
      sort,
      layout,
    };
  }, [searchParams]);

  // 2. Active Preview Modal Item ID
  const activeItemId = searchParams.get('preview') || null;

  // 3. Customizer Config Overrides from URL
  const urlCustomizerConfig: Partial<CustomizerConfig> = useMemo(() => {
    const theme = searchParams.get('c_theme') as CustomizerConfig['theme'] | null;
    const color = searchParams.get('c_color');
    const font = searchParams.get('c_font') as CustomizerConfig['fontFamily'] | null;
    const radius = searchParams.get('c_radius') as CustomizerConfig['borderRadius'] | null;

    return {
      ...(theme && { theme }),
      ...(color && { primaryColor: `#${color}` }),
      ...(font && { fontFamily: font }),
      ...(radius && { borderRadius: radius }),
    };
  }, [searchParams]);

  // 4. Update URL Search Params helper
  const updateUrl = useCallback(
    (newParams: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      const queryString = params.toString();
      const newPath = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(newPath, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  // Filter Updater Handlers
  const setSearch = useCallback((q: string) => updateUrl({ q: q || null }), [updateUrl]);

  const toggleDomain = useCallback(
    (domain: DomainSegment) => {
      const current = new Set(filters.domains);
      if (current.has(domain)) current.delete(domain);
      else current.add(domain);
      const val = Array.from(current).join(',');
      updateUrl({ domain: val || null });
    },
    [filters.domains, updateUrl]
  );

  const togglePlatform = useCallback(
    (platform: PlatformType) => {
      const current = new Set(filters.platforms);
      if (current.has(platform)) current.delete(platform);
      else current.add(platform);
      const val = Array.from(current).join(',');
      updateUrl({ platform: val || null });
    },
    [filters.platforms, updateUrl]
  );

  const togglePricing = useCallback(
    (price: PricingModel) => {
      const current = new Set(filters.pricing);
      if (current.has(price)) current.delete(price);
      else current.add(price);
      const val = Array.from(current).join(',');
      updateUrl({ price: val || null });
    },
    [filters.pricing, updateUrl]
  );

  const toggleTech = useCallback(
    (tech: string) => {
      const current = new Set(filters.techStack);
      if (current.has(tech)) current.delete(tech);
      else current.add(tech);
      const val = Array.from(current).join(',');
      updateUrl({ tech: val || null });
    },
    [filters.techStack, updateUrl]
  );

  const setSort = useCallback((sort: SortOption) => updateUrl({ sort }), [updateUrl]);

  const setLayout = useCallback((view: LayoutMode) => updateUrl({ view }), [updateUrl]);

  const setActiveItem = useCallback(
    (itemId: string | null) => updateUrl({ preview: itemId }),
    [updateUrl]
  );

  const resetFilters = useCallback(() => {
    updateUrl({
      q: null,
      domain: null,
      platform: null,
      price: null,
      tech: null,
      sort: null,
      preview: null,
    });
  }, [updateUrl]);

  return {
    filters,
    activeItemId,
    urlCustomizerConfig,
    setSearch,
    toggleDomain,
    togglePlatform,
    togglePricing,
    toggleTech,
    setSort,
    setLayout,
    setActiveItem,
    resetFilters,
    updateUrl,
  };
}
