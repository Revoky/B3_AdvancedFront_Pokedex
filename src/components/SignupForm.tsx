import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTrainer } from "../TrainerContext.tsx";
import '../index.css';

interface FormData {
  trainerName: string;
  email: string;
  password: string;
  starterPokemon: string;
}

interface Pokemon {
  name: string;
  pokedex_id: number;
  sprites: { regular: string };
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    trainerName: "",
    email: "",
    password: "",
    starterPokemon: "",
  });
  const [starters, setStarters] = useState<Pokemon[]>([]);
  const navigate = useNavigate();

  const { addTrainer, setActiveTrainer } = useTrainer();

  useEffect(() => {
    const startersData = [
      {
        name: "Bulbizarre",
        pokedex_id: 1,
        sprites: { regular: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/1/regular.png" },
      },
      {
        name: "Salamèche",
        pokedex_id: 4,
        sprites: { regular: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/4/regular.png" },
      },
      {
        name: "Carapuce",
        pokedex_id: 7,
        sprites: { regular: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/7/regular.png" },
      },
    ];
    setStarters(startersData);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [limitReached, setLimitReached] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trainer = { ...formData, pokedex: [] };
    const success = addTrainer(trainer);
    if (!success) {
      setLimitReached(true);
      return;
    }

    setActiveTrainer(trainer);
    navigate("/");
  };

  if (limitReached) {
    return (
      <div className="text-white text-center rounded-lg p-6 mt-10 w-[25%] mx-auto shadow-lg font-serif">
        <p className="text-xl mb-4 font-semibold">Deux dresseurs sont déjà inscrits</p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#9a7bb7] hover:bg-[#b698d6] text-[#1c1b2f] font-bold py-2 px-4 rounded"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#2a2a2a] border-[5px] border-[#7b5c82] rounded-[20px] p-10 w-[25%] mx-auto shadow-2xl text-white font-serif"
    >
      <h2 className="text-center text-[#f1c6ff] mt-0 mb-8 font-bold text-3xl tracking-wider">Inscription dresseur</h2>
      
      <div className="mb-6">
        <label className="block font-semibold text-[#e0d9ff] text-lg">Nom de dresseur</label>
        <input
          type="text"
          name="trainerName"
          value={formData.trainerName}
          onChange={handleChange}
          required
          className="w-full p-3 border-2 border-[#7b5c82] bg-[#2b2832] text-white rounded-lg focus:outline-none focus:border-[#9a7bb7] focus:ring-[#9a7bb7] focus:ring-2"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold text-[#e0d9ff] text-lg">Pokemail</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border-2 border-[#7b5c82] bg-[#2b2832] text-white rounded-lg focus:outline-none focus:border-[#9a7bb7] focus:ring-[#9a7bb7] focus:ring-2"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold text-[#e0d9ff] text-lg">Code secret</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 border-2 border-[#7b5c82] bg-[#2b2832] text-white rounded-lg focus:outline-none focus:border-[#9a7bb7] focus:ring-[#9a7bb7] focus:ring-2"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold text-[#e0d9ff] text-lg">Choisissez votre Pokémon starter</label>
        <select
          name="starterPokemon"
          value={formData.starterPokemon}
          onChange={handleChange}
          required
          className="w-full p-3 border-2 border-[#7b5c82] bg-[#2b2832] text-white rounded-lg focus:outline-none focus:border-[#9a7bb7] focus:ring-[#9a7bb7] focus:ring-2"
        >
          <option value="">Sélectionnez un starter</option>
          {starters.map((pokemon) => (
            <option key={pokemon.pokedex_id} value={pokemon.name}>
              {pokemon.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full p-4 bg-gradient-to-r from-[#7b5c82] to-[#8e6c9b] text-[#1c1b2f] font-bold text-xl rounded-lg shadow-xl hover:shadow-[#9a7bb7] cursor-pointer"
      >
        Rejoindre l'aventure
      </button>
    </form>
  );
};

export default SignupForm;
