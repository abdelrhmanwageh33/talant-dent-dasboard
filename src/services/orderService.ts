import type { Root as OrdersResponse } from '@/lib/ordersType';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getOrders(): Promise<OrdersResponse> {
  const response = await fetch(`${API_BASE_URL}/orders`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }
  
  const data: OrdersResponse = await response.json();
  return data;
}
