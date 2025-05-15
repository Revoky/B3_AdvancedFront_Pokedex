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
  image,
  types,
  talents,
  stats,
  onClose,
}) => {
  return (
    <div className="bg-[#2a2832] border-[4px] border-[#7b5c82] p-6 rounded-[20px] shadow-2xl text-white w-80 font-serif relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-white text-xl font-bold hover:text-pink-400"
      >
        ×
      </button>

      <h2 className="text-3xl font-bold text-[#f1c6ff] mb-3 tracking-wider text-center">{name}</h2>

      <img src={image} alt={name} className="w-32 h-32 mx-auto mb-4" />

      <div className="mb-3 text-lg text-center">
        <strong>Types :</strong>
        <div className="flex justify-center gap-2 mt-1">
          {types.map((t) => (
            <img key={t.name} src={t.image} alt={t.name} className="h-7 border-2 border-[#7b5c82] rounded-full shadow-md" />
          ))}
        </div>
      </div>

      <div className="mb-3 text-lg">
        <strong>Talents :</strong> {talents.join(", ")}
      </div>

      <div className="mb-4 text-lg">
        <strong>Stats :</strong>
        <ul className="pl-4">
          {Object.entries(stats).map(([stat, value]) => (
            <li key={stat} className="text-base">
              {stat} : {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonCard;
