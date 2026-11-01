import { getCategories } from '@/services/categoryService';
import type { Category } from '@/lib/categoriesType';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface ProductFilterProps {
  activeCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
}

export default function ProductFilter({
  activeCategory,
  onSelectCategory,
}: ProductFilterProps) {
  const fetchCategories = async (): Promise<Category[]> => {
    const data = await getCategories();
    return data;
  };

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
  });

  return (
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">
          Filter by category
        </h3>

        <p className="text-xs text-slate-500">
          Choose a category to filter products
        </p>
      </div>

      <div className="w-full sm:w-56">
        {isLoading ? (
          <div className="flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
            <Loader2 className="h-4 w-4 animate-spin text-[#7a5af8]" />
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            Failed to load categories
          </div>
        ) : (
          <select
            value={activeCategory ?? ''}
            onChange={(e) =>
              onSelectCategory(e.target.value || null)
            }
            className={cn(
              'h-10 w-full rounded-xl border border-slate-200',
              'bg-white px-3 text-sm text-slate-700',
              'outline-none transition-all',
              'focus:border-[#7a5af8] focus:ring-2 focus:ring-[#7a5af8]/10',
              'cursor-pointer'
            )}
          >
            <option value="">All Products</option>

            {categories?.map((category) => (
              <option key={category._id} value={category.slug}>
                {category.slug}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}