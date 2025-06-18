import { useEffect, useState } from 'react'

interface Review {
  id: number
  rating: number
  comment: string
  date: string
}

interface ReviewsProps {
  productId: number
}

export default function Reviews({ productId }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [averageRating, setAverageRating] = useState<number | null>(null)

  useEffect(() => {
    if (productId) {
      fetch('/dataBase/reviewsDataBase.json')
        .then(response => response.json())
        .then(data => {
          const productReviews = data.find((r: { productId: number }) => r.productId === productId)
          if (productReviews) {
            setReviews(productReviews.reviews)
            const totalRating = productReviews.reviews.reduce((sum: number, review: Review) => sum + review.rating, 0)
            const average = totalRating / productReviews.reviews.length;
            setAverageRating(average)
          }
        })
        .catch(error => console.error('Error loading reviews:', error))
    }
  }, [productId])

  return (
    <div className="mt-[30px] w-[30%] bg-[#fff] p-[20px] rounded-[8px] shadow-[0_0_10px_rgba(0,0,0,0.1)] mb-[20px]">
      <h3 className="text-[1.5rem] mb-[10px] text-center">Отзывы пользователей:</h3>
      
      {averageRating !== null && (
        <div className="text-[20px]">
          <p>Средняя оценка: {averageRating.toFixed(1)}</p>
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="text-[#666666]">Пока нет отзывов для этого товара.</p>
      ) : (
        <div>
          {reviews.map(review => (
            <div key={review.id} className="border-b border-[#eeeeee] py-[10px]">
              <div className="flex items-center mb-[5px]">
                <span className="font-bold mr-[10px]">Оценка:</span>
                <div className="text-black">
                  {[...Array(review.rating)].map((_, index) => (
                    <span key={index} className="text-[1.2rem]">&#9733;</span>
                  ))}
                </div>
              </div>
              <p className="mb-[5px]">Комментарий: {review.comment}</p>
              <p className="text-[#666666] text-[0.9rem]">Дата: {review.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}