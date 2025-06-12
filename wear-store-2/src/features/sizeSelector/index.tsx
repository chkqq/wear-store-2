import React from 'react'
import styles from './style.module.scss'

interface SizeSelectorProps {
  sizes: string[]
  selectedSize: string | null
  onSelectSize: (size: string) => void
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, selectedSize, onSelectSize }) => {
  return (
    <div className={styles.sizeSelector}>
      <p>Выберите размер:</p>
      <div className={styles.sizeOptions}>
        {sizes.map(size => (
          <button
            key={size}
            className={selectedSize === size ? styles.selectedSize : ''}
            onClick={() => onSelectSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SizeSelector
