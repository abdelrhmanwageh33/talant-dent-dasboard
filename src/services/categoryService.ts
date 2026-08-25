import type { Category } from '@/lib/categoriesType';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/categories`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }
  
  // Verify if the API returns an array or an object containing the array.
  // The user prompt indicated: "created in lib categoriesType.ts [ { ... } ]"
  // so we assume it returns the array directly.
  const data: Category[] = await response.json();
  return data;
}
