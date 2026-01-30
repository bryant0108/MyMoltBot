import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { CartItem, OrderDraft } from '../types'
import { PRODUCTS } from '../data/products'
import { deliveryFee, subtotal } from '../lib/cart'
import { formatMoney } from '../lib/money'
import { clearOrderDraft, loadOrderDraft, saveOrderDraft } from '../lib/storage'
import { Button, Card, CardBody, CardHeader, Container, Input, Label, Select, Textarea } from '../components/ui'

export function CheckoutPage({
  cart,
  onPlaceOrder,
}: {
  cart: CartItem[]
  onPlaceOrder: () => void
}) {
  const navigate = useNavigate()
  const currency = PRODUCTS[0]?.currency ?? 'SGD'

  const [draft, setDraft] = useState<OrderDraft>(() => loadOrderDraft())

  useEffect(() => {
    saveOrderDraft(draft)
  }, [draft])

  const sub = useMemo(() => subtotal(cart, PRODUCTS), [cart])
  const ship = deliveryFee(draft.delivery)
  const total = sub + ship

  const canSubmit = cart.length > 0 && draft.email && draft.fullName && draft.phone && draft.address1 && draft.city && draft.postalCode

  function submit() {
    if (!canSubmit) return
    onPlaceOrder()
    clearOrderDraft()
    navigate('/success')
  }

  return (
    <Container>
      <div className="py-6">
        <div className="mb-4 flex items-center justify-between">
          <Link to="/cart" className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            ← Back to cart
          </Link>
          <button
            className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            type="button"
            onClick={() => {
              if (confirm('Clear saved checkout info?')) {
                clearOrderDraft()
                setDraft(loadOrderDraft())
              }
            }}
          >
            Reset form
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div className="md:col-span-3">
            <Card>
              <CardHeader title="Checkout" subtitle="Demo checkout flow — no payment is collected." />
              <CardBody>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <Label>Email</Label>
                    <Input value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} placeholder="you@example.com" />
                  </div>
                  <div>
                    <Label>Full name</Label>
                    <Input value={draft.fullName} onChange={(e) => setDraft({ ...draft, fullName: e.target.value })} placeholder="Your name" />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} placeholder="+65 ..." />
                  </div>

                  <div className="md:col-span-2">
                    <Label>Address line 1</Label>
                    <Input value={draft.address1} onChange={(e) => setDraft({ ...draft, address1: e.target.value })} placeholder="Street, building, unit" />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Address line 2 (optional)</Label>
                    <Input value={draft.address2} onChange={(e) => setDraft({ ...draft, address2: e.target.value })} placeholder="Apartment, floor, etc." />
                  </div>

                  <div>
                    <Label>City</Label>
                    <Input value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} placeholder="Singapore" />
                  </div>
                  <div>
                    <Label>Postal code</Label>
                    <Input value={draft.postalCode} onChange={(e) => setDraft({ ...draft, postalCode: e.target.value })} placeholder="XXXXX" />
                  </div>

                  <div>
                    <Label>Country</Label>
                    <Input value={draft.country} onChange={(e) => setDraft({ ...draft, country: e.target.value })} />
                  </div>
                  <div>
                    <Label>Delivery</Label>
                    <Select value={draft.delivery} onChange={(e) => setDraft({ ...draft, delivery: e.target.value as OrderDraft['delivery'] })}>
                      <option value="standard">Standard (Free)</option>
                      <option value="express">Express (+{formatMoney(8, currency)})</option>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label>Order note (optional)</Label>
                    <Textarea value={draft.note} onChange={(e) => setDraft({ ...draft, note: e.target.value })} placeholder="Any delivery instructions..." />
                  </div>

                  <div className="md:col-span-2 flex justify-end">
                    <Button type="button" onClick={submit} disabled={!canSubmit}>
                      Place order
                    </Button>
                  </div>

                  {!canSubmit ? (
                    <div className="md:col-span-2 text-xs text-slate-500">
                      Fill required fields (email, name, phone, address, city, postal code) and add items to cart.
                    </div>
                  ) : null}
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader title="Order summary" subtitle={`${cart.length} item(s)`} />
              <CardBody>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <div className="text-slate-600">Subtotal</div>
                    <div className="font-semibold">{formatMoney(sub, currency)}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-slate-600">Shipping</div>
                    <div className="font-semibold">{formatMoney(ship, currency)}</div>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between">
                    <div className="text-slate-900 font-semibold">Total</div>
                    <div className="text-slate-900 font-semibold">{formatMoney(total, currency)}</div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-xs text-slate-600 ring-1 ring-slate-100">
                    MVP note: this demo stores cart data locally and shows an order success screen.
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  )
}
