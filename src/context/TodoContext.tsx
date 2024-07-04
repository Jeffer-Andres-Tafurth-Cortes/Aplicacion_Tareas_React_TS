import { createContext  } from 'react'
import { nanoid } from 'nanoid'
import { useLocalStorage } from 'usehooks-ts'

// Esta interfaz sera la respinsable de determinar como seran las tareas agregadas y las que se agregaran
interface TodoContextProps {
  todos: Todo[]
  addTodo: (text: string) => void
  deleteTodo: (id: string) => void
  editTodo: (id: string, text: string) => void
  updateTodoStatus: (id: string) => void
}

// Esta interfaz sera la responsable de determinar cada tarea
export interface Todo {
  id: string
  text: string
  status: 'undone' | 'completed'
}

// Creamos un contexto para poderlo pasar por toda la aplicacion
export const TodoContext = createContext<TodoContextProps | undefined>(undefined)

// Este componente define lo que es un contexto en la aplicacion de to-do
export function TodoProvider (props: { children: React.ReactNode }) {

  // Se utiliza el hook 'useLocalStorage' para guardar las tareas en el local storage
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos',[])

  const addTodo = (text: string) => {
    const newTodo: Todo ={
      id: nanoid(),
      text,
      status: 'undone'
    }

    setTodos([...todos, newTodo])
  }


  // La funcion 'deleteTodo' se la encargada de eliminar un tarea en la aplicacion
  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  // La funcion 'editTodo' se la encargada de editar el texto de una tarea en la aplicacion
  const editTodo = (id: string, text: string) => {
    setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? {...todo, text} : todo))
  }

  // La funcion 'updateTodosStatus' acualiza el estado de cada tarea si esta completada o no
  const updateTodoStatus = (id: string) => {
    setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? {...todo, status: todo.status === 'undone' ? 'completed' : 'undone'} : todo))
  }

  // Se determina la constante 'value' como la informacion que tiene que recibir una sola tarea cuando se crea
  const value: TodoContextProps = {
    todos,
    addTodo,
    deleteTodo,
    editTodo,
    updateTodoStatus,
    
  }

  return (
    <TodoContext.Provider value={value}>
      {props.children}
    </TodoContext.Provider>
  )
}
