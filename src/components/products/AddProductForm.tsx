import { useState, useEffect, useRef } from 'react';
import { Loader2, UploadCloud, X, ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  createProduct,
  type CreateProductPayload,
} from '@/services/productService';

import { getCategories } from '@/services/categoryService';
import { uploadImageToCloudinary } from '@/services/cloudinaryService';

// =========================
// Validation Schema
// =========================

const productSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters'),

  brand: z.string().optional(),

  description: z.string().optional(),

  categoryId: z
    .string()
    .min(1, 'Category is required'),

  price: z
    .number('Price must be a number')
    .positive('Price must be greater than 0'),

  discount: z
    .number('Discount must be a number')
    .min(0, 'Discount cannot be negative')
    .max(100, 'Discount cannot be greater than 100'),

  stock: z
    .number('Stock must be a number')
    .int('Stock must be a whole number')
    .min(0, 'Stock cannot be negative'),

  featured: z.boolean(),

  isBestSeller: z.boolean(),

  isNewArrival: z.boolean(),

  active: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface AddProductFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

// =========================
// Component
// =========================

export default function AddProductForm({ onSuccess, onClose }: AddProductFormProps) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Image Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [customError, setCustomError] = useState<string | null>(null);

  // Cleanup object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // =========================
  // Categories Query
  // =========================

  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10,
  });

  // =========================
  // Create Product Mutation
  // =========================

  const {
    mutateAsync,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      reset();
      clearSelectedFile();
      onSuccess?.();
      onClose?.();
    },
  });

  // =========================
  // React Hook Form
  // =========================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      brand: '',
      description: '',
      categoryId: '',
      price: 0,
      discount: 0,
      stock: 0,
      featured: false,
      isBestSeller: false,
      isNewArrival: false,
      active: true,
    },
  });

  // =========================
  // File Handlers
  // =========================

  const handleFileSelect = (file: File) => {
    setCustomError(null);

    // Validate type
    if (!file.type.startsWith('image/')) {
      setCustomError('Please select a valid image file (PNG, JPG, WEBP, etc.)');
      return;
    }

    // Validate size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setCustomError('Image size exceeds 5MB limit.');
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearSelectedFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // =========================
  // Submit
  // =========================

  const onFormSubmit = async (data: ProductFormData) => {
    setCustomError(null);
    let uploadedImageUrl = '';

    try {
      if (selectedFile) {
        setIsUploadingImage(true);
        uploadedImageUrl = await uploadImageToCloudinary(selectedFile);
      }

      const productPayload: CreateProductPayload = {
        name: data.name,
        description: data.description ?? '',
        image: uploadedImageUrl,
        price: data.price,
        discount: data.discount,
        stock: data.stock,
        brand: data.brand ?? '',
        category: data.categoryId,
        featured: data.featured,
        isBestSeller: data.isBestSeller,
        isNewArrival: data.isNewArrival,
        active: data.active,
      };

      await mutateAsync(productPayload);
    } catch (err) {
      setCustomError(
        err instanceof Error ? err.message : 'An error occurred while creating product'
      );
    } finally {
      setIsUploadingImage(false);
    }
  };

  const isSubmitting = isPending || isUploadingImage;

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {/* =========================
          API / Upload Error
      ========================= */}
      {(isError || customError) && (
        <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
          {customError || (error instanceof Error ? error.message : 'Failed to create product')}
        </div>
      )}

      {/* =========================
          Name + Brand
      ========================= */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Name *
          </label>
          <input
            type="text"
            {...register('name')}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#7a5af8] focus:outline-none focus:ring-2 focus:ring-[#7a5af8]/50"
            placeholder="Product name"
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Brand
          </label>
          <input
            type="text"
            {...register('brand')}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#7a5af8] focus:outline-none focus:ring-2 focus:ring-[#7a5af8]/50"
            placeholder="e.g. 3M, Dentsply"
          />
          {errors.brand && (
            <p className="text-xs text-red-500">{errors.brand.message}</p>
          )}
        </div>
      </div>

      {/* =========================
          Category
      ========================= */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">
          Category *
        </label>
        <select
          {...register('categoryId')}
          disabled={isCategoriesLoading || isCategoriesError}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#7a5af8] focus:outline-none focus:ring-2 focus:ring-[#7a5af8]/50 disabled:bg-slate-50"
        >
          <option value="">
            {isCategoriesLoading
              ? 'Loading categories...'
              : 'Select a category'}
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name || category.slug}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-xs text-red-500">{errors.categoryId.message}</p>
        )}
      </div>

      {/* =========================
          Image Upload (Cloudinary)
      ========================= */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">
          Product Image
        </label>

        {previewUrl ? (
          <div className="relative flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-3">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <img
                src={previewUrl}
                alt="Product preview"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-700">
                {selectedFile?.name}
              </p>
              <p className="text-xs text-slate-500">
                {selectedFile ? (selectedFile.size / 1024).toFixed(1) + ' KB' : ''}
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isSubmitting}
                className="mt-1 text-xs font-semibold text-[#7a5af8] hover:underline"
              >
                Change image
              </button>
            </div>
            <button
              type="button"
              onClick={clearSelectedFile}
              disabled={isSubmitting}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              title="Remove image"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files?.[0];
              if (file) handleFileSelect(file);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all ${
              isDragging
                ? 'border-[#7a5af8] bg-[#7a5af8]/5'
                : 'border-slate-200 bg-slate-50/50 hover:border-[#7a5af8] hover:bg-slate-50'
            }`}
          >
            <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-[#7a5af8]/10 text-[#7a5af8]">
              <UploadCloud size={22} />
            </div>
            <p className="text-sm font-medium text-slate-700">
              Click to upload or drag & drop
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              PNG, JPG, WEBP (Max 5MB)
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
        />
      </div>

      {/* =========================
          Description
      ========================= */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#7a5af8] focus:outline-none focus:ring-2 focus:ring-[#7a5af8]/50"
          placeholder="Product details and specifications..."
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* =========================
          Price + Discount + Stock
      ========================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Price */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Price (EGP) *
          </label>
          <input
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#7a5af8] focus:outline-none focus:ring-2 focus:ring-[#7a5af8]/50"
          />
          {errors.price && (
            <p className="text-xs text-red-500">{errors.price.message}</p>
          )}
        </div>

        {/* Discount */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Discount %
          </label>
          <input
            type="number"
            step="0.1"
            {...register('discount', { valueAsNumber: true })}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#7a5af8] focus:outline-none focus:ring-2 focus:ring-[#7a5af8]/50"
          />
          {errors.discount && (
            <p className="text-xs text-red-500">{errors.discount.message}</p>
          )}
        </div>

        {/* Stock */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Stock *
          </label>
          <input
            type="number"
            {...register('stock', { valueAsNumber: true })}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#7a5af8] focus:outline-none focus:ring-2 focus:ring-[#7a5af8]/50"
          />
          {errors.stock && (
            <p className="text-xs text-red-500">{errors.stock.message}</p>
          )}
        </div>
      </div>

      {/* =========================
          Checkboxes
      ========================= */}
      <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            {...register('featured')}
            className="h-4 w-4 rounded border-slate-300 text-[#7a5af8] focus:ring-[#7a5af8]"
          />
          <span className="text-sm font-medium text-slate-700">Featured</span>
        </label>

        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            {...register('isBestSeller')}
            className="h-4 w-4 rounded border-slate-300 text-[#7a5af8] focus:ring-[#7a5af8]"
          />
          <span className="text-sm font-medium text-slate-700">Best Seller</span>
        </label>

        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            {...register('isNewArrival')}
            className="h-4 w-4 rounded border-slate-300 text-[#7a5af8] focus:ring-[#7a5af8]"
          />
          <span className="text-sm font-medium text-slate-700">New Arrival</span>
        </label>

        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            {...register('active')}
            className="h-4 w-4 rounded border-slate-300 text-[#7a5af8] focus:ring-[#7a5af8]"
          />
          <span className="text-sm font-medium text-slate-700">Active</span>
        </label>
      </div>

      {/* =========================
          Submit
      ========================= */}
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#7a5af8] px-6 py-2 font-medium text-white transition-colors hover:bg-[#694ace] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isUploadingImage
            ? 'Uploading image...'
            : isPending
            ? 'Adding product...'
            : 'Add Product'}
        </button>
      </div>
    </form>
  );
}
