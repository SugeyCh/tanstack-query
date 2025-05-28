import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"

const create = async (data: any) => {
  const r = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  return r.json()
}

export function CreatePost() {
  const [ title, setTitle ] = useState("")
  const query = useQueryClient()

  const { mutate } = useMutation({ 
    mutationFn: create,
    // onSuccess: () => {
      // esto se ejecuta cuando el query es exitoso
      // con el invalidateQueries esto se obliga a que traiga de nuevo la data de la api
      // en cambio, con el otro metodo (refetch) se ejecuta trayendo toda la data de nuevo, cuando detecta que hubo un cambio
    //   query.invalidateQueries({ queryKey: ['posts'] })
    // },
    onMutate: async (newData: any) => {
      // cancela las queries que podrían estar para que después de hacer el post, se le añada esa nueva data al get
      // de modo que se hace un copy de todo lo que trae el get de la api (que es lo que demuestra el "old") y se le añade la nueva data que se acaba de añadir en el post
      await query.cancelQueries({ queryKey: ['posts'] })
      const previousPost = query.getQueryData(['posts'])
      query.setQueryData(['posts'], (old: any) => [
        ...old,
        { id: Date.now(), ...newData }
      ])

      return { previousPost }
    },
    onError: (error, newData, context) => {
      query.setQueryData(['posts'], context?.previousPost)
    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()

    // al usar mutate, se le pasa un valor
    // también está el mutateAsync que igualmente se le pasa un valor pero este va a ser asincrono, va a esperar
    mutate({
      title,
      body: 'This is a new post'
    })
  }

  return (
    <div className="flex w-full justify-center mt-5">
      <form className="flex flex-col h-41 justify-center items-center w-66 gap-3 bg-neutral-500/10 rounded-md p-3">
        <h1 className="mb-2 text-gray-300/70 font-medium">Form</h1>
        <input 
          type="text" 
          placeholder="Post title..." 
          onChange={(e) => setTitle(e.target.value)}
          className="outline-none h-8 text-gray-300 bg-zinc-400/12 p-2 pl-3 rounded-sm w-full"
        />
        <button onClick={ handleSubmit } className="bg-blue-950 text-gray-300 font-medium p-2 w-full rounded-md cursor-pointer">Create</button>
      </form>
    </div>
  )
}