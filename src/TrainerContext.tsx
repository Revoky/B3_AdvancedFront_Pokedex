import React, { createContext, useContext, useEffect, useState } from "react";
import { Trainer } from "./types.ts";

type TrainerContextType = {
  profiles: Trainer[];
  activeTrainer: Trainer | null;
  setActiveTrainer: (trainer: Trainer) => void;
  addTrainer: (trainer: Trainer) => boolean;
  deleteTrainer: (email: string) => void;
};

const TrainerContext = createContext<TrainerContextType | undefined>(undefined);

export const TrainerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Trainer[]>([]);
  const [activeTrainer, setActiveTrainerState] = useState<Trainer | null>(null);

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem("trainerProfiles") || "[]");
    const storedActive = JSON.parse(localStorage.getItem("activeTrainer") || "null");
    setProfiles(storedProfiles);
    setActiveTrainerState(storedActive);
  }, []);

  const setActiveTrainer = (trainer: Trainer) => {
    localStorage.setItem("activeTrainer", JSON.stringify(trainer));
    setActiveTrainerState(trainer);
  };

  const addTrainer = (newTrainer: Trainer): boolean => {
    if (profiles.length >= 2) return false;

    const updated = [...profiles, newTrainer];
    setProfiles(updated);
    localStorage.setItem("trainerProfiles", JSON.stringify(updated));
    return true;
  };

  const deleteTrainer = (email: string) => {
    const updated = profiles.filter(p => p.email !== email);
    setProfiles(updated);
    localStorage.setItem("trainerProfiles", JSON.stringify(updated));
    if (activeTrainer?.email === email) {
      const next = updated[0] ?? null;
      setActiveTrainer(next);
      if (next) {
        localStorage.setItem("activeTrainer", JSON.stringify(next));
      } else {
        localStorage.removeItem("activeTrainer");
      }
    }
  };

  return (
    <TrainerContext.Provider
      value={{ profiles, activeTrainer, setActiveTrainer, addTrainer, deleteTrainer }}
    >
      {children}
    </TrainerContext.Provider>
  );
};

export const useTrainer = () => {
  const context = useContext(TrainerContext);
  if (!context) throw new Error("useTrainer must be used within a TrainerProvider");
  return context;
};