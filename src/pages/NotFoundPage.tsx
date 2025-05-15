import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] text-white text-center p-6">
      <h1 className="text-6xl font-bold text-pink-400 mb-4">404</h1>
      <p className="text-2xl mb-4">Cette page n’existe pas</p>
      <button
        onClick={() => navigate("/")}
        className="bg-gradient-to-r from-[#7b5c82] to-[#9a7bb7] text-black font-bold px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition"
      >
        Retour à l’accueil
      </button>
    </div>
  );
};

export default NotFoundPage;
