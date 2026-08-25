import React from 'react';
import type { Order } from '@/lib/ordersType';
import { cn } from '@/lib/utils';
import { MoreVertical } from 'lucide-react';

interface OrdersTableProps {
  orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm">
        <p className="text-slate-500">No orders found.</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return 'bg-emerald-100 text-emerald-600';
      case 'processing':
      case 'pending':
        return 'bg-amber-100 text-amber-600';
      case 'cancelled':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-slate-500 font-medium border-b border-slate-100 bg-slate-50/50">
            <tr>
              <th className="px-6 py-4 font-medium">Order ID</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Items</th>
              <th className="px-6 py-4 font-medium">Total Price</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => {
              const date = new Date(order.createdAt).toLocaleDateString();
              const itemCount = order.items?.length || 0;
              
              return (
                <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-700">
                    #{order.orderNumber || order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-700 font-medium">{order.customer?.name || 'Unknown'}</div>
                    <div className="text-xs text-slate-500">{order.customer?.phone || ''}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {date}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {itemCount} item{itemCount !== 1 && 's'}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {order.totalPrice} EGP
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold capitalize",
                      getStatusColor(order.status)
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
