"use client";
import styles from './style.module.scss'
import Header from '@/components/widgets/header'
import Button from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import DeliveryForm from '@/components/widgets/deliveryForm';
import { useCartStore } from '@/store/cartStore';
import CartList from '@/components/widgets/cartList';
const ShoppingCartPage: React.FC = () => {
  const { cartItems } = useCartStore()
  const router = useRouter()

  const handleStoreClick = () => {
        router.push('/store')
  }

  const handleFormSubmit = (formData: { name: string; phone: string; email: string; address: string }) => {
    console.log('Form submitted:', formData)
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className={styles.background}>
      <Header />
      <div className={styles.shoppingCartMainBox}>
        <p className={styles.title}>Ваша корзина:</p>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCartMessage}>
            <p>Корзина пуста...</p>
            <Button text='Посмотреть ещё' onClick={handleStoreClick} />
          </div>
        ) : (
         <div className={styles.listAndDeliveryForm}>
           <CartList />
           <Button text='Посмотреть ещё' onClick={handleStoreClick} />
           <p className={styles.totalAmount}>Общая сумма: ${totalAmount}</p>
           <DeliveryForm onSubmit={handleFormSubmit} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ShoppingCartPage
