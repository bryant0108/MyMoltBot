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
      <CardHeader title="新增記帳" subtitle="資料會儲存在你的瀏覽器（localStorage）" />
      <CardBody>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label>類型</Label>
            <Select value={type} onChange={(e) => setType(e.target.value as TxType)}>
              <option value="expense">支出</option>
              <option value="income">收入</option>
            </Select>
          </div>

          <div>
            <Label>日期</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div>
            <Label>金額（{currency}）</Label>
            <Input
              inputMode="decimal"
              placeholder="例如 12.50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submit()
              }}
            />
          </div>

          <div>
            <Label>分類</Label>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label>備註（可選）</Label>
            <Input placeholder="例如：午餐、計程車" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>

          <div className="md:col-span-2 flex items-center justify-end gap-2">
            <Button
              type="button"
              onClick={submit}
              disabled={!amount || Number(amount) <= 0}
              className="disabled:cursor-not-allowed disabled:opacity-60"
            >
              新增
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
