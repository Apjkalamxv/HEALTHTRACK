import React from 'react';
import { cn } from '../lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: {
    value: string;
    isUp: boolean;
    isStable?: boolean;
  };
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

export function StatCard({ title, value, unit, trend, icon, iconBg, iconColor }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-2 rounded-xl", iconBg, iconColor)}>
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "text-xs font-bold flex items-center gap-0.5",
            trend.isStable ? "text-slate-400" : trend.isUp ? "text-emerald-500" : "text-red-500"
          )}>
            {trend.value}
            {trend.isStable ? <Minus className="h-3 w-3" /> : trend.isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          </div>
        )}
      </div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <p className="text-2xl font-black mt-1">
        {value} <span className="text-sm font-normal text-slate-400">{unit}</span>
      </p>
    </div>
  );
}
