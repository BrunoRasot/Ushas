export type ProductCategory = {
  id: string
  name: string
  slug: string
  description: string
}

export type Product = {
  id: string
  slug: string
  name: string
  category: string
  description: string
  price: number
  originalPrice?: number
  image: string
  badge?: string
  rating: number
  reviews: number
  stock: number
}
