// Header.tsx
"use client";
import Button from '../../ui/button'
import ShoppingBagIcon from './icons/shopping-bag.png'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore'
import LogoutIcon from './icons/log-out.png'
const Header: React.FC = () => {
  const router = useRouter()
  const { currentUser, logout } = useAuthStore()

  const handleShoppingCartClick = () => {
    router.push('/cart')
  }

  const handleLoginClick = () => {
    router.push('/autorisation')
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="fixed flex justify-between items-center bg-[#fff] text-[#333333] w-full h-[60px] z-[1000]">
      <Link 
        href="/" 
        className="no-underline text-inherit cursor-pointerw ml-[15px] font-normal text-[30px] font-bold"
      >
        =WEAR SHOP=
      </Link>
      <div className="mr-[15px] flex flex-row items-center gap-[7.5px]">
        {currentUser ? (
          <>
            <span>{currentUser}</span>
            <Button icon={ShoppingBagIcon} onClick={handleShoppingCartClick} />
            <Button 
              icon={LogoutIcon}
              onClick={handleLogout} 
            />
          </>
        ) : (
          <Button 
            text="Войти" 
            onClick={handleLoginClick} 
          />
        )}
      </div>
    </div>
  )
}

export default Header