import React from 'react'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  price: number
  image1: string
  image2: string
  newArrival: boolean
  averageRating: number
}

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="w-[230px] h-[380px] bg-[#fff] px-[20px] relative cursor-pointer group">
      <Link 
        href={`/product/${product.id}`} 
        className="no-underline text-inherit"
      >
        <div className="w-[230px] h-[300px] bg-cover bg-center bg-no-repeat relative">
          <img 
            src={product.image1} 
            alt={product.name} 
            className="absolute top-0 left-0 w-full h-full opacity-100 transition-opacity duration-500 ease-in-out group-hover:opacity-0" 
          />
          <img 
            src={product.image2} 
            alt={product.name} 
            className="absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" 
          />
        </div>
        <div className="text-[14px] mt-[10px]">
          {product.newArrival && (
            <p className="font-[300] text-red-600">Новинка</p>
          )}
          <p className="font-[600]">{product.name}</p>
          <div className="flex justify-between">
            <div>${product.price}</div>
            <div>{product.averageRating.toFixed(1)}&#9733;</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard