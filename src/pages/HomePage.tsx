import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrainerList from "../components/TrainerList";

interface Trainer {
  trainerName: string;
  email: string;
  password: string;
}

const HomePage: React.FC = () => {
  const [profiles, setProfiles] = useState<Trainer[]>([]);
  const [activeTrainer, setActiveTrainer] = useState<Trainer | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem("trainerProfiles") || "[]");
    const storedActive = JSON.parse(localStorage.getItem("activeTrainer") || "null");
    setProfiles(storedProfiles);
    setActiveTrainer(storedActive);
  }, []);

  const handleSwitch = (trainer: Trainer) => {
    setActiveTrainer(trainer);
    localStorage.setItem("activeTrainer", JSON.stringify(trainer));
  };

  const handleDelete = (trainerToDelete: Trainer) => {
    const confirmDelete = window.confirm(`Supprimer ${trainerToDelete.trainerName} ?`);
    if (!confirmDelete) return;

    const updatedProfiles = profiles.filter(p => p.email !== trainerToDelete.email);
    localStorage.setItem("trainerProfiles", JSON.stringify(updatedProfiles));

    if (activeTrainer?.email === trainerToDelete.email) {
      if (updatedProfiles.length > 0) {
        localStorage.setItem("activeTrainer", JSON.stringify(updatedProfiles[0]));
        setActiveTrainer(updatedProfiles[0]);
      } else {
        localStorage.removeItem("activeTrainer");
        setActiveTrainer(null);
      }
    }

    setProfiles(updatedProfiles);
  };

  const handleAddNewProfile = () => {
    navigate("/signup");
  };

  return (
    <div className="bg-[#1c0a30] p-8 flex flex-col items-center min-h-screen">
      <h1 className="text-[#dd4fd0] text-3xl font-extrabold mb-6">
        Bienvenue {activeTrainer?.trainerName || "dresseur inconnu"} !
      </h1>
  
      <h3 className="text-[#9269df] text-xl font-semibold mb-4">Changer de profil :</h3>
      <TrainerList
        profiles={profiles}
        activeTrainerEmail={activeTrainer?.email ?? null}
        onSwitch={handleSwitch}
        onDelete={handleDelete}
      />
  
      {profiles.length < 2 && (
        <button
          onClick={handleAddNewProfile}
          className="mt-8 px-6 py-3 bg-gradient-to-r from-[#a172f8] to-[#dd4fd0] text-[#e0d9ff] rounded-lg shadow-lg hover:shadow-pink-500"
        >
          Créer un nouveau profil
        </button>
      )}
    </div>
  );
  
  
};

export default HomePage;
