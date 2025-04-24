import React from "react";
import '../index.css';

interface Trainer {
  trainerName: string;
  email: string;
  password: string;
}

interface TrainerCardProps {
  trainer: Trainer;
  onSwitch: () => void;
  onDelete: () => void;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer, onSwitch, onDelete }) => {
  return (
    <li onClick={onSwitch} className="flex items-center justify-between bg-[#1c1b2f] border-2 border-[#9269df] rounded-lg px-6 py-4 my-3 shadow-md transition-shadow hover:shadow-lg hover:bg-[#292345] text-[#e0d9ff] text-lg cursor-pointer">
    <div className="flex-1 text-white font-bold">{trainer.trainerName}</div>
    <button onClick={(e) => { 
      e.stopPropagation(); 
      onDelete();
    }}
    className="text-[#ff6961] text-xl ml-4 cursor-pointer"
    >
    🗑️
    </button>
    </li>
  );
};

export default TrainerCard;
