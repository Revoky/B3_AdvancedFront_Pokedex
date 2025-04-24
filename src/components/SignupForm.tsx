import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../index.css';

interface FormData {
  trainerName: string;
  email: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    trainerName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const existingProfiles = JSON.parse(localStorage.getItem("trainerProfiles") || "[]");

    if (existingProfiles.length >= 2) {
      alert("Déjà deux dresseurs inscrits");
      return;
    }

    const updatedProfiles = [...existingProfiles, formData];
    localStorage.setItem("trainerProfiles", JSON.stringify(updatedProfiles));
    localStorage.setItem("activeTrainer", JSON.stringify(formData));

    navigate("/");
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1c1b2f] border-[3px] border-[#9269df] rounded-[15px] p-8 w-[23%] mx-auto shadow-lg text-white font-sans"
    >
      <h2 className="text-center text-[#dd4fd0] mt-0 mb-8 font-bold text-2xl">Inscription dresseur</h2>
      <div className="mb-6">
        <label className="block font-bold text-[#e0d9ff]">Nom de dresseur</label>
        <input
          type="text"
          name="trainerName"
          value={formData.trainerName}
          onChange={handleChange}
          required
          className="w-full p-2 border-2 border-[#3a345e] bg-[#2a2740] text-white rounded focus:outline-none focus:border-[#9269df] focus:ring-[#9269df] focus:ring-2"
        />
      </div>
      <div className="mb-6">
        <label className="block font-bold text-[#e0d9ff]">Pokemail</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border-2 border-[#3a345e] bg-[#2a2740] text-white rounded focus:outline-none focus:border-[#9269df] focus:ring-[#9269df] focus:ring-2"
        />
      </div>
      <div className="mb-6">
        <label className="block font-bold text-[#e0d9ff]">Code secret</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border-2 border-[#3a345e] bg-[#2a2740] text-white rounded focus:outline-none focus:border-[#9269df] focus:ring-[#9269df] focus:ring-2"
        />
      </div>
      <button
        type="submit"
        className="w-full p-3 bg-gradient-to-r from-[#9269df] to-pink-500 text-[#1c1b2f] font-bold rounded-lg text-lg hover:shadow-pink-500 hover:shadow-lg cursor-pointer"
      >
        Rejoindre l'aventure
      </button>
    </form>
  );
  
};

export default SignupForm;
