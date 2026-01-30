import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { PRODUCTS } from '../data/products'
import { formatMoney } from '../lib/money'
import { Badge, Button, Card, CardBody, Container, Input, Label, Select } from '../components/ui'

type TagFilter = 'All' | 'Vitamins' | 'Omega-3' | 'Gut' | 'Beauty' | 'Daily' | 'Heart' | 'Protein' | 'Probiotic'

function ProductCard({ p, onAdd }: { p: Product; onAdd: () => void }) {
  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <div className="w-full md:w-44">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-100">
              <img src={p.imageSrc} alt={p.name} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold text-slate-900">{p.name}</div>
                <div className="mt-1 text-sm text-slate-500">{p.subtitle}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-slate-900">{formatMoney(p.price, p.currency)}</div>
                <div className="text-xs text-slate-500">{p.size}</div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.slice(0, 3).map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <Link
                to={`/product/${p.slug}`}
                className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                View details
              </Link>
              <Button type="button" onClick={onAdd}>
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export function Shop({ onAddToCart }: { onAddToCart: (productId: string) => void }) {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<TagFilter>('All')
  type Sort = 'featured' | 'price-asc' | 'price-desc'
  const [sort, setSort] = useState<Sort>('featured')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    let list = PRODUCTS.filter((p) => {
      const matchesQuery = !q || `${p.name} ${p.subtitle} ${p.description}`.toLowerCase().includes(q)
      const matchesTag = tag === 'All' ? true : p.tags.includes(tag)
      return matchesQuery && matchesTag
    })

    if (sort === 'price-asc') list = list.slice().sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = list.slice().sort((a, b) => b.price - a.price)

    return list
  }, [query, tag, sort])

  return (
    <Container>
      <div className="py-6">
        <div className="mb-5">
          <div className="text-2xl font-semibold text-slate-900">Shop supplements</div>
          <div className="mt-1 text-sm text-slate-500">
            Modern, clean UI. MVP checkout flow (no payment integration).
          </div>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-5">
          <div className="md:col-span-2">
            <Label>Search</Label>
            <Input placeholder="Search by name, benefit, ingredient..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div>
            <Label>Tag</Label>
            <Select value={tag} onChange={(e) => setTag(e.target.value as TagFilter)}>
              {['All', 'Vitamins', 'Omega-3', 'Gut', 'Beauty', 'Daily', 'Heart', 'Protein', 'Probiotic'].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Sort</Label>
            <Select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </Select>
          </div>
          <div className="flex items-end">
            <div className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
              {filtered.length} products
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} onAdd={() => onAddToCart(p.id)} />
          ))}
        </div>
      </div>
    </Container>
  )
}
