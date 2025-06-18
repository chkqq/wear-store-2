'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/widgets/header'
import { useCartStore } from '@/store/cartStore'
import Button from '@/components/ui/button'
import Modal from '@/components/widgets/Modal'
import PriceChart from '@/features/priceChart'
import Reviews from '@/features/reviews'
import SizeSelector from '@/features/sizeSelector'
import ErrorMessage from '@/components/ui/error'
import Image from 'next/image'
import { useAuthStore } from '@/store/authStore'
interface Product {
  id: number
  name: string
  price: number
  image1: string
  image2: string
  image3: string
  image4: string
  description: string
  sizes: string[]
  details: string
  care_instructions: string
  compound: string
}

interface PriceHistory {
  productId: number
  priceHistory: { date: string; price: number }[]
}

export default function ProductPage({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [priceHistory, setPriceHistory] = useState<{ date: string; price: number }[]>([])
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentImage, setCurrentImage] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { addToCart } = useCartStore()
  const router = useRouter()

  useEffect(() => {
    if (!productId || isNaN(Number(productId))) return;

    const numericProductId = Number(productId);

    // Load product data
    fetch('/dataBase/storeDataBase.json')
      .then(response => response.json())
      .then(data => {
        const foundProduct = data.find((p: Product) => p.id === numericProductId);
        setProduct(foundProduct);
      })
      .catch(error => console.error('Error loading product:', error));

    // Load price history
    fetch('/dataBase/priceHistory.json')
      .then(response => response.json())
      .then(data => {
        const productPriceHistory = data.find((ph: PriceHistory) => ph.productId === numericProductId);
        if (productPriceHistory) setPriceHistory(productPriceHistory.priceHistory);
      })
      .catch(error => console.error('Error loading price history:', error));
  }, [productId]);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setError(null);
  };

const handleAddToCart = () => {
  const authStore = useAuthStore.getState()
  
  if (!authStore.currentUser) {
    router.push('/autorisation')
    return
  }

  if (product && selectedSize) {
    addToCart({ ...product, size: selectedSize })
    setTimeout(() => router.push('/store'), 200)
  } else {
    setError('Пожалуйста, выберите размер перед добавлением в корзину!')
  }
}

  const handleImageClick = (index: number) => {
    setCurrentImage(index);
    setIsModalOpen(true);
  };

  const handleNextImage = () => {
    if (product) setCurrentImage((prev) => (prev + 1) % productImages.length);
  };

  const handlePrevImage = () => {
    if (product) setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const productImages = [product.image1, product.image2, product.image3, product.image4];

  return (
    <div className="bg-white min-h-screen overflow-auto">
      <Header />
      
      <div className="mt-[60px] flex flex-col justify-around items-center text-[#333333] p-[20px] bg-gradient-to-b from-[rgba(0,0,0,0.01)] to-[rgba(0,0,0,0)]">
        {/* Product Images and Buy Form */}
        <div className="flex flex-row gap-[200px]">
          {/* Product Images Grid */}
          <div className="w-[600px] bg-white p-[20px] grid grid-cols-2 mb-[20px]">
            {productImages.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={product.name}
                width={200}
                height={200}
                onClick={() => handleImageClick(index)}
                className="w-full h-auto cursor-pointer"
              />
            ))}
          </div>

          {/* Product Buy Form */}
          <div className="flex flex-col justify-center max-w-[600px] text-center">
            <h1 className="mb-[10px]">{product.name}</h1>
            <p className="mb-[5px]">{product.description}</p>
            <p className="mb-[5px]">${product.price}</p>
            
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={handleSizeSelect}
            />
            
            <div className="flex justify-center">
              <Button
                onClick={handleAddToCart}
                text='Добавить в корзину'
              />
            </div>
          </div>
        </div>

        {/* Product Details and Price History */}
        <div className="flex flex-row mt-[30px] px-[15%]">
          <div className="flex-1">
            <h3>Описание:</h3>
            <p>{product.details}</p>
            <h3>Рекомендации по уходу:</h3>
            <p>{product.care_instructions}</p>
            <h3>Состав:</h3>
            <p>{product.compound}</p>
          </div>
          
          <PriceChart data={priceHistory} />
        </div>

        <Reviews productId={product.id} />
        {error && <ErrorMessage message={error} />}
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <Modal
          images={productImages}
          currentImageIndex={currentImage}
          onClose={() => setIsModalOpen(false)}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
        />
        
      )}
    </div>
  )
}