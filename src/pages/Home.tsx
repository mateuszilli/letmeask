import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { getDatabase, ref, get } from 'firebase/database'

import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button'

import logoImg from '../assets/images/logo.svg'
import illustrationImg from '../assets/images/illustration.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/home.scss'

export function Home() {
  const [roomKey, setRoomKey] = useState('')

  const { user, signInWithGoogle } = useAuth()
  const history = useHistory()

  async function handleNewRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomKey.trim() === '') return

    const database = getDatabase();
    const roomRef = ref(database, `rooms/${roomKey}`)
    const room = await get(roomRef)

    if (!room.exists()) return alert('Room does not exists')
    if (room.val().closedAt) return alert('Room already closed')

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
          <button onClick={handleNewRoom}>
            <img src={googleIconImg} alt="Google" />
            Create your room with google 
          </button>
          <div>or join a room</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder="Enter the room code"
              onChange={event => setRoomKey(event.target.value)}
              value={roomKey}
            />
            <Button type="submit">Join the room</Button>
          </form>
        </div>
      </main>
    </div>
  )
}