import type { CartItem, OrderDraft } from '../types'

const CART_KEY = 'suppshop:cart:v1'
const ORDER_DRAFT_KEY = 'suppshop:orderDraft:v1'

export function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as CartItem[]) : []
  } catch {
    return []
  }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export function loadOrderDraft(): OrderDraft {
  try {
    const raw = localStorage.getItem(ORDER_DRAFT_KEY)
    if (!raw) {
      return {
        email: '',
        fullName: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        postalCode: '',
        country: 'Singapore',
        delivery: 'standard',
        note: '',
      }
    }
    const p = JSON.parse(raw) as Partial<OrderDraft>
    return {
      email: p.email ?? '',
      fullName: p.fullName ?? '',
      phone: p.phone ?? '',
      address1: p.address1 ?? '',
      address2: p.address2 ?? '',
      city: p.city ?? '',
      postalCode: p.postalCode ?? '',
      country: p.country ?? 'Singapore',
      delivery: p.delivery === 'express' ? 'express' : 'standard',
      note: p.note ?? '',
    }
  } catch {
    return {
      email: '',
      fullName: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      postalCode: '',
      country: 'Singapore',
      delivery: 'standard',
      note: '',
    }
  }
}

export function saveOrderDraft(draft: OrderDraft) {
  localStorage.setItem(ORDER_DRAFT_KEY, JSON.stringify(draft))
}

export function clearOrderDraft() {
  localStorage.removeItem(ORDER_DRAFT_KEY)
}

export function clearCart() {
  localStorage.removeItem(CART_KEY)
}
