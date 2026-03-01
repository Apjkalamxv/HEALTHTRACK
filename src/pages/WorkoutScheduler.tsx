import React from 'react';
import { motion } from 'motion/react';
import { Plus, Dumbbell, Timer, Flame, Play, MoreVertical, Search, Filter, ChevronRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

const categories = ['All', 'Strength', 'Cardio', 'Yoga', 'HIIT', 'Pilates'];

const workouts = [
  { id: 1, name: 'Full Body Power', duration: '45 min', calories: '420 kcal', difficulty: 'Intermediate', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=300' },
  { id: 2, name: 'Morning Flow Yoga', duration: '30 min', calories: '180 kcal', difficulty: 'Beginner', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=300' },
  { id: 3, name: 'HIIT Burner', duration: '20 min', calories: '350 kcal', difficulty: 'Advanced', image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&q=80&w=300' },
];

export function WorkoutScheduler() {
  const [activeCategory, setActiveCategory] = React.useState('All');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Workout Scheduler</h1>
          <p className="text-slate-500">Design your perfect fitness routine and track your performance.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#b7ae9f] text-white font-bold shadow-lg shadow-[#b7ae9f]/20 hover:scale-[1.02] transition-transform">
          <Plus className="h-5 w-5" />
          <span>Create Routine</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Active Schedule */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <h3 className="font-black text-lg">Today's Schedule</h3>
              <span className="text-xs font-bold text-[#b7ae9f] bg-[#b7ae9f]/10 px-2 py-1 rounded">Monday</span>
            </div>
            <div className="p-6 space-y-6">
              {[
                { time: '07:00 AM', name: 'Morning Cardio', status: 'completed' },
                { time: '05:30 PM', name: 'Upper Body Strength', status: 'upcoming' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      item.status === 'completed' ? "bg-emerald-500" : "bg-slate-200"
                    )}></div>
                    {i === 0 && <div className="w-0.5 h-full bg-slate-100 my-1"></div>}
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.time}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={cn("font-bold", item.status === 'completed' ? "text-slate-400 line-through" : "text-slate-900")}>
                        {item.name}
                      </span>
                      {item.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 border-2 border-dashed border-stone-100 rounded-xl text-slate-400 text-sm font-bold hover:bg-slate-50 transition-colors">
                + Add Session
              </button>
            </div>
          </div>

          <div className="bg-[#b7ae9f] rounded-2xl p-6 text-white shadow-lg shadow-[#b7ae9f]/20">
            <h4 className="font-black text-xl mb-2">Weekly Goal</h4>
            <p className="text-white/80 text-sm mb-6">You've completed 3 out of 5 workouts this week. Almost there!</p>
            <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden mb-2">
              <div className="bg-white h-full w-[60%] rounded-full"></div>
            </div>
            <div className="flex justify-between text-xs font-bold">
              <span>60% Complete</span>
              <span>2 Workouts Left</span>
            </div>
          </div>
        </div>

        {/* Right Column: Workout Library */}
        <div className="lg:col-span-8 space-y-8">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search workouts..." 
                className="w-full bg-white border border-stone-100 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-[#b7ae9f]/20 outline-none"
              />
            </div>
            <div className="flex bg-white p-1 rounded-xl border border-stone-100 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
                    activeCategory === cat ? "bg-[#b7ae9f] text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Workout Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workouts.map((workout) => (
              <div key={workout.id} className="group bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img src={workout.image} alt={workout.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1 block">{workout.difficulty}</span>
                      <h4 className="text-white font-black text-xl">{workout.name}</h4>
                    </div>
                    <button className="p-3 rounded-full bg-white text-[#b7ae9f] shadow-lg hover:scale-110 transition-transform">
                      <Play className="h-5 w-5 fill-current" />
                    </button>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                      <Timer className="h-4 w-4 text-slate-400" />
                      <span className="text-xs font-bold text-slate-600">{workout.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Flame className="h-4 w-4 text-slate-400" />
                      <span className="text-xs font-bold text-slate-600">{workout.calories}</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                    <MoreVertical className="h-5 w-5 text-slate-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-black">Ready for a challenge?</h3>
              <p className="text-slate-400">Try our new 30-day "Summer Shred" program designed by experts.</p>
            </div>
            <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-black hover:bg-[#b7ae9f] hover:text-white transition-all flex items-center gap-2">
              Explore Programs
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
