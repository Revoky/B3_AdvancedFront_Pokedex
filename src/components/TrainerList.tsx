import React from "react";
import TrainerCard from "./TrainerCard";
import '../index.css';

interface Trainer {
  trainerName: string;
  email: string;
  password: string;
}

interface TrainerListProps {
  profiles: Trainer[];
  activeTrainerEmail: string | null;
  onSwitch: (trainer: Trainer) => void;
  onDelete: (trainer: Trainer) => void;
}

const TrainerList: React.FC<TrainerListProps> = ({ profiles, activeTrainerEmail, onSwitch, onDelete }) => {
  return (
    <ul className="list-none space-y-4 w-full max-w-md">
      {profiles.map((trainer, index) => (
        <TrainerCard
          key={index}
          trainer={trainer}
          onSwitch={() => onSwitch(trainer)}
          onDelete={() => onDelete(trainer)}
        />
      ))}
    </ul>
  );
  
};

export default TrainerList;
