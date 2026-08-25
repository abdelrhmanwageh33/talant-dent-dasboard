export interface Products {
  success: boolean
  page: number
  limit: number
  totalProducts: number
  totalPages: number
  count: number
  products: Product[]
}

export interface Product {
  _id: string
  name: string
  slug: string
  description: string
  image: string
  price: number
  stock: number
  brand: string
  category: Category
  featured: boolean
  active: boolean
  __v: number
  createdAt: string
  updatedAt: string
  discount: number
  isBestSeller: boolean
  isNewArrival: boolean
}

export interface Category {
  _id: string
  name: string
  slug: string
}
