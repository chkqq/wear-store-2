import React from 'react'

interface SizeSelectorProps {
  sizes: string[]
  selectedSize: string | null
  onSelectSize: (size: string) => void
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, selectedSize, onSelectSize }) => {
  return (
    <div className="my-[20px]">
      <p>Выберите размер:</p>
      <div className="flex justify-center flex-wrap gap-[10px]">
        {sizes.map(size => (
          <button
            key={size}
            className={`p-[10px] border ${selectedSize === size ? 'border-1 border-[#333]' : 'border-[#cccccc]'} bg-white cursor-pointer`}
            onClick={() => onSelectSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SizeSelector