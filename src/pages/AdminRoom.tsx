import { useHistory, useParams } from 'react-router-dom'
import { getDatabase, ref, remove, update } from 'firebase/database'

import { useRoom } from '../hooks/useRoom'

import { Button } from '../components/Button'
import { RoomKey } from '../components/RoomKey'
import { Question } from '../components/Question'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'

import '../styles/room.scss'

type Params = {
  id: string
}

export function AdminRoom() {
  const { id: roomKey } = useParams<Params>()

  const { title, questions } = useRoom(roomKey)
  const history = useHistory()

  async function handleCloseRoom() {
    const database = getDatabase()
    const roomRef = ref(database, `rooms/${roomKey}`)

    await update(roomRef, {
      closedAt: new Date()
    })

    history.push('/')
  }

  async function handleRemoveQuestion(questionKey: string) {
    const confirm = window.confirm('Are you sure you want to delete this question?')
    
    if (confirm) {
      const database = getDatabase()
      const questionRef = ref(database, `rooms/${roomKey}/questions/${questionKey}`)

      await remove(questionRef)
    }
  }

  return (
    <div id="container-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask"/>
          <div>
            <RoomKey code={roomKey} />
            <Button outlined onClick={() => handleCloseRoom()}>
              Close room
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="title">
          <h1>Room {title}</h1>
          { questions.length > 0 && (<span>{questions.length} questions</span>) }
        </div>

        <div className="questions-list">
          {questions.map(({key, content, author}) => {
            return (
              <Question
                key={key} 
                content={content}
                author={author}
              >
                <button 
                  type="button"
                  onClick={() => handleRemoveQuestion(key)}
                >
                  <img src={deleteImg} alt="Remove question" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}