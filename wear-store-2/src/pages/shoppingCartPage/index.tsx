"use client";
import Header from '@/components/widgets/header'
import Button from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import DeliveryForm from '@/components/widgets/deliveryForm';
import { useCartStore } from '@/store/cartStore';
import CartList from '@/components/widgets/cartList';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

const ShoppingCartPage: React.FC = () => {
  const { cartItems, syncCartWithUser } = useCartStore();
  const { currentUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    syncCartWithUser();
  }, [currentUser, syncCartWithUser]);

  const handleStoreClick = () => {
    router.push('/store');
  };

  const handleFormSubmit = (formData: { 
    name: string; 
    phone: string; 
    email: string; 
    address: string 
  }) => {
    console.log('Form submitted:', formData);
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col items-center bg-[#e0e0e0] min-h-screen overflow-auto">
      <Header />
      
      <div className="px-[50px] bg-[#fafafa] text-[#333333] w-[60vw] min-h-screen overflow-auto">
        <p className="pt-[80px] text-[35px]">Ваша корзина:</p>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col gap-[20px] w-full items-center mt-[50px] text-[50px]">
            <p>Корзина пуста...</p>
            <Button text='Посмотреть ещё' onClick={handleStoreClick} />
          </div>
        ) : (
          <div className="pb-[50px]">
            <CartList />
            <Button text='Посмотреть ещё' onClick={handleStoreClick} />
            <p className="flex justify-center my-[20px] text-[20px]">
              Общая сумма: ${totalAmount.toFixed(2)}
            </p>
            {currentUser ? (
              <DeliveryForm onSubmit={handleFormSubmit} />
            ) : (
              <p className="text-center text-red-500 my-4">
                Для оформления заказа необходимо авторизоваться
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage;