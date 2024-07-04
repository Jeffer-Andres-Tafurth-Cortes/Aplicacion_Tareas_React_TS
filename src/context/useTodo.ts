import { useContext } from 'react'
import { TodoContext } from './TodoContext'

// El contexto se llama TodocContext y con ayuda del hook useContext vamos a usar el contexto creado en la aplicacion
export function useTodo () {

  const context = useContext(TodoContext)

  if (!context) {
    throw new Error('useTodo debe ser usado dentro de un TodoProvider')
  }

  return context
}
