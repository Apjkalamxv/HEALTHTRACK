import React, { useState, useEffect } from 'react';
import { Flame, Timer, Scale, Footprints, Calculator, UtensilsCrossed, Dumbbell, Calendar, BarChart4, PlayCircle, Utensils } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const weightData = [
  { name: 'Week 1', weight: 75 },
  { name: 'Week 2', weight: 74.2 },
  { name: 'Week 3', weight: 73.8 },
  { name: 'Week 4', weight: 72.5 },
];

interface UserStats {
  dailyCalories: number;
  weeklyWorkouts: number;
}

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>({ dailyCalories: 0, weeklyWorkouts: 0 });
  const calorieGoal = 2200;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/user/stats');
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch stats', err);
      }
    };
    fetchStats();
  }, []);

  const caloriesRemaining = Math.max(calorieGoal - stats.dailyCalories, 0);

  return (
    <motion.div
      id="dashboard-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Hero Section */}
      <section id="dashboard-hero" className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight">Welcome back, {user?.name?.split(' ')[0] ?? 'there'} 👋</h1>
            <p className="text-slate-500 max-w-lg">Your health journey is looking great today. Keep tracking your meals and workouts!</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link id="log-meal-btn" to="/nutrition" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#b7ae9f] text-white font-bold shadow-lg shadow-[#b7ae9f]/20 hover:scale-[1.02] transition-transform">
              <Utensils className="h-5 w-5" />
              <span>Log Meal</span>
            </Link>
            <Link id="start-workout-btn" to="/workouts" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-stone-200 text-slate-900 font-bold hover:bg-slate-50 transition-colors">
              <PlayCircle className="h-5 w-5" />
              <span>Start Workout</span>
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Calories Remaining"
            value={caloriesRemaining.toLocaleString()}
            unit="kcal"
            trend={{ value: `${stats.dailyCalories} consumed`, isUp: false }}
            icon={<Flame className="h-5 w-5" />}
            iconBg="bg-orange-100"
            iconColor="text-orange-600"
          />
          <StatCard
            title="Workouts This Week"
            value={String(stats.weeklyWorkouts)}
            unit="sessions"
            trend={{ value: "This week", isUp: true, isStable: true }}
            icon={<Timer className="h-5 w-5" />}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Body Mass Index"
            value="22.5"
            unit="BMI"
            trend={{ value: "Stable", isUp: false, isStable: true }}
            icon={<Scale className="h-5 w-5" />}
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
          />
          <StatCard
            title="Steps Taken"
            value="8,432"
            unit="steps"
            trend={{ value: "+5%", isUp: true }}
            icon={<Footprints className="h-5 w-5" />}
            iconBg="bg-emerald-100"
            iconColor="text-emerald-600"
          />
        </div>
      </section>

      {/* Toolkit */}
      <section id="dashboard-toolkit" className="mb-16">
        <h2 className="text-2xl font-black mb-6">Your Health Toolkit</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'BMI Calc', icon: Calculator, path: '/bmi' },
            { name: 'Calories', icon: Utensils, path: '/nutrition' },
            { name: 'Meal Plan', icon: UtensilsCrossed, path: '/planner' },
            { name: 'Workouts', icon: Dumbbell, path: '/workouts' },
            { name: 'Calendar', icon: Calendar, path: '/planner' },
            { name: 'Stats', icon: BarChart4, path: '/progress' },
          ].map((tool) => (
            <Link
              key={tool.name}
              id={`tool-link-${tool.name.toLowerCase().replace(' ', '-')}`}
              to={tool.path}
              className="group flex flex-col items-center p-6 bg-white rounded-2xl border border-stone-100 hover:border-[#b7ae9f] transition-all shadow-sm"
            >
              <tool.icon className="h-8 w-8 text-[#b7ae9f] mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold text-center">{tool.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black">Calories: Intake vs Burn</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#b7ae9f]"></span>
                <span className="text-xs text-slate-500">Intake</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                <span className="text-xs text-slate-500">Burn</span>
              </div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Mon', intake: 2100, goal: 2200 },
                { name: 'Tue', intake: 1950, goal: 2200 },
                { name: 'Wed', intake: 2300, goal: 2200 },
                { name: 'Thu', intake: 1800, goal: 2200 },
                { name: 'Fri', intake: 2050, goal: 2200 },
                { name: 'Sat', intake: stats.dailyCalories, goal: 2200 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="intake" fill="#b7ae9f" radius={[4, 4, 0, 0]} />
                <Bar dataKey="goal" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm">
          <div className="mb-8">
            <h3 className="text-lg font-black">Weight Trend</h3>
            <p className="text-sm text-slate-500">Last 30 days performance</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#b7ae9f"
                  strokeWidth={3}
                  dot={{ r: 6, fill: '#fff', stroke: '#b7ae9f', strokeWidth: 2 }}
                  activeDot={{ r: 8, fill: '#b7ae9f' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
