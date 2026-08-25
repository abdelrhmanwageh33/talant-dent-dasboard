import React from 'react';
import { Bell, ChevronDown, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between lg:justify-end h-20 px-6 bg-slate-50 lg:bg-transparent">
      {/* Mobile menu button */}
      <button 
        className="lg:hidden p-2 text-slate-600 hover:bg-slate-200 rounded-md"
        onClick={onMenuClick}
      >
        <Menu size={24} />
      </button>

      {/* Right side: Notification & Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors">
          <Bell size={24} />
          {/* Badge */}
          <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[#7a5af8] rounded-full border-2 border-slate-50">
            3
          </span>
        </button>

        {/* Profile Dropdown */}
        <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#7a5af8] text-white">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
              <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="currentColor"/>
              <path d="M20.5901 22C20.5901 18.134 16.7401 15 12.0001 15C7.26005 15 3.41005 18.134 3.41005 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700">Abdelrahman</span>
            <ChevronDown size={16} className="text-slate-400" />
          </div>
        </button>
      </div>
    </header>
  );
}
