import { createServerFn } from '@tanstack/react-start'
import { db, nextId } from './db'
import type { Question, Answer } from '@/lib/types'

// ===== READS =====

export const getQuestions = createServerFn({ method: 'GET' })
  .validator((sort?: 'newest' | 'votes' | 'unanswered') => sort ?? 'newest')
  .handler(async ({ data: sort }): Promise<Question[]> => {
    const list = [...db.questions]
    if (sort === 'votes') list.sort((a, b) => b.votes - a.votes)
    else if (sort === 'unanswered')
      return list.filter((q) => q.answerCount === 0)
    else
      list.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    return list
  })

export const getQuestion = createServerFn({ method: 'GET' })
  .validator((questionId: string) => questionId)
  .handler(async ({ data: questionId }) => {
    const question = db.questions.find((q) => q.id === questionId)
    if (!question) throw new Error('Pregunta no encontrada')
    const answers = db.answers
      .filter((a) => a.questionId === questionId)
      .sort((a, b) => b.votes - a.votes)
    return { question, answers }
  })

// ===== WRITES =====

type CreateQuestionInput = {
  title: string
  body: string
  authorId: string
}

export const createQuestion = createServerFn({ method: 'POST' })
  .validator((data: CreateQuestionInput) => {
    if (!data.title || data.title.length < 5)
      throw new Error('El título debe tener al menos 5 caracteres')
    if (!data.body || data.body.length < 10)
      throw new Error('El cuerpo debe tener al menos 10 caracteres')
    return data
  })
  .handler(async ({ data }): Promise<Question> => {
    const user = db.users.find((u) => u.id === data.authorId)
    if (!user) throw new Error('Usuario no encontrado')

    const question: Question = {
      id: nextId('q'),
      title: data.title.trim(),
      body: data.body.trim(),
      authorId: user.id,
      authorName: user.name,
      votes: 0,
      createdAt: new Date().toISOString(),
      answerCount: 0,
    }
    db.questions.push(question)
    return question
  })

type CreateAnswerInput = {
  questionId: string
  body: string
  authorId: string
}

export const createAnswer = createServerFn({ method: 'POST' })
  .validator((data: CreateAnswerInput) => {
    if (!data.body || data.body.length < 5)
      throw new Error('La respuesta debe tener al menos 5 caracteres')
    return data
  })
  .handler(async ({ data }): Promise<Answer> => {
    const question = db.questions.find((q) => q.id === data.questionId)
    if (!question) throw new Error('Pregunta no encontrada')
    const user = db.users.find((u) => u.id === data.authorId)
    if (!user) throw new Error('Usuario no encontrado')

    const answer: Answer = {
      id: nextId('a'),
      questionId: data.questionId,
      body: data.body.trim(),
      authorId: user.id,
      authorName: user.name,
      votes: 0,
      createdAt: new Date().toISOString(),
    }
    db.answers.push(answer)
    question.answerCount += 1
    return answer
  })

// ===== VOTE =====

type VoteInput = {
  target: 'question' | 'answer'
  id: string
  direction: 1 | -1
}

export const vote = createServerFn({ method: 'POST' })
  .validator((data: VoteInput) => data)
  .handler(async ({ data }) => {
    const collection = data.target === 'question' ? db.questions : db.answers
    const item = collection.find((x) => x.id === data.id)
    if (!item) throw new Error('No encontrado')
    item.votes += data.direction
    return { id: item.id, votes: item.votes }
  })

// ===== LOGIN (simplificado) =====

export const login = createServerFn({ method: 'POST' })
  .validator((name: string) => {
    if (!name || name.length < 2)
      throw new Error('Nombre demasiado corto')
    return name.toLowerCase().trim()
  })
  .handler(async ({ data: name }) => {
    let user = db.users.find((u) => u.name === name)
    if (!user) {
      user = { id: nextId('u'), name }
      db.users.push(user)
    }
    return user
  })
