import React, { useEffect, useRef } from 'react';
import AddProductForm from './AddProductForm';
import { X } from 'lucide-react';

interface AddProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddProductDialog({ isOpen, onClose, onSuccess }: AddProductDialogProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        ref={modalRef}
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            Add New Product
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors rounded-full p-1 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          <AddProductForm onSuccess={onSuccess} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
