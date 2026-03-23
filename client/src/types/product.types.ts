export interface ProductImage {
  url: string
}

export interface ProductData {
  id: number | string
  title: string
  price: number
  desc?: string
  type?: string
  img?: ProductImage
  img2?: ProductImage
  [key: string]: unknown
}

export interface CardItem {
  id: number | string
  title: string
  price: number
  oldPrice?: number
  isNew?: boolean
  img?: ProductImage
  img2?: ProductImage
}
