import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { SalesOverview } from '@/components/dashboard/SalesOverview';
import { BestSellers } from '@/components/dashboard/BestSellers';

export default function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <StatsCards />
      <RecentOrders />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SalesOverview />
        </div>
        <div className="lg:col-span-1">
          <BestSellers />
        </div>
      </div>
    </>
  );
}
