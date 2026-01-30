import { Link } from 'react-router-dom'
import { Button, Card, CardBody, Container } from '../components/ui'

export function SuccessPage() {
  return (
    <Container>
      <div className="py-10">
        <Card>
          <CardBody>
            <div className="mx-auto max-w-xl text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200">
                <span className="text-2xl font-black">✓</span>
              </div>
              <div className="mt-4 text-2xl font-semibold text-slate-900">Order placed!</div>
              <div className="mt-2 text-sm text-slate-600">
                This is a demo flow. No payment was processed.
              </div>
              <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
                <Link to="/">
                  <Button type="button">Continue shopping</Button>
                </Link>
                <Link to="/cart">
                  <Button type="button" variant="secondary">View cart</Button>
                </Link>
              </div>
              <div className="mt-6 text-xs text-slate-500">
                Next step: add payment integration (Stripe), inventory, and admin product management.
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Container>
  )
}
