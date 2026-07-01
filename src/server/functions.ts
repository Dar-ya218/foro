import { db } from './db'

export type Sort = 'newest' | 'votes' | 'unanswered'

export function getQuestions(sort: Sort = 'newest') {
  if (sort === 'votes') {
    return [...db.questions].sort((a, b) => b.votes - a.votes)
  }

  if (sort === 'unanswered') {
    return db.questions.filter((question) => question.answerCount === 0)
  }

  return [...db.questions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}
