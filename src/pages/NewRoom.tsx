import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getDatabase, ref, push } from 'firebase/database'

import { useAuth } from '../hooks/useAuth'

import { Button } from '../components/Button'

import logoImg from '../assets/images/logo.svg'
import illustrationImg from '../assets/images/illustration.svg'

import '../styles/home.scss'


export function NewRoom() {
  const [newRoom, setNewRoom] = useState('')

  const { user } = useAuth()
  const history = useHistory()
  
  async function handleNewRoom(event: FormEvent) {
    event.preventDefault()
    
    if (newRoom.trim() === '') return

    const database = getDatabase();
    const roomRef = ref(database, 'rooms')

    const room = await push(roomRef, {
      title: newRoom,
      userId: user?.id
    })

    history.push(`/rooms/${room.key}`)
  }

  return (
    <div id="container-home">
      <aside>
        <img src={illustrationImg} alt="Illustration" />
        <strong>Create live Q&amp;A rooms</strong>
        <p>Ask your audience questions in real time</p>
      </aside>
      <main>
        <div>
          <img src={logoImg} alt="Letmeask" />
          <h2>Create new room</h2>
          <form onSubmit={handleNewRoom}>
            <input 
              type="text" 
              placeholder="Enter the room name"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Create the room</Button>
          </form>
          <p>Do you want to join an existing room? <Link to="/">Click here</Link></p>
        </div>
      </main>
    </div>
  )
}