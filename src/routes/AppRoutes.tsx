import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Dashboard from '@/pages/Dashboard';
import Products from '@/pages/Products';
import Orders from '@/pages/Orders';
import Customers from '@/pages/Customers';
import Analytics from '@/pages/Analytics';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      <Route element={<DashboardLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="customers" element={<Customers />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
}
