import React from 'react';

interface ProductsHeaderProps {
  onAddClick: () => void;
}

export default function ProductsHeader({ onAddClick }: ProductsHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Products</h1>
        <p className="text-slate-500">Manage your product catalog</p>
      </div>
      <button 
        onClick={onAddClick}
        className="px-4 py-2 bg-[#7a5af8] text-white rounded-lg font-medium hover:bg-[#694ace] transition-colors"
      >
        Add Product
      </button>
    </div>
  );
}
