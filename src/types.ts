export interface Trainer {
    email: string;
    trainerName: string;
    starterPokemon: string;
    pokedex: string[];
}

export interface Pokemon {
  pokedex_id: number;
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  sprites: {
    regular: string;
    shiny?: string;
  };
  types: { name: string; image: string }[];
  talents: { name: string; tc: boolean }[];
  stats: {
    hp: number;
    atk: number;
    def: number;
    spe_atk: number;
    spe_def: number;
    vit: number;
  };
}

export interface TrainerListProps {
  profiles: Trainer[];
  activeTrainerEmail: string | null;
  onSwitch: (trainer: Trainer) => void;
  onDelete: (trainer: Trainer) => void;
}

export interface Trainer {
  trainerName: string;
  email: string;
  password: string;
}

export interface TrainerCardProps {
  trainer: Trainer;
  onSwitch: () => void;
  onDelete: () => void;
}
