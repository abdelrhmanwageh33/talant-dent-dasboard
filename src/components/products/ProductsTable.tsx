import ProductActions from './ProductActions';
import type { Product } from '@/lib/productType';
import { MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductsTableProps {
  products: Product[];
  onRefresh: () => void;
}

export default function ProductsTable({ products, onRefresh }: ProductsTableProps) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm">
        <p className="text-slate-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-slate-500 font-medium border-b border-slate-100 bg-slate-50/50">
            <tr>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Stock</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-700">{product.name}</p>
                      <p className="text-xs text-slate-500">{product.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {product.category?.name || 'Uncategorized'}
                </td>
                <td className="px-6 py-4 font-medium text-slate-700">
                  {product.price} EGP
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {product.stock}
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold",
                    product.active 
                      ? "bg-emerald-100 text-emerald-600" 
                      : "bg-slate-100 text-slate-600"
                  )}>
                    {product.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <ProductActions product={product} onUpdated={onRefresh} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
