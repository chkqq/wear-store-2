import React from 'react'
import styles from './style.module.scss'
import Button from '@/components/ui/button'
import DeleteIcon from './icons/delete.png'

interface CartListElementProps {
  id: number
  name: string
  size: string
  quantity: number
  price: number
  image1: string
  onRemove: (id: number, size: string) => void
}

const CartListElement: React.FC<CartListElementProps> = ({ id, name, size, quantity, price, image1, onRemove }) => {
  return (
    <div className={styles.listElement}>
      <img src={image1} alt={name} className={styles.productImage} />
      <span>{name} (Размер: {size}, Количество: {quantity}) - ${price * quantity}</span>
      <Button icon={DeleteIcon} onClick={() => onRemove(id, size)} />
    </div>
  )
}

export default CartListElement
