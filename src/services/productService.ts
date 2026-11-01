import type { Products } from '@/lib/productType';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getProducts(): Promise<Products> {
  const response = await fetch(`${API_BASE_URL}/products`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  
  const data: Products = await response.json();
  return data;
}

export async function searchProducts(keyword: string): Promise<Products> {
  const response = await fetch(`${API_BASE_URL}/products/search?keyword=${encodeURIComponent(keyword)}`);
  
  if (!response.ok) {
    throw new Error(`Failed to search products: ${response.statusText}`);
  }
  
  const data: Products = await response.json();
  return data;
}

export async function getProductsByCategory(slug: string): Promise<Products> {
  const response = await fetch(`${API_BASE_URL}/products/category/${encodeURIComponent(slug)}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products for category: ${response.statusText}`);
  }
  
  const data: Products = await response.json();
  return data;
}

export interface UpdateProductPayload {
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  discount?: number;
  stock?: number;
  brand?: string;
  category?: string;
  featured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  active?: boolean;
}

export async function updateProduct(id: string, data: UpdateProductPayload): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to update product: ${response.statusText}`);
  }
}


export interface CreateProductPayload {
  name: string;
  description: string;
  image: string;
  price: number;
  discount: number;
  stock: number;
  brand: string;
  category: string;
  featured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  active: boolean;
}

export async function createProduct(data: CreateProductPayload): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to create product: ${response.statusText}`);
  }
}
