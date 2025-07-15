
import { useNavigate } from "react-router-dom";
import dex from '../assets/new-dex.png'

export function Home() {

    const navigate = useNavigate();

    function handleClick() {
        navigate("/pokedex");
    }

    return ( 
        <div>
      <div className="relative w-[40vw] max-w-[300px] aspect-[3/4]">
        <img
          src={dex}
          alt="dex"
          className="w-full h-full object-contain"
        />

        {/* Área clicável proporcional à imagem */}
        <div
          onClick={handleClick}
          className="
    absolute 
    w-[15%] 
    h-[11%] 
    bottom-[25%] 
    left-[22%] 
    cursor-pointer
    hover:brightness-110 
    transition
  "
        //   style={{
        //     width: '15%',
        //     height: '11%',
        //     bottom: '25%',
        //     left: '22%', // centralizado horizontalmente
        //     cursor: 'pointer',
           
        //   }}
          aria-label="Abrir Pokédex"
          title="Abrir Pokédex"
        />
      </div>
    </div>
            
     );
}
