import type { ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
  icon: ReactNode;
  color: string;
}

export interface MealEntry {
  id: string;
  name: string;
  calories: number;
  portion: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
}

export interface WorkoutExercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: number;
  notes?: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  image?: string;
}
