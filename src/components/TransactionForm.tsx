import { useMemo, useState } from 'react'
import type { Transaction, TxType } from '../types'
import { todayISO } from '../lib/dates'
import { Button, Card, CardBody, CardHeader, Input, Label, Select } from './ui'

const DEFAULT_CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Other']

export function TransactionForm({
  currency,
  onAdd,
}: {
  currency: string
  onAdd: (t: Transaction) => void
}) {
  const [type, setType] = useState<TxType>('expense')
  const [amount, setAmount] = useState<string>('')
  const [category, setCategory] = useState<string>('Food')
  const [note, setNote] = useState<string>('')
  const [date, setDate] = useState<string>(todayISO())

  const categories = useMemo(() => DEFAULT_CATEGORIES, [])

  function submit() {
    const n = Number(amount)
    if (!Number.isFinite(n) || n <= 0) return

    const t: Transaction = {
      id: crypto.randomUUID(),
      type,
      amount: Math.round(n * 100) / 100,
      currency,
      category: category.trim() || 'Other',
      note: note.trim(),
      date,
      createdAt: Date.now(),
    }

    onAdd(t)
    setAmount('')
    setNote('')
  }

  return (
    <Card>
      <CardHeader title="Add transaction" subtitle="Data is stored in your browser (localStorage)" />
      <CardBody>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label>Type</Label>
            <Select value={type} onChange={(e) => setType(e.target.value as TxType)}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Select>
          </div>

          <div>
            <Label>Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div>
            <Label>Amount ({currency})</Label>
            <Input
              inputMode="decimal"
              placeholder="e.g. 12.50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submit()
              }}
            />
          </div>

          <div>
            <Label>Category</Label>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label>Note (optional)</Label>
            <Input placeholder="e.g. lunch, taxi" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>

          <div className="md:col-span-2 flex items-center justify-end gap-2">
            <Button
              type="button"
              onClick={submit}
              disabled={!amount || Number(amount) <= 0}
              className="disabled:cursor-not-allowed disabled:opacity-60"
            >
              Add
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
