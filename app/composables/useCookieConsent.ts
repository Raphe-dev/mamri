export type ConsentChoice = 'all' | 'necessary'

export const CONSENT_STORAGE_KEY = 'loi25-consent'
export const CONSENT_CHANGE_EVENT = 'loi25-consent-change'
export const CONSENT_VERSION = 1
const MAX_AGE_MS = 13 * 30 * 24 * 60 * 60 * 1000

interface StoredConsent {
  choice: ConsentChoice
  date: string
  version: number
}

function parseConsent(raw: string | null): StoredConsent | null {
  if (!raw) return null
  try {
    const data = JSON.parse(raw) as Partial<StoredConsent>
    if (data.choice !== 'all' && data.choice !== 'necessary') return null
    if (typeof data.date !== 'string' || typeof data.version !== 'number') return null
    return { choice: data.choice, date: data.date, version: data.version }
  } catch {
    return null
  }
}

function isExpired(entry: StoredConsent) {
  if (entry.version !== CONSENT_VERSION) return true
  const then = Date.parse(entry.date)
  if (Number.isNaN(then)) return true
  return Date.now() - then > MAX_AGE_MS
}

export function useCookieConsent() {
  const choice = useState<ConsentChoice | null>('loi25-choice', () => null)
  const visible = useState('loi25-banner', () => false)

  function persist(next: ConsentChoice) {
    const payload: StoredConsent = {
      choice: next,
      date: new Date().toISOString(),
      version: CONSENT_VERSION
    }
    choice.value = next
    visible.value = false
    if (!import.meta.client) return
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload))
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: payload }))
  }

  function hydrate() {
    if (!import.meta.client) return
    const stored = parseConsent(localStorage.getItem(CONSENT_STORAGE_KEY))
    if (!stored || isExpired(stored)) {
      choice.value = null
      visible.value = true
      return
    }
    choice.value = stored.choice
    visible.value = false
  }

  onMounted(hydrate)

  return {
    choice,
    visible,
    accept: () => persist('all'),
    refuse: () => persist('necessary'),
    reopen: () => {
      visible.value = true
    }
  }
}
