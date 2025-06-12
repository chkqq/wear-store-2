import React from 'react'
import ProductCard from '@/features/productCard'
import styles from './style.module.scss'

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
    <div className={styles.productCardList}>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductCardList
