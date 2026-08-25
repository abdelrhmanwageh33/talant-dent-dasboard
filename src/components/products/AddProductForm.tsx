import React, { useState, useEffect } from 'react';
import type { CreateProductPayload } from '@/services/productService';
import { getCategories } from '@/services/categoryService';
import type { Category } from '@/lib/categoriesType';
import { Loader2 } from 'lucide-react';

interface AddProductFormProps {
  onSubmit: (data: CreateProductPayload) => Promise<void>;
}

export default function AddProductForm({ onSubmit }: AddProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('0');
  const [stock, setStock] = useState('0');
  const [brand, setBrand] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [featured, setFeatured] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(true);
  const [active, setActive] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsCategoriesLoading(true);
        const data = await getCategories();
        setCategories(data);
        if (data.length > 0) {
          setCategoryId(data[0]._id);
        }
      } catch (err) {
        console.error('Failed to load categories', err);
      } finally {
        setIsCategoriesLoading(false);
      }
    }
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim()) return setError('Name is required');
    if (!categoryId) return setError('Category is required');

    const parsedPrice = parseFloat(price);
    const parsedDiscount = parseFloat(discount);
    const parsedStock = parseInt(stock, 10);

    if (isNaN(parsedPrice) || parsedPrice < 0) return setError('Price must be a valid positive number');
    if (isNaN(parsedDiscount) || parsedDiscount < 0 || parsedDiscount > 100) return setError('Discount must be between 0 and 100');
    if (isNaN(parsedStock) || parsedStock < 0) return setError('Stock must be a valid positive integer');

    try {
      setIsLoading(true);
      setError(null);
      await onSubmit({
        name,
        description,
        image,
        price: parsedPrice,
        discount: parsedDiscount,
        stock: parsedStock,
        brand,
        category: categoryId,
        featured,
        isBestSeller,
        isNewArrival,
        active,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7a5af8]/50 focus:border-[#7a5af8]"
            required
          />
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Brand</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7a5af8]/50 focus:border-[#7a5af8]"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7a5af8]/50 focus:border-[#7a5af8] resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Category *</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7a5af8]/50 focus:border-[#7a5af8] bg-white disabled:bg-slate-50"
            required
            disabled={isCategoriesLoading}
          >
            <option value="" disabled>Select a category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.slug}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Image URL</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7a5af8]/50 focus:border-[#7a5af8]"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Price *</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7a5af8]/50 focus:border-[#7a5af8]"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Discount %</label>
          <input
            type="number"
            step="0.1"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7a5af8]/50 focus:border-[#7a5af8]"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Stock *</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7a5af8]/50 focus:border-[#7a5af8]"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 text-[#7a5af8] rounded border-slate-300 focus:ring-[#7a5af8]"
          />
          <span className="text-sm font-medium text-slate-700">Featured</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isBestSeller}
            onChange={(e) => setIsBestSeller(e.target.checked)}
            className="w-4 h-4 text-[#7a5af8] rounded border-slate-300 focus:ring-[#7a5af8]"
          />
          <span className="text-sm font-medium text-slate-700">Best Seller</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isNewArrival}
            onChange={(e) => setIsNewArrival(e.target.checked)}
            className="w-4 h-4 text-[#7a5af8] rounded border-slate-300 focus:ring-[#7a5af8]"
          />
          <span className="text-sm font-medium text-slate-700">New Arrival</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="w-4 h-4 text-[#7a5af8] rounded border-slate-300 focus:ring-[#7a5af8]"
          />
          <span className="text-sm font-medium text-slate-700">Active</span>
        </label>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-6 py-2 bg-[#7a5af8] text-white rounded-lg font-medium hover:bg-[#694ace] transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isLoading ? 'Adding...' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}
