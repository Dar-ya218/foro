import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ask')({
  component: AskPage,
})

function AskPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-bold">Nueva pregunta</h1>
    </main>
  )
}
