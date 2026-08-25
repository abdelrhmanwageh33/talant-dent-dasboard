import React from 'react';

export default function OrdersHeader() {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Orders</h1>
        <p className="text-slate-500">Manage and view customer orders</p>
      </div>
    </div>
  );
}
