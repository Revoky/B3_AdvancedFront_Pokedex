import React, { useState } from "react";
import { Pokemon } from "../types";
import pokemonData from "../pokemon";
import PokemonCard from "../components/PokemonCard";
import { useTrainer } from "../TrainerContext.tsx";

const HomePage: React.FC = () => {
  const { activeTrainer } = useTrainer();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const openPokemonData = () => {
    if (!activeTrainer) return;
    const pokemon = pokemonData.find(
      p => p.name.fr.toLowerCase() === activeTrainer.starterPokemon.toLowerCase()
    );
    if (!pokemon) return;

    if (selectedPokemon && selectedPokemon.name.fr === pokemon.name.fr) {
      setSelectedPokemon(null);
    } else {
      setSelectedPokemon(pokemon);
    }
  };

  return (
    <div className="bg-[#181818] p-8 flex flex-col items-center min-h-screen">

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
