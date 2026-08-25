import React from 'react';
import { MoreVertical, ChevronRight } from 'lucide-react';
import { mockOrders } from '@/lib/mock/dashboard';
import { cn } from '@/lib/utils';

export function RecentOrders() {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-orange-100 text-orange-600';
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-600';
      case 'Delivered':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50 mb-8 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Recent Orders</h3>
        <button className="flex items-center text-sm font-medium text-[#7a5af8] hover:text-[#5c42cc] transition-colors">
          View all orders
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-slate-500 font-medium border-b border-slate-100">
            <tr>
              <th className="pb-4 font-medium">Order ID</th>
              <th className="pb-4 font-medium">Customer</th>
              <th className="pb-4 font-medium">Amount</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium">Date</th>
              <th className="pb-4 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 text-[#7a5af8] font-medium">{order.id}</td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={order.customer.avatar} 
                      alt={order.customer.name} 
                      className="w-8 h-8 rounded-full bg-slate-200"
                    />
                    <span className="font-medium text-slate-700">{order.customer.name}</span>
                  </div>
                </td>
                <td className="py-4 text-slate-700">{order.amount}</td>
                <td className="py-4">
                  <span className={cn("px-3 py-1 rounded-full text-xs font-semibold", getStatusStyles(order.status))}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 text-slate-600">{order.date}</td>
                <td className="py-4 text-right">
                  <button className="p-1 text-slate-400 hover:text-slate-600 rounded-md">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
