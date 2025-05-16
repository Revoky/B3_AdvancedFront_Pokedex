import React from "react";
import { useNavigate } from "react-router-dom";
import { useTrainer } from "../TrainerContext.tsx";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { profiles, activeTrainer, setActiveTrainer, deleteTrainer } = useTrainer();

  return (
    <header className="w-full px-6 py-4 bg-[#2a2832] border-b-4 border-[#7b5c82] text-white flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold text-[#f1c6ff] font-serif">
        Bienvenue {activeTrainer?.trainerName || "Aucun"} !
      </h1>

      <div className="flex items-center gap-4">
        {profiles.length > 1 && (
          <select
            onChange={(e) => {
              const selected = profiles.find(p => p.email === e.target.value);
              if (selected) setActiveTrainer(selected);
            }}
            value={activeTrainer?.email ?? ""}
            className="bg-[#3e2d46] border border-[#7b5c82] px-3 py-1 rounded text-white"
          >
            {profiles.map(p => (
              <option key={p.email} value={p.email}>{p.trainerName}</option>
            ))}
          </select>
        )}

        {activeTrainer && (
          <button
            onClick={() => deleteTrainer(activeTrainer.email)}
            className="text-red-400 hover:text-red-200 text-xl"
            title="Supprimer le profil actif"
          >
            🗑️
          </button>
        )}

        <button
          onClick={() => navigate("/signup")}
          className="px-4 py-2 bg-[#9962a6] rounded hover:bg-[#784d82] text-[#181818] font-semibold"
        >
          + Nouveau
        </button>
      </div>
    </header>
  );
};

export default Header;
