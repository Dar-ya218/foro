// Almacén en memoria solo para el taller.
// En producción esto se reinicia con cada deploy.

import type { Answer, Question, User } from '@/lib/types'

export const db = {
  users: [
    { id: 'u1', name: 'carlos' },
    { id: 'u2', name: 'julia' },
  ] as User[],

  questions: [
    {
      id: 'q1',
      title: 'Cuando usar server function vs route loader?',
      body: 'Estoy migrando un proyecto y no tengo claro la diferencia.',
      authorId: 'u1',
      authorName: 'carlos',
      votes: 12,
      createdAt: new Date('2026-05-15').toISOString(),
      answerCount: 2,
    },
    {
      id: 'q2',
      title: 'Como configurar Nitro para Vercel?',
      body: 'El docs menciona el plugin pero no veo donde va.',
      authorId: 'u2',
      authorName: 'julia',
      votes: 8,
      createdAt: new Date('2026-05-18').toISOString(),
      answerCount: 0,
    },
  ] as Question[],

  answers: [
    {
      id: 'a1',
      questionId: 'q1',
      body: 'Loader corre siempre que entras a la ruta. Server function la llamas tu cuando quieres (un click, una mutation).',
      authorId: 'u2',
      authorName: 'julia',
      votes: 5,
      createdAt: new Date('2026-05-16').toISOString(),
    },
    {
      id: 'a2',
      questionId: 'q1',
      body: 'En la practica: GETs en loader, mutations en server function.',
      authorId: 'u1',
      authorName: 'carlos',
      votes: 3,
      createdAt: new Date('2026-05-17').toISOString(),
    },
  ] as Answer[],
}

export function nextId(prefix: string) {
  return `${prefix}${Math.random().toString(36).slice(2, 8)}`
}
