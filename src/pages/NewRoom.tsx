import { Link } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

import { Button } from '../components/Button'

import logoImg from '../assets/images/logo.svg'
import illustrationImg from '../assets/images/illustration.svg'

import '../styles/home.scss'


export function NewRoom() {
  const { user } = useAuth()
  console.log(user)

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
          <h2>Create new room</h2>
          <form>
            <input 
              type="text" 
              placeholder="Enter the room name"
            />
            <Button type="submit">
              Create the room
            </Button>
          </form>
          <p>Do you want to join an existing room? <Link to="/">Click here</Link></p>
        </div>
      </main>
    </div>
  )
}