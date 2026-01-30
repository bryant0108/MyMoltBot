import { Link, useParams } from 'react-router-dom'
import { getProductBySlug } from '../data/products'
import { formatMoney } from '../lib/money'
import { Badge, Button, Card, CardBody, Container } from '../components/ui'

export function ProductDetail({ onAddToCart }: { onAddToCart: (productId: string) => void }) {
  const { slug } = useParams()
  const p = slug ? getProductBySlug(slug) : undefined

  if (!p) {
    return (
      <Container>
        <div className="py-10">
          <div className="text-lg font-semibold">Product not found</div>
          <div className="mt-3">
            <Link to="/" className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Back to shop
            </Link>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="py-6">
        <div className="mb-4 flex items-center justify-between">
          <Link to="/" className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            ← Back
          </Link>
          <div className="text-sm text-slate-500">Product</div>
        </div>

        <Card>
          <CardBody>
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="md:max-w-2xl">
                <div className="text-2xl font-semibold text-slate-900">{p.name}</div>
                <div className="mt-2 text-sm text-slate-600">{p.subtitle}</div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>

                <div className="mt-5 text-sm leading-6 text-slate-700">{p.description}</div>

                <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                    <div className="text-xs font-medium text-slate-600">Highlights</div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-800">
                      {p.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                    <div className="text-xs font-medium text-slate-600">Ingredients</div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-800">
                      {p.ingredients.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {p.caution ? (
                  <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    <div className="font-semibold">Caution</div>
                    <div className="mt-1 text-amber-800">{p.caution}</div>
                  </div>
                ) : null}
              </div>

              <div className="w-full max-w-sm">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-sm text-slate-500">Price</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-900">{formatMoney(p.price, p.currency)}</div>
                  <div className="mt-1 text-sm text-slate-500">{p.size}</div>

                  <Button type="button" className="mt-4 w-full" onClick={() => onAddToCart(p.id)}>
                    Add to cart
                  </Button>
                  <Link
                    to="/cart"
                    className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-200"
                  >
                    Go to cart
                  </Link>

                  <div className="mt-3 text-xs text-slate-500">
                    This is a demo checkout flow. No payment is collected.
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Container>
  )
}
