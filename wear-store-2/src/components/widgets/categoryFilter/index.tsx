import React from 'react'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="fixed flex 
    justify-center 
    mt-[60px] 
    w-full 
    h-[30px] 
    z-[1000] 
    bg-[#fff]">
      {categories.map(category => (
        <button
          key={category}
          className={`w-[15%] 
            border-none 
            bg-[#fff] 
            text-[#333333] 
            cursor-pointer 
            transition-colors 
            duration-300 
            ease-[ease] 
            hover:bg-[#f0f0f0] ${
            selectedCategory === category 
              ? 'border-b-1 bg-gradient-to-t from-[#f5f5f5] to-[#fff]' 
              : ''
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter 