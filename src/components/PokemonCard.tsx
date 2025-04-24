import React from "react";

interface PokemonCardProps {
  name: string;
  image: string;
  types: { name: string; image: string }[];
  talents: string[];
  stats: { [key: string]: number };
  onClose: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  types,
  talents,
  stats,
  onClose,
}) => {
  return (
    <div className="bg-[#2a2832] border-[4px] border-[#7b5c82] p-8 rounded-[20px] shadow-2xl text-white w-80 mb-8 font-serif">
      <h2 className="text-3xl font-bold text-[#f1c6ff] mb-4 tracking-wider">{name}</h2>
      
      <div className="mb-2 text-lg">
        <strong>Types :</strong>{" "}
        {types.map((t) => (
          <img key={t.name} src={t.image} alt={t.name} className="inline h-7 mx-2 border-2 border-[#7b5c82] rounded-full shadow-md" />
        ))}
      </div>

      <div className="mb-4 text-lg">
        <strong>Talents :</strong> {talents.join(", ")}
      </div>

      <div className="mb-4 text-lg">
        <strong>Stats :</strong>
        <ul className="pl-6">
          {Object.entries(stats).map(([stat, value]) => (
            <li key={stat} className="text-lg">
              {stat} : {value}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={onClose} className="mt-6 px-6 py-3 bg-gradient-to-r from-[#7b5c82] to-[#8e6c9b] text-[#1c1b2f] font-bold rounded-lg shadow-xl hover:shadow-[#9a7bb7] cursor-pointer">
        Fermer
      </button>
    </div>
  );
};

export default PokemonCard;
