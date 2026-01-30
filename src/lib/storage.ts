import type { Transaction } from '../types'

const STORAGE_KEY = 'mymoltbot:ledger:v1'

export type LedgerState = {
  currency: string
  transactions: Transaction[]
}

export function loadLedger(): LedgerState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { currency: 'SGD', transactions: [] }
    const parsed = JSON.parse(raw) as Partial<LedgerState>
    return {
      currency: typeof parsed.currency === 'string' ? parsed.currency : 'SGD',
      transactions: Array.isArray(parsed.transactions) ? (parsed.transactions as Transaction[]) : [],
    }
  } catch {
    return { currency: 'SGD', transactions: [] }
  }
}

export function saveLedger(state: LedgerState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
