import React, { useEffect, useState, useCallback } from 'react';
import { getOrders } from '@/services/orderService';
import type { Order } from '@/lib/ordersType';
import OrdersHeader from '@/components/orders/OrdersHeader';
import OrdersTable from '@/components/orders/OrdersTable';
import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export default function Orders() {
  

  const fetchOrders = async (): Promise<Order[]> => {
  const data = await getOrders();

  return data.orders || [];
};
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ["orders"],
  queryFn: fetchOrders,
  staleTime: 1000 * 60 * 5,
});

  return (
    <div>
      <OrdersHeader />
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <Loader2 className="w-8 h-8 text-[#7a5af8] animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Loading orders...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center">
          <p className="mb-4 font-medium">{error?.message}</p>
          <button 
            onClick={()=>refetch}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <OrdersTable orders={data ?? []} />
      )}
    </div>
  );
}
