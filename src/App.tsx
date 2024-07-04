import { TodoList, AddTodo } from './components'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      {/** El componente 'Toaster' sera el letrero a mostrar cuando se cree una nueva tarea dentro de la aplicacion  */}
      <Toaster position='bottom-center' />

      
      <AddTodo />
      <TodoList />
    </>
  )
}

export default App
