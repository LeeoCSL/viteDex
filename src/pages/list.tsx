/** biome-ignore-all lint/a11y/useAltText: <explanation> */
/** biome-ignore-all lint/performance/noImgElement: <explanation> */
import { useEffect, useRef, useState } from 'react'

import openDex from '../assets/open-dex.png'

import { useList } from '../http/use-list'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY
export function List() {
  type Item = {
    name: string
    url: string
  }
  const { data } = useList()
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const itemRefs = useRef<Array<HTMLLIElement | null>>([])
  const [selectedPokemon, setSelectedPokemon] = useState<Item | null>(null)
  const [toDetails, setToDetails] = useState({})

  useEffect(() => {
    const el = itemRefs.current[selectedIndex]
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [selectedIndex])

  useEffect(() => {
    if (data?.results[0]) {
      setSelectedPokemon(data?.results[0])
    }
  }, [data])

  useEffect(() => {
    if (data?.results[selectedIndex]) {
      setSelectedPokemon(data?.results[selectedIndex])
    }

    // console.log('42 sdfsdfsdfsdf', selectedIndex, data?.results)
  }, [selectedIndex, data])

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${selectedPokemon?.name}`
      ).then((res) => res.json())

      const response2 = await fetch(`${response.species.url}`).then((res) =>
        res.json()
      )

      const toSave = response
      const text = response2.flavor_text_entries[0].flavor_text.replace(
        /[\n\f\r]/g,
        ' '
      )
      // toSave.description = response2.flavor_text_entries[0].flavor_text.replace(
      //   /[\n\f\r]/g,
      //   ' '
      // )

      const textTranslated = traduzirComGemini(text)
      toSave.description = textTranslated

      setToDetails(toSave)

      // console.log('42 fetchdetails', response)
    }
    if (selectedPokemon?.name) {
      fetchDetails()
    }
  }, [selectedPokemon])

  async function traduzirComGemini(textoOriginal: string): Promise<string> {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Traduza o seguinte texto para o português do Brasil, mantendo o estilo do original (tipo descrição de pokédex). Não envie nada alem da tradução: "${textoOriginal}"`,
                },
              ],
            },
          ],
        }),
      }
    )

    const data = await response.json()
    console.log('42 souydfvsodfg', data)
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Erro na tradução'
    )
  }

  const handleNext = () => {
    if (data?.results?.length && data?.results?.length > 0) {
      setSelectedIndex((prev) =>
        prev < data?.results?.length - 1 ? prev + 1 : prev
      )
    }
  }

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  function speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text.value)
    utterance.lang = 'en-US' // ou 'pt-BR' se quiser português
    utterance.rate = 1 // velocidade normal
    utterance.pitch = 1 // tom normal
    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)
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
        <img
          src={toDetails?.sprites?.other['official-artwork'].front_default}
        />
        <p className="text-sm">{toDetails?.description}</p>
      </div>

      {/* Tela da direita (listagem) */}
      <div className="absolute top-[25.5%] left-[32%] h-[32.5%] w-[34%] overflow-auto rounded p-2 shadow ">
        <ul className="space-y-1">
          {data?.results?.map((item, index) => (
            <li
              className={`cursor-pointer rounded px-3 py-1 text-1x1 ${index === selectedIndex ? 'bg-red-500 font-bold text-white' : 'hover:bg-gray-100'} select-none`}
              key={item.name}
              onClick={() => {
                setSelectedIndex(index)
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
              {/* <img className=" w-[29%]" src={img} /> */}
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
          onClick={() => speak(toDetails?.description)}
        >
          🔊
        </button>
      </div>
    </div>
  )
}
