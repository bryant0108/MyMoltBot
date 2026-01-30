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
      <CardHeader title="明細" subtitle={`${transactions.length} 筆（可搜尋、可篩選）`} />
      <CardBody>
        <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div>
            <Label>篩選</Label>
            <Select value={filterType} onChange={(e) => setFilterType(e.target.value as FilterType)}>
              <option value="all">全部</option>
              <option value="expense">支出</option>
              <option value="income">收入</option>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label>搜尋</Label>
            <Input placeholder="輸入分類 / 備註 / 日期" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500">
            沒有符合條件的資料
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="grid grid-cols-12 gap-0 border-b border-slate-100 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600">
              <div className="col-span-3">日期</div>
              <div className="col-span-3">分類</div>
              <div className="col-span-4">備註</div>
              <div className="col-span-2 text-right">金額</div>
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
                      {t.note || <span className="text-slate-400">（無）</span>}
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
                          if (confirm('確定要刪除這筆記錄嗎？')) onDelete(t.id)
                        }}
                      >
                        刪除
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
