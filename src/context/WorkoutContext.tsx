"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Workout } from "@/types/workout";
import { toast } from "sonner";

interface WorkoutContextType {
  todayPlan: Workout[];
  savedWorkouts: Workout[];
  completedWorkoutIds: number[];
  addToTodayPlan: (workout: Workout) => boolean;
  removeFromTodayPlan: (id: number) => void;
  addToSaved: (workout: Workout) => boolean;
  removeFromSaved: (id: number) => void;
  toggleMarkDone: (id: number) => void;
  isWorkoutInPlan: (id: number) => boolean;
  isWorkoutSaved: (id: number) => boolean;
  isWorkoutDone: (id: number) => boolean;
  metrics: {
    totalExercises: number;
    totalMinutes: number;
    totalCalories: number;
    completedExercises: number;
  };
  isLoaded: boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

const STORAGE_KEYS = {
  TODAY_PLAN: "fitlog_today_plan_v1",
  SAVED_WORKOUTS: "fitlog_saved_workouts_v1",
  COMPLETED_WORKOUTS: "fitlog_completed_ids_v1",
};

const MAX_PLAN_LIMIT = 5;

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [completedWorkoutIds, setCompletedWorkoutIds] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load state from localStorage upon initial client mount
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(STORAGE_KEYS.TODAY_PLAN);
      const storedSaved = localStorage.getItem(STORAGE_KEYS.SAVED_WORKOUTS);
      const storedDone = localStorage.getItem(STORAGE_KEYS.COMPLETED_WORKOUTS);

      // Client-only hydration to prevent SSR mismatch
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (storedPlan) setTodayPlan(JSON.parse(storedPlan));
      if (storedSaved) setSavedWorkouts(JSON.parse(storedSaved));
      if (storedDone) setCompletedWorkoutIds(JSON.parse(storedDone));
    } catch (error) {
      console.error("Failed to load workout state from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Persist workout state changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.TODAY_PLAN, JSON.stringify(todayPlan));
      localStorage.setItem(STORAGE_KEYS.SAVED_WORKOUTS, JSON.stringify(savedWorkouts));
      localStorage.setItem(STORAGE_KEYS.COMPLETED_WORKOUTS, JSON.stringify(completedWorkoutIds));
    } catch (e) {
      console.error("Failed to persist workout state to localStorage:", e);
    }
  }, [todayPlan, savedWorkouts, completedWorkoutIds, isLoaded]);

  const isWorkoutInPlan = (id: number) => {
    return todayPlan.some((w) => w.id === id);
  };

  const isWorkoutSaved = (id: number) => {
    return savedWorkouts.some((w) => w.id === id);
  };

  const isWorkoutDone = (id: number) => {
    return completedWorkoutIds.includes(id);
  };

  const addToTodayPlan = (workout: Workout): boolean => {
    if (isWorkoutInPlan(workout.id)) {
      toast.info(`"${workout.name}" is already in today's plan.`);
      return false;
    }

    if (todayPlan.length >= MAX_PLAN_LIMIT) {
      toast.error(`Daily limit reached (maximum ${MAX_PLAN_LIMIT} lifts). Complete them to load more.`);
      return false;
    }

    setTodayPlan((prev) => [...prev, workout]);
    toast.success(`"${workout.name}" added to today's plan!`, {
      description: "Locked into today's log. Check My Plan to start.",
    });
    return true;
  };

  const removeFromTodayPlan = (id: number) => {
    const workout = todayPlan.find((w) => w.id === id);
    setTodayPlan((prev) => prev.filter((w) => w.id !== id));
    setCompletedWorkoutIds((prev) => prev.filter((wId) => wId !== id));

    if (workout) {
      toast.info(`Removed "${workout.name}" from today's plan.`);
    }
  };

  const addToSaved = (workout: Workout): boolean => {
    if (isWorkoutSaved(workout.id)) {
      toast.info(`"${workout.name}" is already saved.`);
      return false;
    }

    setSavedWorkouts((prev) => [...prev, workout]);
    toast.success(`"${workout.name}" saved for later!`, {
      description: "Available anytime in your Saved tab.",
    });
    return true;
  };

  const removeFromSaved = (id: number) => {
    const workout = savedWorkouts.find((w) => w.id === id);
    setSavedWorkouts((prev) => prev.filter((w) => w.id !== id));

    if (workout) {
      toast.info(`Removed "${workout.name}" from saved lifts.`);
    }
  };

  const toggleMarkDone = (id: number) => {
    const workout = todayPlan.find((w) => w.id === id);
    const isCurrentlyDone = completedWorkoutIds.includes(id);

    if (isCurrentlyDone) {
      setCompletedWorkoutIds((prev) => prev.filter((wId) => wId !== id));
      if (workout) {
        toast.info(`Marked "${workout.name}" as not finished yet.`);
      }
    } else {
      setCompletedWorkoutIds((prev) => [...prev, id]);
      if (workout) {
        toast.success(`Completed "${workout.name}"! Great work.`, {
          description: "Logged towards today's stats.",
        });
      }
    }
  };

  const metrics = useMemo(() => {
    const totalExercises = todayPlan.length;
    const totalMinutes = todayPlan.reduce((acc, curr) => acc + (curr.duration || 0), 0);
    const totalCalories = todayPlan.reduce((acc, curr) => acc + (curr.caloriesBurned || 0), 0);
    const completedExercises = todayPlan.filter((w) => completedWorkoutIds.includes(w.id)).length;

    return {
      totalExercises,
      totalMinutes,
      totalCalories,
      completedExercises,
    };
  }, [todayPlan, completedWorkoutIds]);

  return (
    <WorkoutContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        completedWorkoutIds,
        addToTodayPlan,
        removeFromTodayPlan,
        addToSaved,
        removeFromSaved,
        toggleMarkDone,
        isWorkoutInPlan,
        isWorkoutSaved,
        isWorkoutDone,
        metrics,
        isLoaded,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
}
