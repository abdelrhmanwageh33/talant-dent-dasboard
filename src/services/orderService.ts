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

export async function updateOrderStatus(id:string,status:string):Promise<void>{
  const res = await fetch(`${API_BASE_URL}/orders/${id}`,{
    method:"PATCH",
     headers: { 'Content-Type': 'application/json' },
     body:JSON.stringify(status)
  })
  if (!res.ok) {
    throw new Error(`Failed to create product: ${res.statusText}`);
  }
}