'use client'

import { useQuery } from "@tanstack/react-query"

const fetchAPI = async () => {
  const r = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!r.ok) throw new Error('Error fetching data')
  return r.json()
} 

export function GetAPIComponent() {
  // aplicando el get para obtener toda la data de la api
  const { 
    data, 
    isLoading, 
    error,
  } = useQuery({ queryKey: ['posts'], queryFn: fetchAPI, staleTime: 10000 })
  // la propiedad de staleTime se aplica la cantidad de tiempo en la que vuelve a hacer un fetch a la api
  // siendo así, como un tiempo en el que se hace caché de la data y pasado ese tiempo, hace hace el fetch en caso de que haya nueva data por mostrar

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: { error.message }</p>

  return (
    <div className="w-full flex flex-col justify-center items-center p-4">
      { "" }
      {
        data?.map((posts: any, index: any) => (
          <p key={index} className="mb-2">{ posts.title }</p>
        ))
      }
    </div>
  )
}