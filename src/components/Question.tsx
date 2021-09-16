import { ReactNode } from 'react'

import '../styles/question.scss'

type Props = {
  content: string
  author: {
    name: string
    avatar: string
  }
  isHighlighted?: boolean
  isAnswered?: boolean
  children?: ReactNode
}

export function Question({
  content, 
  author, 
  children, 
  isHighlighted = false, 
  isAnswered = false
}: Props) {
  return (
    <div className={`question ${isHighlighted && !isAnswered ? 'highlighted' : ''} ${isAnswered ? 'answered' : ''}`}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div className="buttons">{children}</div>
      </footer>
    </div>
  )
}