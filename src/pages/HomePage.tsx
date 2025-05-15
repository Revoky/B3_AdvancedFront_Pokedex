import React, { useState } from "react";
import { Pokemon } from "../types";
import pokemonData from "../pokemon";
import PokemonCard from "../components/PokemonCard";
import { useTrainer } from "../TrainerContext.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addCapturedPokemon } from "../store/slices/pokemonSlice";
import { motion, AnimatePresence } from "framer-motion";

const HomePage: React.FC = () => {
  const { activeTrainer } = useTrainer();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const dispatch = useDispatch();
  const capturedIds = useSelector((state: RootState) => state.pokemon.capturedPokemonIds);
  const capturedPokemon = pokemonData.filter(p => capturedIds.includes(p.pokedex_id));

  const openPokemonData = (pokemon: Pokemon) => {
    if (selectedPokemon?.pokedex_id === pokemon.pokedex_id) {
      setSelectedPokemon(null);
    } else {
      setSelectedPokemon(pokemon);
    }
  };

  const handleCapture = () => {
    const wild = pokemonData[Math.floor(Math.random() * pokemonData.length)];
    if (!capturedIds.includes(wild.pokedex_id)) {
      dispatch(addCapturedPokemon(wild.pokedex_id));
      alert(`${wild.name.fr} capturé !`);
    } else {
      alert(`${wild.name.fr} a déjà été capturé.`);
    }
  };

  return (
    <div className="bg-[#181818] p-8 flex flex-col items-center min-h-screen text-white">

      {activeTrainer && (
        <div className="text-center mb-6">
          <p className="text-2xl font-bold text-[#e0a0f0]">Ton starter est {activeTrainer.starterPokemon}</p>
          <img
            src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${
              activeTrainer.starterPokemon === "Bulbizarre" ? "1" :
              activeTrainer.starterPokemon === "Salamèche" ? "4" :
              "7"
            }/regular.png`}
            alt={activeTrainer.starterPokemon}
            className="mt-4 w-28 h-28 cursor-pointer hover:scale-105 transition-transform mx-auto"
            onClick={() =>
              openPokemonData(pokemonData.find(
                p => p.name.fr.toLowerCase() === activeTrainer.starterPokemon.toLowerCase()
              )!)
            }
          />
        </div>
      )}

      <button
        onClick={handleCapture}
        className="mb-8 px-6 py-3 bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-black font-bold rounded-lg shadow-lg transition">
        Se balader dans les hautes herbes
      </button>

      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(180px,1fr))] w-full max-w-7xl px-4">
        {capturedPokemon.map((pokemon) => (
          <div
            key={pokemon.pokedex_id}
            onClick={() => openPokemonData(pokemon)}
            className="cursor-pointer bg-[#232323] p-4 rounded-xl shadow-md hover:scale-105 transition transform"
          >
            <img src={pokemon.sprites.regular} alt={pokemon.name.fr} className="w-24 h-24 mx-auto mb-2" />
            <p className="text-center text-lg font-semibold text-[#f1c6ff]">{pokemon.name.fr}</p>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPokemon && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <PokemonCard
                name={selectedPokemon.name.fr}
                image={selectedPokemon.sprites.regular}
                types={selectedPokemon.types}
                talents={selectedPokemon.talents.map(t => t.name)}
                stats={selectedPokemon.stats}
                onClose={() => setSelectedPokemon(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
