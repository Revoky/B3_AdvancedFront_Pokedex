import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/signupForm.css';

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
    console.log("Compte créé avec succès :", formData);
    navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription dresseur</h2>
      <div className="formGroup">
        <label>Nom de dresseur</label>
        <input type="text" name="trainerName" value={formData.trainerName} onChange={handleChange} required />
      </div>
      <div className="formGroup">
        <label>Pokemail</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="formGroup">
        <label>Code secret</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <button type="submit">Rejoindre l'aventure</button>
    </form>
  );
};

export default SignupForm;
