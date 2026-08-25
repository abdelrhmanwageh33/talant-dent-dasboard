import React, { useEffect, useState } from 'react';
import { getCategories } from '@/services/categoryService';
import type { Category } from '@/lib/categoriesType';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ProductFilterProps {
  activeCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
}

export default function ProductFilter({ activeCategory, onSelectCategory }: ProductFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return <div className="text-sm text-red-600 mb-6 font-medium">{error}</div>;
  }

  return (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
      <span className="text-sm font-semibold text-slate-700 mr-2 shrink-0">Category:</span>
      
      {isLoading ? (
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Loading categories...</span>
        </div>
      ) : (
        <>
          <button
            onClick={() => onSelectCategory(null)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors shrink-0",
              activeCategory === null
                ? "bg-[#7a5af8] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => onSelectCategory(category.slug)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors shrink-0",
                activeCategory === category.slug
                  ? "bg-[#7a5af8] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {category.slug}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
