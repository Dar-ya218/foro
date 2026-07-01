import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, type SyntheticEvent } from 'react'
import { login } from '@/server/functions'
import { auth } from '@/lib/auth'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const user = await login({ data: name })
      auth.set(user)
      navigate({ to: '/' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="text-2xl font-bold">Entrar al foro</h1>
      <p className="mt-1 text-sm text-gray-600">
        Solo necesitas un nombre. Si no existe, te creamos cuenta.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="tu nombre"
          className="w-full rounded border px-3 py-2"
          required
          minLength={2}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </main>
  )
}
