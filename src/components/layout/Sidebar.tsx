import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  LineChart, 
  Settings, 
  LogOut,
  X
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Package, label: 'Products', path: '/products' },
    { icon: ShoppingCart, label: 'Orders', path: '/orders' },
    { icon: Users, label: 'Customers', path: '/customers' },
    { icon: LineChart, label: 'Analytics', path: '/analytics' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings', path: '#' },
    { icon: LogOut, label: 'Logout', path: '#' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-[240px] bg-[#16162a] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo Area */}
        <div className="flex items-center h-20 px-6 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-10 rounded-lg flex items-center justify-center">
              {/* Tooth/Shield SVG placeholder */}
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-10 text-[#7a5af8]">
                <path d="M12 2C8.68629 2 6 4.68629 6 8C6 11.3137 7.5 13.5 9 15.5C10.5 17.5 11 18.5 11 20H13C13 18.5 13.5 17.5 15 15.5C16.5 13.5 18 11.3137 18 8C18 4.68629 15.3137 2 12 2Z" fill="currentColor"/>
                <path d="M9.5 8C9.5 6.61929 10.6193 5.5 12 5.5C13.3807 5.5 14.5 6.61929 14.5 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="text-xl font-bold tracking-wide">
                <span>Talent </span>
                <span className="text-[#7a5af8]">Dent</span>
              </div>
              <div className="text-xs text-slate-400">Admin</div>
            </div>
          </div>
          <button 
            className="ml-auto lg:hidden text-slate-400 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-[#3d3780] text-white" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={20} className={cn(isActive ? "text-white" : "text-slate-400")} />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Bottom Nav */}
        <div className="px-4 py-6 mt-auto border-t border-white/10 space-y-2">
          {bottomItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <item.icon size={20} />
              {item.label}
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}
