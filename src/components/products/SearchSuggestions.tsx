import React from 'react';
import type { Product } from '@/lib/productType';
import { Loader2 } from 'lucide-react';

interface SearchSuggestionsProps {
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  results: Product[];
  onSelect: (product: Product) => void;
}

export default function SearchSuggestions({
  isOpen,
  isLoading,
  error,
  results,
  onSelect,
}: SearchSuggestionsProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50 max-h-80 overflow-y-auto">
      {isLoading ? (
        <div className="flex items-center justify-center p-6 text-slate-500">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          <span className="text-sm font-medium">Searching...</span>
        </div>
      ) : error ? (
        <div className="p-4 text-sm text-red-600 font-medium text-center bg-red-50">
          {error}
        </div>
      ) : results.length === 0 ? (
        <div className="p-6 text-sm text-slate-500 text-center">
          No products found.
        </div>
      ) : (
        <ul className="py-2">
          {results.map((product) => (
            <li key={product._id}>
              <button
                className="w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors flex items-center gap-3"
                onClick={() => onSelect(product)}
              >
                <div className="w-8 h-8 rounded-md bg-slate-100 overflow-hidden flex-shrink-0">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-200" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-700">{product.name}</div>
                  <div className="text-xs text-slate-500">{product.category?.name || 'Uncategorized'}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
