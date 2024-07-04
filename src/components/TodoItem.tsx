import type { Todo } from '../context'
import { useEffect, useRef, useState } from 'react'
import { useTodo } from '../context'
import { Input } from './Input'
import { BsCheck2Square } from 'react-icons/bs'
import { TbRefresh } from 'react-icons/tb'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin7Line } from 'react-icons/ri'
import { toast } from 'react-hot-toast'
import cn from 'classnames'
import { motion } from 'framer-motion'

export const TodoItem = (props: { todo: Todo }) => {

  // agregamos como props el 'todo' que es propio de el contexto crearo en 'TodoContext.tsx'
  const { todo } = props

  // Se define un useState para editar el texto de cada tarea si es necesario
  const [editingTodoText, setEditingTodoText] = useState<string>('')

  // Se define un useState para seleecion el id de la tarea la cual se le va a hacer una edicion
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null)

  // Se importan algunos valores propios que va a tener cada tarea, importando el contexto hecho en 'TodoContextProps' con ayuda del hook 'useTodo.ts'
  const { deleteTodo, editTodo, updateTodoStatus } = useTodo() 

  // Se usa el hook useRef para poder crear una referencia de un elemento en este caso del input como tal para la edicion de la tarea
  const editInputRef = useRef<HTMLInputElement>(null)

  // Se usa el useEffect para cuando el Id exista (no sea igual a null) lo enfoque
  useEffect(() => {
    if (editingTodoId !== null && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editingTodoId]);

  // Se define la funcion 'handleEdit' para editar una tarea
  const handleEdit = (todoId: string, todoText: string) => {
    setEditingTodoId(todoId)
    setEditingTodoText(todoText)

    if (editInputRef.current) {
      editInputRef.current.focus()
    }
  }

  // Se define la funcion 'handleUpdate' para actualizar la tarea
  const handleUpdate = (todoId: string) => {
    if (editingTodoText.trim() !== '') {
      editTodo(todoId, editingTodoText)
      setEditingTodoId(null)
      setEditingTodoText('')
      toast.success('La tarea se actualizo correctamente')
    } else {
      toast.error('El texto de la tarea no puede estar vacio')
    }
  }

  // Se define la funcion 'handleDelete' para eliminar la tarea
  const handleDelete = (id: string) => {
    deleteTodo(id)
    toast.success('La tarea se elimino correctamente')
  }

  // Se define la funcion 'handleUpdateStatus' para actualizar el estado de la tarea
  const handleUpdateStatus = (id: string) => {
    updateTodoStatus(id)
    toast.success('el estado de la tarea de ha actualizado')
  }

  return (
    <>
      {/** Este motion.li representa como se vera cada una de las tareas que se agreguen */}
      <motion.li layout className={cn('p-5 rounded-xl bg-zinc-900', todo.status === 'completed' && 'bg-opacity-50 text-zinc-500')}>
        <motion.span layout style={{textDecoration: todo.status === 'completed' ? 'line-through' : 'none'}}>

          {/** Se verifica si la tarea que se va a editar existe con ayuda del ID de la respectiva tarea */}
          {editingTodoId === todo.id
          ? (
            // Si la tarea que se va a editar existe, se muestra un input para editar el texto
            <motion.div layout className='flex gap-2'>
              <Input ref={editInputRef} type='text' value={editingTodoText} onChange={(e) => setEditingTodoText(e.target.value)} className='text-zinc-900'/>
              <button className='px-5 py-2 text-sm font-normal text-orange-300 bg-orange-900 border-2 border-orange-900 active:scale-95 rounded-xl'
              onClick={() => handleUpdate(todo.id)}
              >
                Actualizar
              </button>
            </motion.div>
          ) : (
            // Sino se muestra el texto de la tarea y sus opciones de edicion, estado y eliminacion
            <div className='flex flex-col gap-5 text-white'>
              <motion.span layout style={{ textDecoration: todo.status === 'completed' ? 'line-through' : 'none' }}>
                {todo.text}
              </motion.span>
              <div className='flex justify-between gap-5 text-white'>
                <button onClick={() => handleUpdateStatus(todo.id)}>
                  {todo.status === 'undone' 
                    ? (
                      <span className='flex items-center gap-1'>
                        <BsCheck2Square />
                        Marcar como completada
                      </span>
                    ) : (
                      <span className='flex items-center gap-1'>
                        <TbRefresh />
                        Marcar como no completada
                      </span>
                    )}
                </button>
                <div className='flex items-center gap-2'>
                    <button onClick={() => handleEdit(todo.id, todo.text)} className='flex items-center gap-1'>
                      <FaRegEdit />
                      Editar
                    </button>
                    <button onClick={() => handleDelete(todo.id)} className='flex items-center gap-1 text-red-500'>
                      <RiDeleteBin7Line />
                      Eliminar
                    </button>
                </div>
              </div>
            </div>
          )}
        </motion.span>
      </motion.li>
    </>
  )
}
