import { createFileRoute, Link } from '@tanstack/react-router'
import { getQuestions } from '@/server/functions'

type Sort = 'newest' | 'votes' | 'unanswered'

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): { sort?: Sort } => {
    const sort = search.sort
    if (sort === 'newest' || sort === 'votes' || sort === 'unanswered') {
      return { sort }
    }
    return {}
  },
  loaderDeps: ({ search: { sort } }) => ({ sort: sort ?? 'newest' }),
  loader: ({ deps: { sort } }) => getQuestions({ data: sort }),
  component: HomePage,
})

function HomePage() {
  const { sort = 'newest' } = Route.useSearch()
  const questions = Route.useLoaderData()

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">Preguntas recientes</h1>

      <div className="mt-4 flex gap-2 text-sm">
        {(['newest', 'votes', 'unanswered'] as const).map((s) => (
          <Link
            key={s}
            to="/"
            search={{ sort: s }}
            className={
              sort === s
                ? 'rounded bg-blue-600 px-3 py-1 text-white'
                : 'rounded border px-3 py-1 hover:bg-gray-100'
            }
          >
            {s}
          </Link>
        ))}
      </div>

      <ul className="mt-6 space-y-3">
        {questions.map((question) => (
          <li key={question.id} className="rounded border bg-white p-4">
            <Link
              to="/questions/$questionId"
              params={{ questionId: question.id }}
              className="text-lg font-semibold text-blue-700 hover:underline"
            >
              {question.title}
            </Link>
            <p className="mt-1 text-sm text-gray-500">
              {question.votes} votos · {question.answerCount} respuestas
            </p>
          </li>
        ))}
      </ul>
    </main>
  )
}
