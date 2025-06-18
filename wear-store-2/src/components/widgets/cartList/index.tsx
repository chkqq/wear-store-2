import CartListElement from '@/features/cartListElement'
import { useCartStore } from '@/store/cartStore'
const CartList: React.FC = () => {
    const { cartItems, removeFromCart } = useCartStore()

    const handleRemoveFromCart = (id: number, size: string) => {
        removeFromCart(id, size)
    }

    return(
      <div>
        {cartItems.map(item => (
          <CartListElement
            key={`${item.id}-${item.size}`}
            id={item.id}
            name={item.name}
            size={item.size}
            quantity={item.quantity}
            price={item.price}
            image1={item.image1}
            onRemove={handleRemoveFromCart}
          />
        ))}
      </div>
    )
}

export default CartList