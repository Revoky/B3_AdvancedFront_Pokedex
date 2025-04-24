import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrainerList from "../components/TrainerList";
import pokemonData from "../pokemon";
import { Trainer } from "../types";
import { Pokemon } from "../types";
import PokemonCard from "../components/PokemonCard";

const HomePage: React.FC = () => {
  const [profiles, setProfiles] = useState<Trainer[]>([]);
  const [activeTrainer, setActiveTrainer] = useState<Trainer | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem("trainerProfiles") || "[]");
    const storedActive = JSON.parse(localStorage.getItem("activeTrainer") || "null");
    setProfiles(storedProfiles);
    setActiveTrainer(storedActive);
  }, []);

  const switchProfile = (trainer: Trainer) => {
    setActiveTrainer(trainer);
    localStorage.setItem("activeTrainer", JSON.stringify(trainer));
  };

  const deleteProfile = (trainerToDelete: Trainer) => {
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

  const addNewProfile = () => {
    navigate("/signup");
  };

  const openPokemonData = () => {
    if (!activeTrainer) return;
    const pokemon = pokemonData.find(
      p => p.name.fr.toLowerCase() === activeTrainer.starterPokemon.toLowerCase()
    );
    if (pokemon) setSelectedPokemon(pokemon);
  };

  return (
    <div className="bg-[#181818] p-8 flex flex-col items-center min-h-screen">
  
      <div className="text-center mb-6">
        <h1 className="text-[#f0f0f0] text-4xl font-extrabold mb-4 tracking-wide">
          Bienvenue {activeTrainer?.trainerName || "dresseur inconnu"} !
        </h1>
        <h3 className="text-[#b0b0b0] text-xl font-semibold mb-2">Gérez vos profils</h3>
      </div>

      <div className="w-full max-w-lg mb-6">
        <h3 className="text-[#b0b0b0] text-xl font-semibold mb-3">Changer de profil :</h3>
        <TrainerList
          profiles={profiles}
          activeTrainerEmail={activeTrainer?.email ?? null}
          onSwitch={switchProfile}
          onDelete={deleteProfile}
        />

        {profiles.length < 2 && (
          <button
            onClick={addNewProfile}
            className="mt-6 px-5 py-2 bg-gradient-to-r from-[#3e3e3e] to-[#6a6a6a] text-[#f0f0f0] rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Créer un nouveau profil
          </button>
        )}
      </div>

      {activeTrainer && (
        <div className="text-center mb-6">
          <p className="text-lg text-[#e0d9ff] mb-2">Ton starter est :</p>
          <p className="text-2xl font-bold text-[#e0a0f0]">{activeTrainer.starterPokemon}</p>
          <img
            src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${
              activeTrainer.starterPokemon === "Bulbizarre" ? "1" :
              activeTrainer.starterPokemon === "Salamèche" ? "4" :
              "7"
            }/regular.png`}
            alt={activeTrainer.starterPokemon}
            className="mt-4 w-28 h-28 cursor-pointer hover:scale-110 transition-transform"
            onClick={openPokemonData}
          />
        </div>
      )}

      {selectedPokemon && (
        <div className="w-full flex justify-center">
          <PokemonCard
            name={selectedPokemon.name.fr}
            image={selectedPokemon.sprites.regular}
            types={selectedPokemon.types}
            talents={selectedPokemon.talents.map(t => t.name)}
            stats={selectedPokemon.stats}
            onClose={() => setSelectedPokemon(null)}
          />
        </div>
      )}
</div>

  );
};

export default HomePage;
