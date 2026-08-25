import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { searchProducts } from '@/services/productService';
import type { Product } from '@/lib/productType';
import SearchSuggestions from './SearchSuggestions';

export default function ProductSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce the query input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Fetch results when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const fetchSearch = async () => {
      setIsLoading(true);
      setError(null);
      setIsOpen(true);
      try {
        const data = await searchProducts(debouncedQuery);
        setResults(data.products || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to search products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearch();
  }, [debouncedQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (product: Product) => {
    setIsOpen(false);
    setQuery('');
    // Optionally handle selection here. Requirement: "Keep the selected product available to the Products page."
    // Actually, "For now, the main goal is only to implement the search and suggestion UI correctly."
    console.log('Selected product:', product);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (!val.trim()) {
      setIsOpen(false);
    }
  };

  const handleFocus = () => {
    if (query.trim()) {
      setIsOpen(true);
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7a5af8]/50 focus:border-[#7a5af8] transition-all placeholder:text-slate-400 text-slate-800"
        />
      </div>

      <SearchSuggestions
        isOpen={isOpen}
        isLoading={isLoading}
        error={error}
        results={results}
        onSelect={handleSelect}
      />
    </div>
  );
}
