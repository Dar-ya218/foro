import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/questions/$questionId/answers/$answerId',
)({
  component: AnswerDetail,
})

function AnswerDetail() {
  const { questionId, answerId } = Route.useParams()
  return (
    <section className="mt-6 border-t pt-6">
      <h2 className="text-xl font-bold">
        Respuesta {answerId} a la pregunta {questionId}
      </h2>
    </section>
  )
}
