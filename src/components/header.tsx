import React from "react";
import { useNavigate } from "react-router-dom";

import dex from '../assets/new-dex.png'
export function Header() {

    const navigate = useNavigate();

    function handleClick() {
        navigate("/");
    }

  return (
    <header className="fixed top-0 left-0 w-full bg-red-600 text-white shadow-md z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3" onClick={handleClick}>
          <img
            src={dex}
            alt="Logo Pokédex"
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-xl font-bold tracking-wide">ViteDex</h1>
        </div>
        {/* Futuro: botão, menu, etc */}
      </div>
    </header>
  );
}
