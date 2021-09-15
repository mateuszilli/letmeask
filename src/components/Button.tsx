import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  outlined?: boolean
}

export function Button({ outlined = false, ...props }: Props) {
  return (
    <button 
      className={`button ${outlined ? 'outlined' : ''}`} 
      {...props}
    />
  )
}