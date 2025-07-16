/** biome-ignore-all lint/a11y/useAltText: <explanation> */
/** biome-ignore-all lint/performance/noImgElement: <explanation> */
import { useEffect, useRef, useState } from 'react'
import openDex from '../assets/open-dex.png'
import pokedex from '../assets/pokedex-t.json' with { type: 'json' }

export function NewList() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const itemRefs = useRef<Array<HTMLLIElement | null>>([])
  const [selectedPokemon, setSelectedPokemon] = useState<Item | null>(null)

  useEffect(() => {
    setSelectedPokemon(pokedex[selectedIndex])

    // console.log('42 sdfsdfsdfsdf', selectedIndex, data?.results)
  }, [selectedIndex])

  const handleNext = () => {
    const synth = window.speechSynthesis
    synth.cancel()
    if (pokedex.length > 0) {
      setSelectedIndex((prev) => (prev < pokedex.length - 1 ? prev + 1 : prev))
    }
  }

  const handlePrev = () => {
    const synth = window.speechSynthesis
    synth.cancel()
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleSetSelectedIndex = (index: number) => {
    setSelectedIndex(index)
    const synth = window.speechSynthesis
    synth.cancel()
  }

  function speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US' // ou 'pt-BR' se quiser português
    utterance.rate = 1 // velocidade normal
    utterance.pitch = 1 // tom normal
    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)
  }

  function falar(texto: string) {
    const synth = window.speechSynthesis
    // const utterance = new SpeechSynthesisUtterance('teste de leitura')
    const utterance = new SpeechSynthesisUtterance(texto)

    const voices = synth.getVoices()
    const vozPtBr = voices.find(
      (v) => v.lang === 'pt-BR' && v.name.includes('Google')
    )

    if (vozPtBr) {
      utterance.voice = vozPtBr
    }

    utterance.rate = 1 // velocidade (0.1 a 10)
    utterance.pitch = 2 // tom (0 a 2, mais grave ou agudo)
    utterance.volume = 1.0 // volume (0 a 1)

    synth.cancel()
    synth.speak(utterance)
  }

  return (
    <div className="relative mx-auto w-[700px]" style={{ marginTop: '-100px' }}>
      {/* Imagem da Pokédex como fundo */}
      <img
        alt="Pokedex Aberta"
        src={openDex}
        style={{ width: '700px', height: 'auto', marginTop: '-100px' }}
      />

      {/* Tela da esquerda (descrição) */}

      <div className="absolute top-[36.8%] left-[9%] h-[30%] w-[16%] overflow-auto rounded p-2 shadow ">
        <img src={selectedPokemon?.sprite} />
        <p className="text-sm">{selectedPokemon?.description}</p>
      </div>

      {/* Tela da direita (listagem) */}
      <div className="absolute top-[25.5%] left-[32%] h-[32.5%] w-[34%] overflow-auto rounded p-2 shadow ">
        <ul className="space-y-1">
          {pokedex.map((item, index) => (
            <li
              className={`cursor-pointer rounded px-3 py-1 text-1x1 ${index === selectedIndex ? 'bg-red-500 font-bold text-white' : 'hover:bg-gray-600'} select-none`}
              key={item.id}
              onClick={() => {
                handleSetSelectedIndex(index)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedIndex(index)
                }
              }}
              ref={(el: HTMLLIElement | null) => {
                itemRefs.current[index] = el
              }}
              role="button"
              tabIndex={0}
            >
              <img className=" w-[29%]" src={item.sprite} />
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute top-[53.5%] left-[76.6%] flex h-[11.4%] w-[6.6%] flex-col justify-between overflow-hidden rounded shadow">
        <button className="h-[38%] bg-white/0" onClick={handlePrev}>
          {' '}
        </button>
        <button className="h-[38%] bg-white/0" onClick={handleNext}>
          {' '}
        </button>
      </div>
      <div className="absolute top-[60%] left-[30%] flex h-auto w-auto flex-col justify-between overflow-hidden rounded shadow">
        <button
          className="!bg-transparent !text-3xl flex h-15 w-15 items-center justify-center rounded-full text-white"
          onClick={() => falar(selectedPokemon?.description)}
        >
          🔊
        </button>
      </div>
    </div>
  )
}
