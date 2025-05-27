'use client'

import { useQuery } from "@tanstack/react-query"

const fetchID = async (id: number) => {
  const r = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  if (!r.ok) throw new Error('Error fetching data')
  return r.json()
} 

export function GetID({id}: {id: number}) {
  // aplicando el get id para obtener la data de la api
  const { 
    data, 
    isLoading, 
    error,
  } = useQuery({ queryKey: ['posts', id], queryFn: () => fetchID(id), staleTime: 10000 })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: { error.message }</p>

  return (
    <div className="w-full flex flex-col justify-center items-center p-4">
      <p className="mb-2">{ data.title }</p>
    </div>
  )
}