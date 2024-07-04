import { TodoItem } from './TodoItem'
import { useTodo } from '../context'
import { SiStarship } from 'react-icons/si'

// Este componente mapea y renderiza cada tarea que se agrega a travez del contexto 'useTodo()'
export function TodoList () {

  // Obtenemos las tareas del contexto 'useTodo()' y las guardamos en la constante 'todos'
  const { todos } = useTodo()

  // Si no hay tareas, mostramos un mensaje indicando que no hay nada por hacer
  if(!todos.length){
    return(
      <div className='max-w-lg px-5 m-auto'>
        <h1 className='flex flex-col items-center gap-5 px-5 py-10 text-xl font-bold text-center rounded-xl bg-zinc-900'>
          <SiStarship className='text-5xl' />
          No hay tareas a realizar
        </h1>
      </div>
    )
  }

  return (
    <>
      <ul className='grid max-w-lg gap-2 px-5 m-auto'>
        
        {/** haciendo uso del metodo 'map()' renderizamos cada una de las tareas guardas en la constante 'todos' del contexto 'useTodo()' */}
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  )
}
