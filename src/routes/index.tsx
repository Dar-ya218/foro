import { createFileRoute, Link } from '@tanstack/react-router'

type Sort = 'newest' | 'votes' | 'unanswered'

const mockQuestions = [
  { id: '1', title: 'Cuando usar Server Functions vs route loader?', votes: 12 },
  { id: '2', title: 'Como configurar Nitro para Vercel?', votes: 8 },
]

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): { sort?: Sort } => {
    const sort = search.sort
    if (sort === 'newest' || sort === 'votes' || sort === 'unanswered') {
      return { sort }
    }
    return {}
  },
  loaderDeps: ({ search: { sort } }) => ({ sort: sort ?? 'newest' }),
  loader: async ({ deps: { sort } }) => {
    return mockQuestions
  },
  component: HomePage,
})

function HomePage() {
  const { sort = 'newest' } = Route.useSearch()
  const data = Route.useLoaderData()

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
        {data.map((q) => (
          <li key={q.id} className="rounded border bg-white p-4">
            <Link
              to="/questions/$questionId"
              params={{ questionId: q.id }}
              className="text-lg font-semibold text-blue-700 hover:underline"
            >
              {q.title}
            </Link>
            <p className="mt-1 text-sm text-gray-500">{q.votes} votos</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
