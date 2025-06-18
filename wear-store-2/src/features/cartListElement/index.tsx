import React from 'react'
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

const CartListElement: React.FC<CartListElementProps> = ({ 
  id, 
  name, 
  size, 
  quantity, 
  price, 
  image1, 
  onRemove 
}) => {
  return (
    <div className="p-[10px] flex flex-row items-center justify-between bg-white border border-[#ccc] rounded-[5px] mb-[10px]">
      <img 
        src={image1} 
        alt={name} 
        className="w-[50px] h-[50px] object-cover mr-[10px]" 
      />
      <span className="flex-grow mr-[10px]">
        {name} (Размер: {size}, Количество: {quantity}) - ${price * quantity}
      </span>
      <Button 
        icon={DeleteIcon} 
        onClick={() => onRemove(id, size)}
      />
    </div>
  )
}

export default CartListElement