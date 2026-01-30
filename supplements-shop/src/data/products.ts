import type { Product } from '../types'

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    slug: 'daily-multivitamin',
    name: 'Daily Multivitamin',
    subtitle: 'A balanced daily blend for everyday support',
    price: 29.9,
    currency: 'SGD',
    size: '60 capsules',
    tags: ['Vitamins', 'Daily'],
    description:
      'A convenient multivitamin designed to complement a modern lifestyle. Formulated for daily use with a broad spectrum of essential vitamins and minerals.',
    ingredients: ['Vitamin A', 'Vitamin C', 'Vitamin D3', 'Vitamin E', 'B-Complex', 'Zinc', 'Magnesium'],
    highlights: ['Once-a-day formula', 'No artificial colors', 'Easy-to-swallow capsules'],
    caution: 'Not intended to diagnose, treat, cure, or prevent any disease.',
  },
  {
    id: 'p2',
    slug: 'omega-3-fish-oil',
    name: 'Omega-3 Fish Oil',
    subtitle: 'High-purity EPA & DHA for heart and brain',
    price: 35.0,
    currency: 'SGD',
    size: '90 softgels',
    tags: ['Omega-3', 'Heart'],
    description:
      'Premium omega-3 concentrate with EPA and DHA sourced from responsibly harvested fish. Supports everyday wellness as part of a balanced diet.',
    ingredients: ['Fish Oil Concentrate', 'EPA', 'DHA', 'Gelatin Capsule'],
    highlights: ['Triple-filtered', 'Lemon flavored', 'Low odor'],
    caution: 'Contains fish. Consult a professional if you are pregnant, nursing, or taking medication.',
  },
  {
    id: 'p3',
    slug: 'probiotic-10b',
    name: 'Probiotic 10B',
    subtitle: '10 billion CFU with multi-strain support',
    price: 38.0,
    currency: 'SGD',
    size: '30 capsules',
    tags: ['Gut', 'Probiotic'],
    description:
      'Multi-strain probiotic blend designed for digestive comfort and everyday gut support. Suitable for daily routine.',
    ingredients: ['Lactobacillus', 'Bifidobacterium', 'Prebiotic Fiber'],
    highlights: ['Multi-strain blend', 'Shelf-stable', 'No added sugar'],
    caution: 'If you have a compromised immune system, consult a professional before use.',
  },
  {
    id: 'p4',
    slug: 'collagen-peptides',
    name: 'Collagen Peptides',
    subtitle: 'Unflavored peptides for skin & joint support',
    price: 42.0,
    currency: 'SGD',
    size: '300g powder',
    tags: ['Beauty', 'Protein'],
    description:
      'Hydrolyzed collagen peptides that dissolve easily into hot or cold beverages. A simple addition to your daily routine.',
    ingredients: ['Hydrolyzed Collagen Peptides (Bovine)'],
    highlights: ['Unflavored', 'Dissolves quickly', 'No fillers'],
    caution: 'Contains bovine-derived ingredients.',
  },
]

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug)
}
