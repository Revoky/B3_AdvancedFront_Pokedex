import React, { useState } from "react";
import { useTrainer } from "../TrainerContext";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { addCapturedPokemon } from "../store/slices/pokemonSlice";
import PokemonCard from "../components/PokemonCard";
import { useGetGenQuery } from "../api/pokemonApi";
import { Pokemon } from "../types.ts";

const HomePage: React.FC = () => {
  const { activeTrainer } = useTrainer();
  const dispatch = useAppDispatch();
  const capturedIds = useAppSelector(state => state.pokemon.capturedPokemonIds);
  const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);
  const [wildPokemon, setWildPokemon] = useState<Pokemon | null>(null);
  const { data: gen1Pokemon, isLoading, error } = useGetGenQuery(1);

  if (!activeTrainer) return null;
  if (isLoading) return <p className="text-white">Chargement des Pokémon...</p>;
  if (error) return <p className="text-red-500">Erreur lors du chargement des Pokémon.</p>;

  const starter = gen1Pokemon?.find(
    p => p.name.fr.toLowerCase() === activeTrainer.starterPokemon.toLowerCase()
  );

  const togglePokemonDetails = (id: number) => {
    setSelectedPokemon(prev => (prev === id ? null : id));
  };

  const handleCapture = () => {
    if (!gen1Pokemon) return;
    const available = gen1Pokemon.filter(p => !capturedIds.includes(p.pokedex_id));
    if (available.length === 0) {
      alert("Tous les Pokémon ont été capturés !");
      return;
    }
    const random = available[Math.floor(Math.random() * available.length)];
    setWildPokemon(random);
  };

  const confirmCapture = () => {
    if (wildPokemon) {
      dispatch(addCapturedPokemon(wildPokemon.pokedex_id));
      setWildPokemon(null);
    }
  };

  const runAway = () => {
    setWildPokemon(null);
  };

  return (
    <div className="bg-[#181818] p-8 flex flex-col items-center min-h-screen text-white">
    {wildPokemon && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-[#2c2c2c] p-6 rounded-lg shadow-lg text-white text-center w-80">
          <h2 className="text-xl font-bold mb-2">Un {wildPokemon.name.fr} sauvage apparaît !</h2>
          <img
            src={wildPokemon.sprites.regular}
            alt={wildPokemon.name.fr}
            className="w-28 h-28 mx-auto mb-2"
          />
          <div className="flex justify-around">
            <button
              onClick={confirmCapture}
              className="bg-[#7b5c82] px-4 py-2 rounded hover:bg-[#B08BB7] transition-colors"
            >
              Capturer
            </button>
            <button
              onClick={runAway}
              className="bg-[#7b5c82] px-4 py-2 rounded hover:bg-[#57405B] transition-colors"
            >
              Laisser s'enfuir
            </button>
          </div>
        </div>
      </div>
    )}

      <div className="text-center mb-6">
        <p className="text-2xl font-bold text-[#e0a0f0]">Ton starter est {starter?.name.fr}</p>
        {starter && (
          <img
            src={starter.sprites.regular}
            alt={starter.name.fr}
            className="mt-4 w-28 h-28 cursor-pointer m-auto hover:scale-110 transition-transform"
            onClick={() => togglePokemonDetails(starter.pokedex_id)}
          />
        )}
      </div>

      {selectedPokemon && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <PokemonCard
              name={gen1Pokemon?.find(p => p.pokedex_id === selectedPokemon)?.name.fr || ""}
              image={gen1Pokemon?.find(p => p.pokedex_id === selectedPokemon)?.sprites.regular || ""}
              types={gen1Pokemon?.find(p => p.pokedex_id === selectedPokemon)?.types || []}
              talents={gen1Pokemon?.find(p => p.pokedex_id === selectedPokemon)?.talents.map(t => t.name) || []}
              stats={gen1Pokemon?.find(p => p.pokedex_id === selectedPokemon)?.stats || {}}
              onClose={() => setSelectedPokemon(null)}
            />
        </div>
      )}

      <button
        onClick={handleCapture}
        className="mb-8 bg-gradient-to-r from-[#7b5c82] to-[#8e6c9b] hover:from-[#604866] hover:to-[#7b5c82] px-6 py-3 rounded-lg shadow-md font-semibold transition-colors"
      >
        Se balader dans les hautes herbes...
      </button>

      <div className="grid grid-cols-1 md:grid-cols-8 gap-10">
        {capturedIds.map(id => {
          const p = gen1Pokemon?.find(p => p.pokedex_id === id);
          return p ? (
            <img
              key={p.pokedex_id}
              src={p.sprites.regular}
              alt={p.name.fr}
              className="w-24 h-24 cursor-pointer hover:scale-110 transition-transform"
              onClick={() => togglePokemonDetails(p.pokedex_id)}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default HomePage;
