import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off } from 'firebase/database'

import { useAuth } from './useAuth';

type Question = {
  key: string
  content: string
  author: {
    name: string
    avatar: string
  };
  isHighlighted: boolean
  isAnswered: boolean
  likes: number
  likeKey: string | undefined
}

type SnapshotQuestions = Record<string, {
  key: string
  content: string
  author: {
    name: string
    avatar: string
  };
  isHighlighted: boolean
  isAnswered: boolean
  likes: Record<string, {
    userId: string;
  }>
}>

export function useRoom(key: string) {
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])

  const { user } = useAuth()

  useEffect(() => {
    const database = getDatabase();
    const roomRef = ref(database, `rooms/${key}`)

    onValue(roomRef, (snapshot) => {
      const snapshotRoom = snapshot.val()
      const snapshotQuestions: SnapshotQuestions = snapshotRoom.questions ?? {}

      const parsedQuestions = Object.entries(snapshotQuestions)
        .map(([key, { content, author, isHighlighted, isAnswered, likes }]) => {
          return {
            key,
            content,
            author,
            isHighlighted,
            isAnswered,
            likes: Object.values(likes ?? {}).length,
            likeKey: Object.entries(likes ?? {}).find(([likeKey, { userId }]) => userId === user?.id)?.[0]
          }
        })

      setTitle(snapshotRoom.title)
      setQuestions(parsedQuestions)
    });

    const unsubscribe = () => off(roomRef)

    return () => {
      unsubscribe();
    }

  }, [key, user?.id])

  return {
    title,
    questions
  }
}