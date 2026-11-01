import React, { useEffect, useState, useCallback } from 'react';
import { getProducts, getProductsByCategory } from '@/services/productService';
import type { Product } from '@/lib/productType';
import ProductsHeader from '@/components/products/ProductsHeader';
import ProductsTable from '@/components/products/ProductsTable';
import ProductSearch from '@/components/products/ProductSearch';
import ProductFilter from '@/components/products/ProductFilter';
import AddProductDialog from '@/components/products/AddProductDialog';
import { Loader2 } from 'lucide-react';
import { useQueries, useQuery } from '@tanstack/react-query';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchProducts = (async ():Promise<Product[]> => {
    
      const data = activeCategory 
        ? await getProductsByCategory(activeCategory)
        : await getProducts();

        return data?.products ??[]
    
  });
const {data,isLoading,isError,refetch}=useQuery({
  queryKey:["products",activeCategory],
  queryFn:fetchProducts
})
 

  return (
    <div>
      <ProductsHeader onAddClick={() => setIsAddModalOpen(true)} />
      
      <div className="mb-6">
        <ProductSearch />
      </div>

      <ProductFilter 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory} 
      />
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <Loader2 className="w-8 h-8 text-[#7a5af8] animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Loading products...</p>
        </div>
      ) : isError ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center">
          <p className="mb-4 font-medium">{isError}</p>
          <button 
            onClick={()=>refetch}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
          > 
            Retry
          </button>
        </div>
      ) : (
        <ProductsTable products={data??[]} onRefresh={fetchProducts} />
      )}

      <AddProductDialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchProducts}
      />
    </div>
  );
}
