import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.tsx";

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#181818] text-white font-serif">
      <Header />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
