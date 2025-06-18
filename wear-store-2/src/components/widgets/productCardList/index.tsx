import React from 'react'
import ProductCard from '@/features/productCard'

export interface Product {
  id: number
  name: string
  price: number
  image1: string
  image2: string
  description: string
  sizes: string[]
  category: string
  newArrival: boolean
  averageRating: number
}

interface Props {
  filteredProducts: Product[]
}

const ProductCardList: React.FC<Props> = ({ filteredProducts }) => {
  return (
    <div className="flex flex-row flex-wrap mt-[100px] gap-y-[10px] justify-between w-full">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductCardList