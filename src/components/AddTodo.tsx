import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTodo } from '../context'
import { Input } from './Input'

export function AddTodo () {

  // Agregamos un useState para poder manejar los valores del input cuando se escriba una tarea a agregar
  const [input, setInput] = useState<string>('')

  // Se usa el hook useRef para poder crear una referencia de un elemento en este caso del input como tal
  const inputRef = useRef<HTMLInputElement>(null)

  const { addTodo } = useTodo()

  useEffect(() => {
    // Cuando se renderiza por primera vez el componente se hace focus en el input
    if(inputRef.current){
      inputRef.current.focus()
    }
  }, [])

  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault()
    if(input.trim() !== ''){
      addTodo(input)
      setInput('')
      toast.success('Tarea agregada existosamente!')
    } else {
      toast.error('Debes escribir una tarea valida!')
    }
  }

  return (
    <>
      {/** Este form corresponde a lo que seria el input para agregar una nueva tarea */}
      <form onSubmit={handleSubmission}>
        <div className='flex items-center w-full max-w-lg gap-2 p-5 m-auto'>

          {/** Este componente 'Input' viene de del 'Input.tsx' ya que puede reutilizarse */}
          <Input className='w-full px-5 py-2 bg-transparent border-2 outline-none border-zinc-600 rounded-xl placeholder:text-zinc-500 focus:border-white' 
            ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} type='text' placeholder='Agrega un nueva tarea'
          />

          <button className='px-5 py-2 text-md font-normal text-blue-300 bg-blue-900 border-2 border-blue-900 active:scale-95 rounded-xl'
            type='submit'
          >
            Agregar
          </button>

        </div>
      </form>
    </>
  )
}
