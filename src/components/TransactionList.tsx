import { useMemo, useState } from 'react'
import type { Transaction, TxType } from '../types'
import { fmtDate } from '../lib/dates'
import { formatMoney } from '../lib/money'
import { Button, Card, CardBody, CardHeader, Input, Label, Select } from './ui'

type FilterType = 'all' | TxType

export function TransactionList({
  currency,
  transactions,
  onDelete,
}: {
  currency: string
  transactions: Transaction[]
  onDelete: (id: string) => void
}) {
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return transactions
      .filter((t) => (filterType === 'all' ? true : t.type === filterType))
      .filter((t) => {
        if (!q) return true
        return (
          t.category.toLowerCase().includes(q) ||
          t.note.toLowerCase().includes(q) ||
          t.date.toLowerCase().includes(q)
        )
      })
      .slice()
      .sort((a, b) => {
        if (a.date !== b.date) return a.date > b.date ? -1 : 1
        return b.createdAt - a.createdAt
      })
  }, [transactions, filterType, query])

  return (
    <Card>
      <CardHeader title="Transactions" subtitle={`${transactions.length} items (search & filter)`} />
      <CardBody>
        <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div>
            <Label>Filter</Label>
            <Select value={filterType} onChange={(e) => setFilterType(e.target.value as FilterType)}>
              <option value="all">All</option>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label>Search</Label>
            <Input placeholder="Category / note / date" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500">
            No matching records
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="grid grid-cols-12 gap-0 border-b border-slate-100 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600">
              <div className="col-span-3">Date</div>
              <div className="col-span-3">Category</div>
              <div className="col-span-4">Note</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>
            <ul className="divide-y divide-slate-100">
              {filtered.map((t) => {
                const sign = t.type === 'expense' ? '-' : '+'
                const amountCls = t.type === 'expense' ? 'text-rose-700' : 'text-emerald-700'
                return (
                  <li key={t.id} className="grid grid-cols-12 items-center gap-0 px-4 py-3">
                    <div className="col-span-3 text-sm text-slate-700">{fmtDate(t.date)}</div>
                    <div className="col-span-3 text-sm font-medium text-slate-900">{t.category}</div>
                    <div className="col-span-4 truncate text-sm text-slate-600" title={t.note}>
                      {t.note || <span className="text-slate-400">(none)</span>}
                    </div>
                    <div className={'col-span-2 text-right text-sm font-semibold ' + amountCls}>
                      {sign}
                      {formatMoney(t.amount, currency)}
                    </div>

                    <div className="col-span-12 mt-2 flex justify-end">
                      <Button
                        type="button"
                        variant="secondary"
                        className="h-8 px-2 text-xs"
                        onClick={() => {
                          if (confirm('Delete this record?')) onDelete(t.id)
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </CardBody>
    </Card>
  )
}
