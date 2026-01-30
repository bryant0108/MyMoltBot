export type TxType = 'expense' | 'income'

export type Transaction = {
  id: string
  type: TxType
  amount: number
  currency: string
  category: string
  note: string
  date: string // YYYY-MM-DD
  createdAt: number
}
