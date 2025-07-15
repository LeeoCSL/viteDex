import { useQuery } from '@tanstack/react-query'
import type { GetListResponse } from './types/get-list-response'

export function useList() {
  return useQuery({
    queryKey: ['get-list'],
    queryFn: async () => {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
      )
      const result: GetListResponse = await response.json()
      return result
    },
  })
}
