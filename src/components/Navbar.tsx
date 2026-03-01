import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Utensils, Dumbbell, Calendar, BarChart3, Bell, LogOut, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Nutrition', path: '/nutrition', icon: Utensils },
  { name: 'Workouts', path: '/workouts', icon: Dumbbell },
  { name: 'Planner', path: '/planner', icon: Calendar },
  { name: 'Progress', path: '/progress', icon: BarChart3 },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header id="main-navbar" className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#b7ae9f] p-1.5 rounded-lg text-white">
              <Dumbbell className="h-6 w-6" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 uppercase">Healthyfiy</span>
          </div>

          {/* Desktop Nav */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                id={`nav-link-${item.name.toLowerCase()}`}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors hover:text-[#b7ae9f]",
                    isActive ? "text-[#b7ae9f] border-b-2 border-[#b7ae9f] pb-1" : "text-slate-600"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button id="notifications-btn" className="p-2 rounded-lg bg-[#b7ae9f]/10 text-[#b7ae9f] hover:bg-[#b7ae9f]/20 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <div id="user-avatar" className="h-10 w-10 rounded-full bg-[#b7ae9f] border-2 border-[#b7ae9f] flex items-center justify-center hidden sm:flex text-white font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase() ?? 'U'}
            </div>
            <button
              id="logout-btn"
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
            <button id="mobile-menu-btn" className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  isActive ? "bg-[#b7ae9f]/10 text-[#b7ae9f]" : "text-slate-600 hover:bg-slate-50"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
