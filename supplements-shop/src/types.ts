export type Product = {
  id: string
  slug: string
  name: string
  subtitle: string
  price: number
  currency: string
  size: string
  tags: string[]
  description: string
  ingredients: string[]
  highlights: string[]
  caution?: string
}

export type CartItem = {
  productId: string
  qty: number
}

export type OrderDraft = {
  email: string
  fullName: string
  phone: string
  address1: string
  address2: string
  city: string
  postalCode: string
  country: string
  delivery: 'standard' | 'express'
  note: string
}
