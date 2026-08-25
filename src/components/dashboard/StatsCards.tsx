import React from 'react';
import { ShoppingBag, DollarSign, Package, User, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  colorScheme: 'purple' | 'green' | 'blue' | 'orange';
}

export function StatCard({ title, value, change, icon: Icon, colorScheme }: StatCardProps) {
  const colorStyles = {
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
    },
    green: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-600',
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
    },
    orange: {
      bg: 'bg-orange-100',
      text: 'text-orange-600',
    },
  };

  const colors = colorStyles[colorScheme];

  return (
    <div className="flex items-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100/50">
      <div className={cn("flex items-center justify-center w-14 h-14 rounded-full mr-6", colors.bg)}>
        <Icon className={colors.text} size={28} strokeWidth={2} />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 mb-1">{value}</h3>
        <div className="flex items-center gap-1 text-xs font-medium text-emerald-500">
          <span>{change}</span>
          <span>this week</span>
          <ArrowUpRight size={14} className="ml-0.5" />
        </div>
      </div>
    </div>
  );
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="Orders" 
        value="128" 
        change="+12%" 
        icon={ShoppingBag} 
        colorScheme="purple" 
      />
      <StatCard 
        title="Revenue" 
        value="45,280 EGP" 
        change="+8.5%" 
        icon={DollarSign} 
        colorScheme="green" 
      />
      <StatCard 
        title="Products" 
        value="200" 
        change="+5%" 
        icon={Package} 
        colorScheme="blue" 
      />
      <StatCard 
        title="Users" 
        value="84" 
        change="+3%" 
        icon={User} 
        colorScheme="orange" 
      />
    </div>
  );
}
