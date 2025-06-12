import React from 'react'
import styles from './style.module.scss'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className={styles.categoryFilter}>
      {categories.map(category => (
        <button
          key={category}
          className={selectedCategory === category ? styles.selected : ''}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
