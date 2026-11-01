import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { mockBestSellers } from '@/lib/mock/dashboard';
import { ChevronRight } from 'lucide-react';
import type {  Item, Order, Product } from '@/lib/ordersType';
import { getOrders } from '@/services/orderService';



function BestSellerItem(items:Item) {


  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0 last:pb-0">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
          <img src={items?.product?.image} alt={items?.product.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-800">{items?.name}</h4>
          <p className="text-xs text-slate-500">{}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-[#7a5af8]">{items?.product?.stock}</p>
        <p className="text-xs text-slate-500">Sold</p>
      </div>
    </div>
  );
}

export function BestSellers() {
  const [orders, setOrders] = useState<Order[]>([]);

const fetchOrders = async () => {
  const data = await getOrders();

  setOrders(data?.orders ?? []);
};

useEffect(() => {
  fetchOrders();
}, []);

const bestSellingProducts = useMemo(() => {
  const items = orders.flatMap(
    (order) =>
      order.items?.map((item) => ({
        id: item.product?._id,
        name: item.product?.name,
        image: item.product?.image,
        quantity: item.quantity,
      })) ?? []
  );

  const result = items.reduce<
    {
      id: string;
      name: string;
      image: string;
      sold: number;
    }[]
  >((acc, item) => {
    const existing = acc.find(
      (product) => product.id === item.id
    );

    if (existing) {
      existing.sold += item.quantity;
    } else {
      acc.push({
        id: item.id,
        name: item.name,
        image: item.image,
        sold: item.quantity,
      });
    }

    return acc;
  }, []);

  return result.sort((a, b) => b.sold - a.sold);
}, [orders]);


  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Best Sellers</h3>
        <button className="flex items-center text-sm font-medium text-[#7a5af8] hover:text-[#5c42cc] transition-colors">
          View all products
        </button>
      </div>

      <div className="flex flex-col">
        {bestSellingProducts.map((item) => 
          <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0 last:pb-0">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
          <img src={item?.image} alt={item?.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-800">{item?.name}</h4>
          <p className="text-xs text-slate-500">{}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-[#7a5af8]">{item?.sold}</p>
        <p className="text-xs text-slate-500">Sold</p>
      </div>
    </div>
        )}
      </div>
    </div>
  );
}
