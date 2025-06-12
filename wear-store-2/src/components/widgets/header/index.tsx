"use client";
import styles from './style.module.scss'
import Button from '../../ui/button'
import ShoppingBagIcon from './icons/shopping-bag.png'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const Header: React.FC = () => {
    const router = useRouter()

    const handleShoppingCartClick = () => {
        router.push('/cart')
    }

    return(
        <div className = {styles.header}>
        <Link href="/" className={styles.title}>=WEAR SHOP=</Link>
        <div className= {styles.buttons}>
            <Button icon={ShoppingBagIcon} onClick={handleShoppingCartClick} ></Button>
        </div>

    </div>
    )
}

export default Header