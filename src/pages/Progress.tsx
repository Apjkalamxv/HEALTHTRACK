import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Target, TrendingUp, Calendar, Award, Star, ChevronRight, ArrowUpRight, Plus } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { cn } from '../lib/utils';

const activityData = [
  { name: 'Mon', value: 65 },
  { name: 'Tue', value: 45 },
  { name: 'Wed', value: 85 },
  { name: 'Thu', value: 55 },
  { name: 'Fri', value: 90 },
  { name: 'Sat', value: 70 },
  { name: 'Sun', value: 40 },
];

const macroData = [
  { name: 'Protein', value: 30, color: '#b7ae9f' },
  { name: 'Carbs', value: 45, color: '#cbd5e1' },
  { name: 'Fats', value: 25, color: '#94a3b8' },
];

export function Progress() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Progress & Insights</h1>
          <p className="text-slate-500">A detailed look at your health journey and achievements.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-stone-100 shadow-sm">
          {['Weekly', 'Monthly', 'Yearly'].map((period) => (
            <button 
              key={period}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                period === 'Weekly' ? "bg-[#b7ae9f] text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Workouts', value: '24', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Calories Burned', value: '12,450', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Active Days', value: '18/30', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Goals Met', value: '85%', icon: Target, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", stat.bg, stat.color)}>
              <stat.icon className="h-6 w-6" />
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Activity Chart */}
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black">Activity Intensity</h3>
              <p className="text-sm text-slate-400">Your daily movement score</p>
            </div>
            <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
              <ArrowUpRight className="h-4 w-4" />
              <span>+12.5% vs last week</span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b7ae9f" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#b7ae9f" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#b7ae9f" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Nutrition Distribution */}
        <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-stone-100 shadow-sm flex flex-col">
          <h3 className="text-xl font-black mb-2 text-center">Nutrition Balance</h3>
          <p className="text-sm text-slate-400 text-center mb-8">Average weekly macros</p>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black">2,150</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg kcal</span>
            </div>
          </div>
          <div className="mt-auto space-y-3">
            {macroData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-bold text-slate-600">{item.name}</span>
                </div>
                <span className="text-sm font-black">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements & Badges */}
      <section id="achievements-section" className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black">Achievements</h3>
          <button id="view-all-badges-btn" className="text-sm font-bold text-[#b7ae9f] hover:underline flex items-center gap-1">
            View All Badges
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            { name: 'Early Bird', icon: Award, color: 'text-blue-500', bg: 'bg-blue-50', desc: '5 workouts before 8 AM' },
            { name: 'Calorie King', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50', desc: '7 day streak on goal' },
            { name: 'Iron Will', icon: Trophy, color: 'text-slate-700', bg: 'bg-slate-100', desc: '30 days active' },
            { name: 'Hydrator', icon: Award, color: 'text-cyan-500', bg: 'bg-cyan-50', desc: 'Met water goal for 10 days' },
            { name: 'Marathoner', icon: TrendingUp, color: 'text-rose-500', bg: 'bg-rose-50', desc: '42km total distance' },
            { name: 'Zen Master', icon: Target, color: 'text-indigo-500', bg: 'bg-indigo-50', desc: '10 yoga sessions' },
          ].map((badge) => (
            <div 
              key={badge.name} 
              id={`badge-${badge.name.toLowerCase().replace(' ', '-')}`}
              className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-stone-100 shadow-sm group hover:border-[#b7ae9f] transition-all"
            >
              <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform", badge.bg, badge.color)}>
                <badge.icon className="h-8 w-8" />
              </div>
              <h4 className="font-bold text-sm mb-1">{badge.name}</h4>
              <p className="text-[10px] text-slate-400 font-medium leading-tight">{badge.desc}</p>
            </div>
          ))}
          <div id="locked-badge-placeholder" className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-dashed border-stone-200">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2">
              <Plus className="h-6 w-6 text-slate-300" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Locked</span>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
