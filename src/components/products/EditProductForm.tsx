import React, { useState } from 'react';
import type { Product } from '@/lib/productType';
import type { UpdateProductPayload } from '@/services/productService';
import { Loader2 } from 'lucide-react';

interface EditProductFormProps {
  product: Product;
  onSubmit: (data: UpdateProductPayload) => Promise<void>;
}

export default function EditProductForm({ product, onSubmit }: EditProductFormProps) {
  const [price, setPrice] = useState(product.price.toString());
  const [discount, setDiscount] = useState((product.discount || 0).toString());
  const [stock, setStock] = useState(product.stock.toString());
  const [isBestSeller, setIsBestSeller] = useState(product.isBestSeller);
  const [isNewArrival, setIsNewArrival] = useState(product.isNewArrival);
  const [active, setActive] = useState(product.active);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const parsedPrice = parseFloat(price);
    const parsedDiscount = parseFloat(discount);
    const parsedStock = parseInt(stock, 10);

    if (isNaN(parsedPrice) || parsedPrice < 0) {
      setError('Price must be a valid positive number');
      return;
    }
    if (isNaN(parsedDiscount) || parsedDiscount < 0 || parsedDiscount > 100) {
      setError('Discount must be a valid number between 0 and 100');
      return;
    }
    if (isNaN(parsedStock) || parsedStock < 0) {
      setError('Stock must be a valid positive integer');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await onSubmit({
        price: parsedPrice,
        discount: parsedDiscount,
        stock: parsedStock,
        isBestSeller,
        isNewArrival,
        active,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product.');
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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Price (EGP)</label>
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
          <label className="text-sm font-medium text-slate-700">Discount (%)</label>
          <input
            type="number"
            step="0.1"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7a5af8]/50 focus:border-[#7a5af8]"
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">Stock</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7a5af8]/50 focus:border-[#7a5af8]"
          required
        />
      </div>

      <div className="space-y-3 pt-2">
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
          {isLoading ? 'Updating...' : 'Update Product'}
        </button>
      </div>
    </form>
  );
}
