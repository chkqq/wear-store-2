"use client";
import Header from '@/components/widgets/header'
import Footer from '@/components/widgets/footer'
import ProductCardList from '@/components/widgets/productCardList'
import { useEffect, useState } from 'react'
import { Product } from '@/components/widgets/productCardList';
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/button'

const MainPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [reviews, setReviews] = useState<{ productId: number; reviews: { rating: number }[] }[]>([])
  const router = useRouter()

  const handleShoppingCartClick = () => {
    router.push('/store')
  };

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
    if (!productReviews || productReviews.reviews.length === 0) return 0
    const totalRating = productReviews.reviews.reduce((acc, review) => acc + review.rating, 0)
    return totalRating / productReviews.reviews.length
  }

  const newArrivals = products
    .filter(product => product.newArrival)
    .map(product => ({
      ...product,
      averageRating: getAverageRating(product.id),
    }))

  return (
    <div className="text-[#333333]">
      <Header />
      
      {/* GIF Section */}
      <div className="flex justify-center bg-[#000] h-[90vh]">
        <div 
          className="flex flex-col items-center justify-center text-[#f5f5f5] [text-shadow:_-1px_-1px_0_#333,_1px_-1px_0_#333,_-1px_1px_0_#333,_1px_1px_0_#333] bg-cover bg-[url('/pics/sea.gif')] w-[70%] h-full"
        >
          <h1>=WEAR SHOP=</h1>
          <h1>Магазин Авангардной одежды</h1>
          <p>По адресу:</p>
          <p>?????????????????????????</p>
        </div>
      </div>

      {/* Photos and About Us Section */}
      <div className="flex flex-row justify-evenly mt-[60px]">
        <div className="flex flex-col w-[700px] h-[500px]">
          <img src='/pics/RealPhoto2.png' alt="Shop Photo 2" />
          <img src='/pics/RealPhoto3.png' alt="Shop Photo 3" />
        </div>
        
        <div className="flex flex-col gap-[50px] mt-[5.5%] text-[25px] w-[700px]">
          <h1>О нас:</h1>
          <p>
            Магазин авангардной одежды, предлагающий бренды такие как Rick Owens, Balenciaga и Vetements, является местом, где стиль и мода встречаются с уникальным выражением индивидуальности и креативности. Такие магазины привлекают модных энтузиастов, которые ищут что-то уникальное, смелое и необычное.
          </p>
          <p>
            Магазин, представляющий такие бренды, является не просто местом для покупок, а настоящим пространством для модных экспериментов. Здесь вы найдете уникальные предметы гардероба, которые подчеркнут вашу индивидуальность и помогут выразить ваш уникальный стиль. В таком магазине покупатели могут ожидать не только широкий ассортимент одежды, обуви и аксессуаров, но и вдохновение для создания собственных модных образов.
            Авангардная мода — это всегда о смелости и готовности выделяться из толпы, и магазин, предлагающий такие бренды, обеспечивает своим клиентам возможность быть в авангарде модных тенденций, сочетая комфорт и оригинальность в каждом предмете.
          </p>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="flex flex-col mx-[20%] w-[60%] gap-[20px] my-[40px]">
        <h2 className="text-center">Новинки</h2>
        <ProductCardList filteredProducts={newArrivals} />
        <Button text='Смотреть весь каталог' onClick={handleShoppingCartClick} />
      </div>
      
      <Footer />
    </div>
  )
}

export default MainPage