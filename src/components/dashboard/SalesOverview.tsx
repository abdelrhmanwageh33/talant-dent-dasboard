import React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart
} from 'recharts';
import { mockSalesData } from '@/lib/mock/dashboard';

export function SalesOverview() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Sales Overview</h3>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
          Last 7 days
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="flex-1 w-full min-h-[250px] -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={mockSalesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7a5af8" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#7a5af8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickFormatter={(value) => value === 0 ? '0' : `${value / 1000}K`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#7a5af8' }}
              labelStyle={{ color: '#64748b', marginBottom: '4px' }}
              formatter={(value: any) => [`${Number(value).toLocaleString()} EGP`, 'Sales']}
            />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="none" 
              fillOpacity={1} 
              fill="url(#colorSales)" 
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#7a5af8" 
              strokeWidth={2} 
              dot={{ r: 4, strokeWidth: 2, fill: 'white', stroke: '#7a5af8' }} 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#7a5af8' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
