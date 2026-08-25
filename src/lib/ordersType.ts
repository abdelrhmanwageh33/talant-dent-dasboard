export interface Root {
  success: boolean
  count: number
  pagination: Pagination
  orders: Order[]
}

export interface Pagination {
  currentPage: number
  limit: number
  totalOrders: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface Order {
  customer: Customer
  _id: string
  orderNumber: string
  items: Item[]
  totalPrice: number
  status: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Customer {
  name: string
  phone: string
  address: string
  notes: string
}

export interface Item {
  product: Product
  name: string
  image: string
  price: number
  quantity: number
  _id: string
}

export interface Product {
  _id: string
  name: string
  slug: string
  image: string
  price: number
  stock: number
  active: boolean
}
