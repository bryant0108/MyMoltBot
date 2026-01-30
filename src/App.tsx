import { useEffect, useMemo, useState } from 'react'
import './index.css'
import type { Transaction } from './types'
import { loadLedger, saveLedger } from './lib/storage'
import { SummaryCards } from './components/SummaryCards'
import { TransactionForm } from './components/TransactionForm'
import { TransactionList } from './components/TransactionList'
import { Card, CardBody, CardHeader, Input, Label } from './components/ui'

export default function App() {
  const initial = useMemo(() => loadLedger(), [])
  const [currency, setCurrency] = useState<string>(initial.currency)
  const [transactions, setTransactions] = useState<Transaction[]>(initial.transactions)

  useEffect(() => {
    saveLedger({ currency, transactions })
  }, [currency, transactions])

  function addTx(t: Transaction) {
    setTransactions((prev) => [t, ...prev])
  }

  function deleteTx(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  function resetAll() {
    if (!confirm('確定要清空所有資料嗎？此操作無法復原。')) return
    setTransactions([])
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div>
            <div className="text-lg font-semibold text-slate-900">MyMolt 記帳</div>
            <div className="text-sm text-slate-500">簡潔、可手機使用、資料留在本機</div>
          </div>
          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            onClick={resetAll}
          >
            清空資料
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-4 py-6">
        <SummaryCards currency={currency} transactions={transactions} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div className="md:col-span-3">
            <TransactionForm currency={currency} onAdd={addTx} />
          </div>
          <div className="md:col-span-2">
            <Card>
              <CardHeader title="設定" subtitle="可先用 SGD；也可改成 TWD / USD 等" />
              <CardBody>
                <Label>貨幣（ISO 4217，例如 SGD / TWD / USD）</Label>
                <Input
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value.toUpperCase().slice(0, 3))}
                  placeholder="SGD"
                />
                <div className="mt-3 text-xs text-slate-500">
                  提示：目前版本只做本機儲存；之後可以加雲端同步、分類管理、匯出 CSV。
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        <TransactionList currency={currency} transactions={transactions} onDelete={deleteTx} />

        <footer className="pt-2 text-center text-xs text-slate-500">
          建議：若你要跨裝置同步，我可以下一步幫你加「登入 + 雲端資料庫」。
        </footer>
      </main>
    </div>
  )
}
