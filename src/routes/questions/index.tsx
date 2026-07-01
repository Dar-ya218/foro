import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/questions/')({
  component: QuestionsIndex,
})

function QuestionsIndex() {
  return <p>Listado completo (lo conectamos luego).</p>
}
