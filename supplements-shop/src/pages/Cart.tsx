import { Link } from 'react-router-dom'
import type { CartItem } from '../types'
import { PRODUCTS } from '../data/products'
import { addOne, remove, setQty, subtotal } from '../lib/cart'
import { formatMoney } from '../lib/money'
import { Button, Card, CardBody, CardHeader, Container, Input } from '../components/ui'

export function CartPage({
  cart,
  setCart,
}: {
  cart: CartItem[]
  setCart: (next: CartItem[]) => void
}) {
  const map = new Map(PRODUCTS.map((p) => [p.id, p]))
  const currency = PRODUCTS[0]?.currency ?? 'SGD'
  const sub = subtotal(cart, PRODUCTS)

  return (
    <Container>
      <div className="py-6">
        <Card>
          <CardHeader
            title="Cart"
            subtitle={cart.length ? `${cart.length} items` : 'Your cart is empty'}
            right={
              cart.length ? (
                <Button variant="secondary" onClick={() => setCart([])}>
                  Clear cart
                </Button>
              ) : null
            }
          />
          <CardBody>
            {cart.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-10 text-center">
                <div className="text-sm text-slate-600">No items yet.</div>
                <Link to="/" className="mt-3 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                  Browse products
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((it) => {
                  const p = map.get(it.productId)
                  if (!p) return null
                  return (
                    <div key={it.productId} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                          <div className="mt-1 text-xs text-slate-500">{p.size}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="secondary"
                            type="button"
                            className="h-9 w-9 px-0"
                            onClick={() => setCart(setQty(cart, it.productId, it.qty - 1))}
                          >
                            -
                          </Button>
                          <Input
                            className="h-9 w-20 text-center"
                            inputMode="numeric"
                            value={String(it.qty)}
                            onChange={(e) => {
                              const n = Number(e.target.value)
                              if (!Number.isFinite(n)) return
                              setCart(setQty(cart, it.productId, Math.max(0, Math.floor(n))))
                            }}
                          />
                          <Button
                            variant="secondary"
                            type="button"
                            className="h-9 w-9 px-0"
                            onClick={() => setCart(addOne(cart, it.productId))}
                          >
                            +
                          </Button>
                        </div>

                        <div className="flex items-center justify-between gap-3 md:w-56 md:justify-end">
                          <div className="text-sm font-semibold text-slate-900">
                            {formatMoney(p.price * it.qty, p.currency)}
                          </div>
                          <Button variant="secondary" type="button" onClick={() => setCart(remove(cart, it.productId))}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-slate-600">Subtotal</div>
                    <div className="font-semibold text-slate-900">{formatMoney(sub, currency)}</div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Link
                      to="/checkout"
                      className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </Container>
  )
}
