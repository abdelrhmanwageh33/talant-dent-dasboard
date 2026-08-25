import React from 'react';
import { mockBestSellers } from '@/lib/mock/dashboard';
import { ChevronRight } from 'lucide-react';

interface BestSellerItemProps {
  name: string;
  category: string;
  sold: number;
  image: string;
}

function BestSellerItem({ name, category, sold, image }: BestSellerItemProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0 last:pb-0">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-800">{name}</h4>
          <p className="text-xs text-slate-500">{category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-[#7a5af8]">{sold}</p>
        <p className="text-xs text-slate-500">Sold</p>
      </div>
    </div>
  );
}

export function BestSellers() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Best Sellers</h3>
        <button className="flex items-center text-sm font-medium text-[#7a5af8] hover:text-[#5c42cc] transition-colors">
          View all products
        </button>
      </div>

      <div className="flex flex-col">
        {mockBestSellers.map((product) => (
          <BestSellerItem key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
