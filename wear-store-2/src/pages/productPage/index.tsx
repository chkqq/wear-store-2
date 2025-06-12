'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './style.module.scss'
import Header from '@/components/widgets/header'
import { useCartStore } from '@/store/cartStore'
import Button from '@/components/ui/button'
import Modal from '@/components/widgets/Modal'
import PriceChart from '@/features/priceChart'
import Reviews from '@/features/reviews'
import SizeSelector from '@/features/sizeSelector'
import ErrorMessage from '@/components/ui/error'
import Image from 'next/image'

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
    console.log('ProductPage productId:', productId, typeof productId);
    if (!productId || isNaN(Number(productId))) {
      console.error('Invalid product ID:', productId);
      return;
    }

    const numericProductId = Number(productId);

    // Загрузка данных продукта
    fetch('/dataBase/storeDataBase.json')
      .then(response => response.json())
      .then(data => {
        const foundProduct = data.find((p: Product) => p.id === numericProductId);
        if (!foundProduct) {
          console.error('Product not found with ID:', numericProductId);
          return;
        }
        setProduct(foundProduct);
      })
      .catch(error => console.error('Error loading product:', error));

    // Загрузка истории цен
    fetch('/dataBase/priceHistory.json')
      .then(response => response.json())
      .then(data => {
        const productPriceHistory = data.find((ph: PriceHistory) => ph.productId === numericProductId);
        if (productPriceHistory) {
          setPriceHistory(productPriceHistory.priceHistory);
        }
      })
      .catch(error => console.error('Error loading price history:', error));
  }, [productId]);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setError(null);
  };

  const handleAddToCart = () => {
    if (product && selectedSize) {
      addToCart({ ...product, size: selectedSize });
      setTimeout(() => {
        router.push('/store');
      }, 200);
    } else {
      setError('Пожалуйста, выберите размер перед добавлением в корзину!');
    }
  };

  const handleImageClick = (index: number) => {
    setCurrentImage(index);
    setIsModalOpen(true);
  };

  const handleNextImage = () => {
    if (product) {
      setCurrentImage((prevIndex) => (prevIndex + 1) % productImages.length);
    }
  };

  const handlePrevImage = () => {
    if (product) {
      setCurrentImage((prevIndex) => (prevIndex - 1 + productImages.length) % productImages.length);
    }
  };

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const productImages = [product.image1, product.image2, product.image3, product.image4];

  return (
    <div className={styles.background}>
      <Header />
      <div className={styles.productPageMainBox}>
        <div className={styles.productImagesAndBuyForm}>
          <div className={styles.productImages}>
            {productImages.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={product.name}
                width={200}
                height={200}
                onClick={() => handleImageClick(index)}
                className={styles.productImage}
              />
            ))}
          </div>
          <div className={styles.productBuyForm}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={handleSizeSelect}
            />
            <div className={styles.buttonWrapper}>
              <Button
                onClick={handleAddToCart}
                text='Добавить в корзину'
              />
            </div>
          </div>
        </div>
        <div className={styles.productDetailsAndPriceHistory}>
          <div className={styles.productDetails}>
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