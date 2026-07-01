import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { questionQuery } from '@/lib/queries'
import { VoteButtons } from '@/components/VoteButtons'

export const Route = createFileRoute('/questions/$questionId')({
  loader: ({ context: { queryClient }, params: { questionId } }) =>
    queryClient.ensureQueryData(questionQuery(questionId)),
  component: QuestionDetail,
})

function QuestionDetail() {
  const { questionId } = Route.useParams()
  const { data } = useSuspenseQuery(questionQuery(questionId))
  const { question, answers } = data

  return (
    <main className="mx-auto max-w-3xl p-8">
      <article className="flex gap-4 rounded border bg-white p-6">
        <VoteButtons target="question" id={question.id} votes={question.votes} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{question.title}</h1>
          <p className="mt-2 text-sm text-gray-500">
            por {question.authorName} · {question.votes} votos
          </p>
          <p className="mt-4 whitespace-pre-wrap">{question.body}</p>
        </div>
      </article>

      <h2 className="mt-8 text-xl font-bold">
        {answers.length} {answers.length === 1 ? 'respuesta' : 'respuestas'}
      </h2>

      <ul className="mt-4 space-y-4">
        {answers.map((a) => (
          <li key={a.id} className="flex gap-4 rounded border bg-white p-4">
            <VoteButtons target="answer" id={a.id} votes={a.votes} />
            <div className="flex-1">
              <p className="whitespace-pre-wrap">{a.body}</p>
              <p className="mt-2 text-sm text-gray-500">
                por {a.authorName} · {a.votes} votos
              </p>
            </div>
          </li>
        ))}
      </ul>

      <Outlet />
    </main>
  )
}
