import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Plus, Utensils, Coffee, Sun, Moon, Apple, Info, Download, Share2 } from 'lucide-react';
import { cn } from '../lib/utils';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = [
  { name: 'Breakfast', icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-50' },
  { name: 'Lunch', icon: Sun, color: 'text-blue-500', bg: 'bg-blue-50' },
  { name: 'Dinner', icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { name: 'Snacks', icon: Apple, color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

const mockPlan = {
  'Monday': {
    'Breakfast': 'Oatmeal with Almonds',
    'Lunch': 'Chicken Caesar Salad',
    'Dinner': 'Grilled Salmon & Veggies',
  },
  'Wednesday': {
    'Breakfast': 'Greek Yogurt Parfait',
    'Lunch': 'Quinoa Buddha Bowl',
  }
};

export function WeeklyPlanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Weekly Meal Planner</h1>
          <p className="text-slate-500">Plan your nutrition for the week ahead to stay on track with your goals.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 rounded-xl bg-white border border-stone-200 text-slate-600 hover:bg-slate-50 transition-colors">
            <Download className="h-5 w-5" />
          </button>
          <button className="p-3 rounded-xl bg-white border border-stone-200 text-slate-600 hover:bg-slate-50 transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#b7ae9f] text-white font-bold shadow-lg shadow-[#b7ae9f]/20 hover:scale-[1.02] transition-transform">
            <Plus className="h-5 w-5" />
            <span>Generate Plan</span>
          </button>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-stone-100 shadow-sm mb-8">
        <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
          <ChevronLeft className="h-6 w-6 text-slate-400" />
        </button>
        <div className="text-center">
          <span className="text-lg font-bold">Oct 23 – Oct 29, 2023</span>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Current Week</p>
        </div>
        <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
          <ChevronRight className="h-6 w-6 text-slate-400" />
        </button>
      </div>

      {/* Planner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {days.map((day) => (
          <div key={day} className="flex flex-col gap-4">
            <div className="text-center py-2">
              <span className="text-sm font-black uppercase tracking-widest text-slate-400">{day.slice(0, 3)}</span>
              <div className={cn(
                "mt-1 w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold text-lg",
                day === 'Monday' ? "bg-[#b7ae9f] text-white" : "bg-white text-slate-900 border border-stone-100"
              )}>
                {23 + days.indexOf(day)}
              </div>
            </div>

            <div className="flex flex-col gap-3 min-h-[500px]">
              {mealTypes.map((type) => {
                const meal = (mockPlan as any)[day]?.[type.name];
                return (
                  <div 
                    key={type.name}
                    className={cn(
                      "group relative p-4 rounded-2xl border transition-all cursor-pointer min-h-[100px] flex flex-col",
                      meal ? "bg-white border-stone-100 shadow-sm hover:border-[#b7ae9f]" : "bg-slate-50/50 border-dashed border-stone-200 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <type.icon className={cn("h-4 w-4", type.color)} />
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{type.name}</span>
                    </div>
                    
                    {meal ? (
                      <p className="text-sm font-bold text-slate-700 leading-tight">{meal}</p>
                    ) : (
                      <div className="mt-auto flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="h-5 w-5 text-slate-300" />
                      </div>
                    )}

                    {meal && (
                      <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-300 hover:text-red-500">
                        <Plus className="h-4 w-4 rotate-45" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Nutrition Summary for the Week */}
      <section className="mt-16 bg-white rounded-3xl border border-stone-100 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-[#b7ae9f]/10 text-[#b7ae9f]">
            <Utensils className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-black">Weekly Nutrition Forecast</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Macro Distribution</h3>
            <div className="space-y-4">
              {[
                { label: 'Protein', value: '30%', color: 'bg-blue-500' },
                { label: 'Carbs', value: '45%', color: 'bg-orange-500' },
                { label: 'Fats', value: '25%', color: 'bg-yellow-500' },
              ].map((macro) => (
                <div key={macro.label}>
                  <div className="flex justify-between text-sm font-bold mb-1.5">
                    <span>{macro.label}</span>
                    <span>{macro.value}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={cn("h-full", macro.color)} style={{ width: macro.value }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 bg-slate-50 rounded-2xl p-6 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white text-[#b7ae9f] shadow-sm">
              <Info className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Pro Tip: Meal Prepping</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Based on your plan, Sunday evening would be the best time to prep your Quinoa Buddha Bowls and Grilled Chicken. This will save you approximately 4.5 hours during the work week!
              </p>
              <button className="mt-4 text-sm font-bold text-[#b7ae9f] hover:underline">View Shopping List →</button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
