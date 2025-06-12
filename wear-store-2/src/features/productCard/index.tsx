import React from 'react'
import Link from 'next/link'
import styles from './style.module.scss'

interface Product {
  id: number
  name: string
  price: number
  image1: string
  image2: string
  newArrival: boolean
  averageRating: number
}

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <Link href={`/product/${product.id}`} className={styles.productCardLink}>
        <div className={styles.productCardPicture}>
          <img src={product.image1} alt={product.name} className={styles.productCardImage} />
          <img src={product.image2} alt={product.name} className={styles.productCardImageHover} />
        </div>
        <div className={styles.ProductCardNameAndPriceBox}>
          {product.newArrival && <p className={styles.newArrivalLabel}>Новинка</p>}
          <p className={styles.productCardName}>{product.name}</p>
          <div className={styles.ProductCardPriceAndRating}>
            <p className={styles.productCardPrice}>${product.price}</p>
            <p className={styles.productCardRating}>{product.averageRating.toFixed(1)}&#9733;</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
