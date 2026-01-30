import type { CartItem, Product } from '../types'

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, it) => sum + it.qty, 0)
}

export function setQty(items: CartItem[], productId: string, qty: number): CartItem[] {
  const next = items.slice()
  const idx = next.findIndex((i) => i.productId === productId)
  if (qty <= 0) {
    if (idx >= 0) next.splice(idx, 1)
    return next
  }
  if (idx >= 0) next[idx] = { ...next[idx], qty }
  else next.unshift({ productId, qty })
  return next
}

export function addOne(items: CartItem[], productId: string) {
  const cur = items.find((i) => i.productId === productId)
  return setQty(items, productId, (cur?.qty ?? 0) + 1)
}

export function remove(items: CartItem[], productId: string) {
  return setQty(items, productId, 0)
}

export function subtotal(items: CartItem[], products: Product[]) {
  const map = new Map(products.map((p) => [p.id, p]))
  return items.reduce((sum, it) => sum + (map.get(it.productId)?.price ?? 0) * it.qty, 0)
}

export function deliveryFee(delivery: 'standard' | 'express') {
  return delivery === 'express' ? 8 : 0
}
