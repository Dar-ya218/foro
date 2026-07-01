export type User = {
  id: string
  name: string
}

export type Question = {
  id: string
  title: string
  body: string
  authorId: string
  authorName: string
  votes: number
  createdAt: string
  answerCount: number
}

export type Answer = {
  id: string
  questionId: string
  body: string
  authorId: string
  authorName: string
  votes: number
  createdAt: string
}
