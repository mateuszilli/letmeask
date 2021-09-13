import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: Props) {
  return (
    <button className="button" {...props}/>
  )
}