import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ChevronLeft, ChevronRight, PlusCircle, Egg, Cookie, Droplets, Sunrise, Sun, Moon, Utensils, Trash2, BarChart, Droplet, X, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import api from '../services/api';

interface Meal {
  _id: string;
  name: string;
  calories: number;
  portion: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
  date: string;
}

export function CaloriesTracker() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedType, setSelectedType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('breakfast');

  // New Meal Form State
  const [newName, setNewName] = useState('');
  const [newCalories, setNewCalories] = useState('');
  const [newPortion, setNewPortion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const { data } = await api.get('/meals');
      setMeals(data);
    } catch (err) {
      console.error('Error fetching meals:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data } = await api.post('/meals', {
        name: newName,
        calories: Number(newCalories),
        portion: newPortion,
        type: selectedType
      });
      setMeals([...meals, data]);
      setShowAddModal(false);
      setNewName('');
      setNewCalories('');
      setNewPortion('');
    } catch (err) {
      console.error('Error adding meal:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMeal = async (id: string) => {
    try {
      await api.delete(`/meals/${id}`);
      setMeals(meals.filter(m => m._id !== id));
    } catch (err) {
      console.error('Error deleting meal:', err);
    }
  };

  const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);
  const calorieGoal = 2200;
  const remaining = calorieGoal - totalCalories;
  const progressPercent = Math.min((totalCalories / calorieGoal) * 100, 100);

  const mealTypes = [
    { title: 'Breakfast', icon: Sunrise, type: 'breakfast' as const },
    { title: 'Lunch', icon: Sun, type: 'lunch' as const },
    { title: 'Dinner', icon: Moon, type: 'dinner' as const },
    { title: 'Snacks', icon: Utensils, type: 'snacks' as const },
  ];

  const getMealsByType = (type: string) => meals.filter(m => m.type === type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 md:px-10 py-8"
    >
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Calories Tracker</h1>
          <div className="flex items-center gap-2 text-slate-500">
            <Calendar className="h-5 w-5" />
            <span className="font-medium">Today</span>
            <button className="ml-2 p-1 hover:bg-[#b7ae9f]/10 rounded"><ChevronLeft className="h-5 w-5" /></button>
            <button className="p-1 hover:bg-[#b7ae9f]/10 rounded"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
        <button
          onClick={() => { setSelectedType('breakfast'); setShowAddModal(true); }}
          className="bg-[#b7ae9f] hover:bg-[#b7ae9f]/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2 w-fit"
        >
          <PlusCircle className="h-5 w-5" />
          Log Entry
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Summary & Macros */}
        <div className="lg:col-span-4 space-y-6">
          {/* Summary Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Daily Summary</h3>
              <span className="text-xs font-bold uppercase tracking-wider text-[#b7ae9f]">Goal: {calorieGoal.toLocaleString()}</span>
            </div>
            <div className="relative flex flex-col items-center justify-center mb-6">
              <div className="w-48 h-48 rounded-full border-[12px] border-[#b7ae9f]/10 flex items-center justify-center relative">
                <div
                  className="absolute inset-0 rounded-full border-[12px] border-[#b7ae9f] border-t-transparent border-r-transparent"
                  style={{ transform: `rotate(${45 + (progressPercent * 3.6)}deg)` }}
                ></div>
                <div className="text-center">
                  <span className="text-4xl font-black block">{totalCalories.toLocaleString()}</span>
                  <span className="text-sm text-slate-500 font-medium uppercase">kcal consumed</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Remaining</span>
                <span className="font-bold text-[#b7ae9f] text-lg">{remaining > 0 ? remaining.toLocaleString() : 0} kcal</span>
              </div>
              <div className="w-full bg-[#b7ae9f]/10 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#b7ae9f] h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
          </div>

          {/* Macros Breakdown (Static for now as backend doesn't track macros yet) */}
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: 'Protein', value: '45g / 150g', progress: 30, icon: Egg, color: 'text-blue-600', bg: 'bg-blue-100', bar: 'bg-blue-500' },
              { label: 'Carbs', value: '120g / 220g', progress: 55, icon: Cookie, color: 'text-orange-600', bg: 'bg-orange-100', bar: 'bg-orange-500' },
              { label: 'Fats', value: '35g / 70g', progress: 50, icon: Droplets, color: 'text-yellow-600', bg: 'bg-yellow-100', bar: 'bg-yellow-500' },
            ].map((macro) => (
              <div key={macro.label} className="bg-white p-5 rounded-2xl border border-stone-100 flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", macro.bg, macro.color)}>
                  <macro.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-bold">{macro.label}</span>
                    <span className="text-xs text-slate-500">{macro.value}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full">
                    <div className={cn("h-full rounded-full", macro.bar)} style={{ width: `${macro.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Meal Entries */}
        <div className="lg:col-span-8 space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="h-10 w-10 animate-spin mb-4" />
              <p>Fetching your meals...</p>
            </div>
          ) : mealTypes.map((typeObj) => (
            <div key={typeObj.title} className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm">
              <div className="px-6 py-4 bg-[#b7ae9f]/5 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <typeObj.icon className="h-5 w-5 text-[#b7ae9f]" />
                  <h3 className="font-bold text-lg">{typeObj.title}</h3>
                </div>
                <span className="text-sm font-bold text-slate-500">
                  {getMealsByType(typeObj.type).reduce((acc, m) => acc + m.calories, 0)} kcal
                </span>
              </div>
              <div className="p-4 space-y-2">
                {getMealsByType(typeObj.type).length > 0 ? (
                  getMealsByType(typeObj.type).map((meal) => (
                    <div key={meal._id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl group transition-colors">
                      <div className="flex flex-col">
                        <span className="font-semibold">{meal.name}</span>
                        <span className="text-xs text-slate-500">{meal.portion}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-slate-700">{meal.calories} kcal</span>
                        <button
                          onClick={() => handleDeleteMeal(meal._id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    <Utensils className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">No {typeObj.title.toLowerCase()} logged for today</p>
                  </div>
                )}
                <button
                  onClick={() => { setSelectedType(typeObj.type); setShowAddModal(true); }}
                  className="w-full py-2 border-2 border-dashed border-[#b7ae9f]/20 rounded-xl text-[#b7ae9f] text-sm font-bold hover:bg-[#b7ae9f]/5 transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  <PlusCircle className="h-4 w-4" />
                  Add Food
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Meal Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <h3 className="text-xl font-bold">Log {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddMeal} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Food Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Avocado Toast"
                    required
                    className="w-full bg-slate-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#b7ae9f]/20 focus:border-[#b7ae9f]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Calories (kcal)</label>
                    <input
                      type="number"
                      value={newCalories}
                      onChange={(e) => setNewCalories(e.target.value)}
                      placeholder="e.g. 350"
                      required
                      className="w-full bg-slate-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#b7ae9f]/20 focus:border-[#b7ae9f]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Portion</label>
                    <input
                      type="text"
                      value={newPortion}
                      onChange={(e) => setNewPortion(e.target.value)}
                      placeholder="e.g. 1 slice"
                      required
                      className="w-full bg-slate-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#b7ae9f]/20 focus:border-[#b7ae9f]"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#b7ae9f] hover:bg-[#b7ae9f]/90 text-white font-bold py-3.5 rounded-xl mt-4 shadow-lg shadow-[#b7ae9f]/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
                  Save Entry
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Help/Stats */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <button className="bg-[#b7ae9f]/20 backdrop-blur-md p-3 rounded-full text-[#b7ae9f] hover:bg-[#b7ae9f]/30 transition-all shadow-lg">
          <Droplet className="h-6 w-6" />
        </button>
        <button className="bg-[#b7ae9f] text-white p-4 rounded-full shadow-xl hover:scale-105 transition-all">
          <BarChart className="h-6 w-6" />
        </button>
      </div>
    </motion.div>
  );
}
