'use client';

import { CatalogItem } from '@/types/catalog';
import CatalogItemCard from './CatalogItemCard';

interface CatalogMasonryViewProps {
  items: CatalogItem[];
  onPreview: (item: CatalogItem) => void;
  onCustomize: (item: CatalogItem) => void;
}

export default function CatalogMasonryView({
  items,
  onPreview,
  onCustomize,
}: CatalogMasonryViewProps) {
  // Distribute items across 3 columns for staggered masonry layout
  const col1: CatalogItem[] = [];
  const col2: CatalogItem[] = [];
  const col3: CatalogItem[] = [];

  items.forEach((item, idx) => {
    if (idx % 3 === 0) col1.push(item);
    else if (idx % 3 === 1) col2.push(item);
    else col3.push(item);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
      <div className="space-y-4 sm:space-y-6">
        {col1.map((item) => (
          <CatalogItemCard
            key={item.id}
            item={item}
            onPreview={onPreview}
            onCustomize={onCustomize}
          />
        ))}
      </div>

      <div className="space-y-4 sm:space-y-6">
        {col2.map((item) => (
          <CatalogItemCard
            key={item.id}
            item={item}
            onPreview={onPreview}
            onCustomize={onCustomize}
          />
        ))}
      </div>

      <div className="space-y-4 sm:space-y-6 hidden lg:block">
        {col3.map((item) => (
          <CatalogItemCard
            key={item.id}
            item={item}
            onPreview={onPreview}
            onCustomize={onCustomize}
          />
        ))}
      </div>
    </div>
  );
}
