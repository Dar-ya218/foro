import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/questions/$questionId')({
  component: QuestionDetail,
})

function QuestionDetail() {
  const { questionId } = Route.useParams()

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-bold">Pregunta #{questionId}</h1>
      {/* Aqui se renderizan las rutas anidadas (answers/$answerId) */}
      <Outlet />
    </main>
  )
}
