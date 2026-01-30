import type React from 'react'
import type { PropsWithChildren } from 'react'

export function Card({ children }: PropsWithChildren) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-soft">
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-b border-slate-100 px-5 py-4">
      <div className="text-base font-semibold text-slate-900">{title}</div>
      {subtitle ? <div className="mt-1 text-sm text-slate-500">{subtitle}</div> : null}
    </div>
  )
}

export function CardBody({ children }: PropsWithChildren) {
  return <div className="px-5 py-4">{children}</div>
}

export function Label({ children }: PropsWithChildren) {
  return <div className="mb-1 text-xs font-medium text-slate-600">{children}</div>
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={
        "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 " +
        (props.className ?? '')
      }
    />
  )
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={
        "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 " +
        (props.className ?? '')
      }
    />
  )
}

export function Button({ variant = 'primary', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' }) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-4'

  const styles =
    variant === 'primary'
      ? 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-200'
      : variant === 'danger'
        ? 'bg-rose-600 text-white hover:bg-rose-500 focus:ring-rose-200'
        : 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-200'

  return (
    <button
      {...props}
      className={base + ' ' + styles + ' ' + (props.className ?? '')}
    />
  )
}
