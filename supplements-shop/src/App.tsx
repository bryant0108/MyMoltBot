import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import type { CartItem } from './types'
import { loadCart, saveCart } from './lib/storage'
import { cartCount, addOne } from './lib/cart'
import { SiteHeader } from './components/SiteHeader'
import { Shop } from './pages/Shop'
import { ProductDetail } from './pages/ProductDetail'
import { CartPage } from './pages/Cart'
import { CheckoutPage } from './pages/Checkout'
import { SuccessPage } from './pages/Success'

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => loadCart())

  useEffect(() => {
    saveCart(cart)
  }, [cart])

  const count = useMemo(() => cartCount(cart), [cart])

  function addToCart(productId: string) {
    setCart((prev) => addOne(prev, productId))
  }

  function placeOrder() {
    // MVP: just clear cart
    setCart([])
  }

  return (
    <div className="min-h-screen">
      <SiteHeader cartCount={count} />

      <Routes>
        <Route path="/" element={<Shop onAddToCart={addToCart} />} />
        <Route path="/product/:slug" element={<ProductDetail onAddToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} onPlaceOrder={placeOrder} />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-500">
          Disclaimer: This demo is for UI/flow only. Always consult a professional for health-related advice.
        </div>
      </footer>
    </div>
  )
}
