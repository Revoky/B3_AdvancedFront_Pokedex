import React from "react";
import '../index.css';
import { TrainerCardProps } from "../types";

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer, onSwitch, onDelete }) => {
  return (
    <li
      onClick={onSwitch}
      className="flex items-center justify-between bg-[#2a2832] border-2 border-[#7b5c82] rounded-[12px] px-4 py-3 my-2 shadow-md transition-shadow hover:shadow-lg hover:bg-[#3e2d46] text-[#e0d9ff] text-lg cursor-pointer font-serif"
    >
      <div className="flex-1 text-[#f1c6ff] font-bold text-sm">{trainer.trainerName}</div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="text-[#ff6961] text-xl ml-4 cursor-pointer hover:text-[#f1c6ff]"
      >
        🗑️
      </button>
    </li>
  );
};

export default TrainerCard;
