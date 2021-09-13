import { useHistory } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button'

import logoImg from '../assets/images/logo.svg'
import illustrationImg from '../assets/images/illustration.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/home.scss'

export function Home() {
  const history = useHistory()
  const { user, signInWithGoogle } = useAuth()

  async function handleNewRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  return (
    <div id="container">
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
          <form>
            <input 
              type="text" 
              placeholder="Enter the room code"
            />
            <Button type="submit">
              Join the room
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}