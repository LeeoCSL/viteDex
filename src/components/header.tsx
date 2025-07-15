import { useNavigate } from 'react-router-dom'

import dex from '../assets/new-dex.png'
export function Header() {
  const navigate = useNavigate()

  function handleClick() {
    navigate('/')
  }

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-red-600 text-white shadow-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3" onClick={handleClick}>
          <img
            alt="Logo Pokédex"
            className="h-10 w-10 object-contain"
            src={dex}
          />
          <h1 className="font-bold text-xl tracking-wide">ViteDex</h1>
        </div>
        {/* Futuro: botão, menu, etc */}
      </div>
    </header>
  )
}
