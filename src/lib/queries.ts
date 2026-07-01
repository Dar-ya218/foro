import { queryOptions } from '@tanstack/react-query'
import { getQuestions, getQuestion } from '@/server/functions'

export const questionsQuery = (sort: 'newest' | 'votes' | 'unanswered') =>
  queryOptions({
    queryKey: ['questions', { sort }] as const,
    queryFn: () => getQuestions({ data: sort }),
  })

export const questionQuery = (questionId: string) =>
  queryOptions({
    queryKey: ['question', { questionId }] as const,
    queryFn: () => getQuestion({ data: questionId }),
  })
