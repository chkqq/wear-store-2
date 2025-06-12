"use client";
import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import Header from '@/components/widgets/header';
import CategoryFilter from '@/components/widgets/categoryFilter';
import ProductCardList, {Product} from '@/components/widgets/productCardList';
import { categories } from '@/const/categories';
const StorePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [reviews, setReviews] = useState<{ productId: number; reviews: { rating: number }[] }[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0])
  useEffect(() => {
    fetch('/dataBase/storeDataBase.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error loading products:', error))
    fetch('/dataBase/reviewsDataBase.json')
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error loading reviews:', error))
  }, [])
  const getAverageRating = (productId: number) => {
    const productReviews = reviews.find(review => review.productId === productId)
    if (!productReviews) return 0;
    const totalRating = productReviews.reviews.reduce((acc, review) => acc + review.rating, 0)
    return totalRating / productReviews.reviews.length
  }
  const productsWithRatings = products.map(product => ({
    ...product,
    averageRating: getAverageRating(product.id),
  }))
  const filteredProducts = selectedCategory === categories[0]
    ? productsWithRatings
    : productsWithRatings.filter(product => product.category === selectedCategory);
  return (
    <div className={styles.background}>
      <Header />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className={styles.storeMainBox}>
        <ProductCardList filteredProducts={filteredProducts} />
      </div>
    </div>
  )
}
export default StorePage
