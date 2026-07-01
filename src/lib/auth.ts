import type { User } from './types'

const KEY = 'foro-qa:user'

export const auth = {
  get(): User | null {
    if (typeof window === 'undefined') return null
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as User
    } catch {
      return null
    }
  },
  set(user: User) {
    window.localStorage.setItem(KEY, JSON.stringify(user))
    window.dispatchEvent(new Event('auth-change'))
  },
  clear() {
    window.localStorage.removeItem(KEY)
    window.dispatchEvent(new Event('auth-change'))
  },
}
