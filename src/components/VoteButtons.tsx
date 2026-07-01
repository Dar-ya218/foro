import { useMutation, useQueryClient } from '@tanstack/react-query'
import { vote } from '@/server/functions'

type Props = {
  target: 'question' | 'answer'
  id: string
  votes: number
  onLocalChange?: (newVotes: number) => void
}

export function VoteButtons({ target, id, votes, onLocalChange }: Props) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (direction: 1 | -1) =>
      vote({ data: { target, id, direction } }),
    onMutate: async (direction) => {
      await queryClient.cancelQueries({ queryKey: ['question'] })
      await queryClient.cancelQueries({ queryKey: ['questions'] })

      return { previousVotes: votes, direction }
    },
    onError: (_err, _direction, context) => {
      if (context) onLocalChange?.(context.previousVotes)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['question'] })
      queryClient.invalidateQueries({ queryKey: ['questions'] })
    },
  })

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        disabled={mutation.isPending}
        onClick={() => {
          onLocalChange?.(votes + 1)
          mutation.mutate(1)
        }}
        className="rounded border px-2 py-1 hover:bg-gray-100 disabled:opacity-50"
      >
        ▲
      </button>
      <span className="font-mono text-sm">{votes}</span>
      <button
        type="button"
        disabled={mutation.isPending}
        onClick={() => {
          onLocalChange?.(votes - 1)
          mutation.mutate(-1)
        }}
        className="rounded border px-2 py-1 hover:bg-gray-100 disabled:opacity-50"
      >
        ▼
      </button>
    </div>
  )
}
