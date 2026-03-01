import React from 'react';
import { motion } from 'motion/react';
import { Info, History, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

export function BMICalculator() {
  const [bmi, setBmi] = React.useState<number | null>(22.8);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto w-full px-6 py-12"
    >
      {/* Page Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-black tracking-tight mb-2">BMI Calculator</h1>
        <p className="text-slate-500 max-w-2xl">
          Calculate your Body Mass Index (BMI) to understand if you are in a healthy weight range for your height and age.
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inputs Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-stone-100 p-8 space-y-6">
          {/* Gender Selector */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Gender</label>
            <div className="flex bg-[#f7f7f7] p-1 rounded-xl">
              {['Male', 'Female', 'Other'].map((gender) => (
                <label key={gender} className="flex-1 cursor-pointer group">
                  <input defaultChecked={gender === 'Male'} className="hidden peer" name="gender" type="radio" />
                  <div className="flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold peer-checked:bg-[#b7ae9f] peer-checked:text-white text-slate-500 transition-all">
                    {gender}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Age Input */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Age</label>
            <div className="relative">
              <input 
                className="w-full bg-[#f7f7f7] border-none rounded-xl py-4 px-5 focus:ring-2 focus:ring-[#b7ae9f]/50 text-lg font-medium" 
                placeholder="Years" 
                type="number" 
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Height & Weight Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Height (cm)</label>
              <input className="w-full bg-[#f7f7f7] border-none rounded-xl py-4 px-5 focus:ring-2 focus:ring-[#b7ae9f]/50 text-lg font-medium" placeholder="175" type="number" />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Weight (kg)</label>
              <input className="w-full bg-[#f7f7f7] border-none rounded-xl py-4 px-5 focus:ring-2 focus:ring-[#b7ae9f]/50 text-lg font-medium" placeholder="70" type="number" />
            </div>
          </div>

          {/* Calculate Button */}
          <button className="w-full bg-[#b7ae9f] hover:bg-[#b7ae9f]/90 text-white font-bold py-5 rounded-xl text-lg shadow-lg shadow-[#b7ae9f]/20 transition-all transform active:scale-[0.98] mt-4">
            Calculate Result
          </button>
          <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest font-semibold">
            Privacy Protected • Secure Data
          </p>
        </div>

        {/* Right Column: Results Visualization */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-10 flex flex-col items-center justify-center text-center">
            {/* Circular Gauge */}
            <div className="relative w-64 h-64 mb-6 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-slate-100" cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeWidth="14" />
                <circle 
                  cx="128" cy="128" fill="transparent" r="110" stroke="#b7ae9f" 
                  strokeDasharray="690" strokeDashoffset="345" strokeLinecap="round" strokeWidth="16" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Your BMI</span>
                <span className="text-6xl font-black text-slate-900">{bmi}</span>
                <div className="mt-2 px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-wide">
                  Healthy
                </div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2">
                <div className="w-4 h-4 bg-[#b7ae9f] border-4 border-white rounded-full shadow-md"></div>
              </div>
            </div>
            <div className="max-w-md">
              <h3 className="text-xl font-bold mb-2">Great Progress!</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                You are currently in the healthy weight range. Maintaining a balanced diet and 150 minutes of moderate exercise per week will help you stay here.
              </p>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#b7ae9f]/5 border border-[#b7ae9f]/20 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Info className="h-5 w-5 text-[#b7ae9f]" />
                <h4 className="font-bold text-sm uppercase">What is BMI?</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Body Mass Index is a simple calculation using a person's height and weight. The formula is BMI = kg/m². It's a screening tool, not a diagnosis of body fatness.
              </p>
            </div>
            <div className="bg-white border border-stone-100 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-3 text-slate-400">
                <History className="h-5 w-5" />
                <h4 className="font-bold text-sm uppercase">Recent History</h4>
              </div>
              <div className="space-y-3">
                {[
                  { date: 'Oct 12, 2023', value: 23.1, progress: 80 },
                  { date: 'Aug 05, 2023', value: 24.5, progress: 95 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-medium text-slate-500">{item.date}</span>
                      <span className="font-bold">{item.value}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#b7ae9f]/40 h-full" style={{ width: `${item.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weight Categories Chart */}
      <section className="mt-16">
        <h3 className="text-lg font-bold mb-6 text-center uppercase tracking-widest text-slate-400">BMI Weight Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Underweight', range: 'Below 18.5', color: 'border-amber-400' },
            { label: 'Healthy', range: '18.5 – 24.9', color: 'border-[#b7ae9f]' },
            { label: 'Overweight', range: '25.0 – 29.9', color: 'border-orange-400' },
            { label: 'Obese', range: '30.0 & Above', color: 'border-red-500' },
          ].map((cat) => (
            <div key={cat.label} className={cn("bg-white p-5 rounded-xl border-l-4 shadow-sm text-center", cat.color)}>
              <div className="text-xs font-bold text-slate-400 mb-1">{cat.label}</div>
              <div className="text-lg font-bold">{cat.range}</div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
