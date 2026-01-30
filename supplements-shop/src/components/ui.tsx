import type React from 'react'
import type { PropsWithChildren } from 'react'

export function Container({ children }: PropsWithChildren) {
  return <div className="mx-auto w-full max-w-6xl px-4">{children}</div>
}

export function Card({ children }: PropsWithChildren) {
  return <div className="rounded-2xl border border-slate-200 bg-white shadow-soft">{children}</div>
}

export function CardHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
      <div>
        <div className="text-base font-semibold text-slate-900">{title}</div>
        {subtitle ? <div className="mt-1 text-sm text-slate-500">{subtitle}</div> : null}
      </div>
      {right ? <div className="pt-0.5">{right}</div> : null}
    </div>
  )
}

export function CardBody({ children }: PropsWithChildren) {
  return <div className="px-5 py-4">{children}</div>
}

export function Badge({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
      {children}
    </span>
  )
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

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={
        "w-full min-h-[96px] resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 " +
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

export function Button({
  variant = 'primary',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' }) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60'

  const styles =
    variant === 'primary'
      ? 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-200'
      : variant === 'danger'
        ? 'bg-rose-600 text-white hover:bg-rose-500 focus:ring-rose-200'
        : 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-200'

  return <button {...props} className={base + ' ' + styles + ' ' + (props.className ?? '')} />
}

export function LinkButton({
  children,
  ...props
}: PropsWithChildren & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className={
        'inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 ' +
        (props.className ?? '')
      }
    >
      {children}
    </a>
  )
}
