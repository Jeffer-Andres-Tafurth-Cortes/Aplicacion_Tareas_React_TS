import { InputHTMLAttributes, forwardRef } from 'react'
import cn from 'classnames'

// Este componente hace referencia a un input que va a ser tomado como referencia para ser reutilizable
export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...rest}, ref) => {

  return (
    <>
      <input {...rest} ref={ref}
        className={cn('w-full px-5 py-2 transparent border-2 outline-none border-zinc-600 rounded-xl placeholder:text-zinc-600 focus:border-white', className)}
      />
    </>
  )
})
