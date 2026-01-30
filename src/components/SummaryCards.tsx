import { Card, CardBody } from './ui'
import { formatMoney, totals } from '../lib/money'
import type { Transaction } from '../types'

function Stat({ label, value, tone }: { label: string; value: string; tone: 'neutral' | 'good' | 'bad' }) {
  const toneCls =
    tone === 'good'
      ? 'bg-emerald-50 text-emerald-900 ring-emerald-100'
      : tone === 'bad'
        ? 'bg-rose-50 text-rose-900 ring-rose-100'
        : 'bg-slate-50 text-slate-900 ring-slate-100'

  return (
    <div className={'rounded-2xl px-4 py-3 ring-1 ' + toneCls}>
      <div className="text-xs font-medium text-slate-600">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  )
}

export function SummaryCards({ currency, transactions }: { currency: string; transactions: Transaction[] }) {
  const t = totals(transactions)

  return (
    <Card>
      <CardBody>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Stat label="收入" value={formatMoney(t.income, currency)} tone="good" />
          <Stat label="支出" value={formatMoney(t.expense, currency)} tone="bad" />
          <Stat label="結餘" value={formatMoney(t.net, currency)} tone="neutral" />
        </div>
      </CardBody>
    </Card>
  )
}
