import React, { useState, useRef, useEffect } from 'react';
import type { Product } from '@/lib/productType';
import { MoreVertical, Edit } from 'lucide-react';
import EditProductDialog from './EditProductDialog';

interface ProductActionsProps {
  product: Product;
  onUpdated: () => void;
}

export default function ProductActions({ product, onUpdated }: ProductActionsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const handleEditClick = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
      >
        <MoreVertical size={18} />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 z-10 mt-1 w-32 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              onClick={handleEditClick}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Edit size={16} className="text-slate-400" />
              Edit
            </button>
          </div>
        </div>
      )}

      <EditProductDialog
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={onUpdated}
      />
    </div>
  );
}
