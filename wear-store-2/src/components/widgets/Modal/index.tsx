import React, { useEffect } from 'react'
import styles from './style.module.scss'

interface ModalProps {
  images: string[]
  currentImageIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

const Modal: React.FC<ModalProps> = ({ images, currentImageIndex, onClose, onNext, onPrev }) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      onNext()
    } else if (e.key === 'ArrowLeft') {
      onPrev()
    } else if (e.key === 'Escape') {
      onClose()
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    };
  }, []);

  return (
    <div 
      className="fixed flex justify-center items-center left-[0] top-[0] w-full h-full overflow-auto bg-[rgba(0,0,0,0.8)] z-[1000]"
      onClick={onClose}
    >
      <span 
        className="absolute px-[12] rounded-full top-[15] right-[35] text-[white] text-[40px] cursor-pointer transition duration-300 hover:bg-[black] hover:bg-[rgba(0,0,0,0.5)]"
        onClick={onClose}
      >
        &times;
      </span>
      <img 
        className="block my-auto mx-auto w-4/5 max-w-[700px]" 
        src={images[currentImageIndex]} 
        alt="Product" 
      />
      <button 
        className="cursor-pointer absolute bg-transparent p-[16] border-none rounded-[5] top-[1/2] left-[0] w-auto p-4 text-[white] font-bold text-[30px] transition duration-300 hover:bg-[black] hover:bg-[rgba(0,0,0,0.5)]"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        &#10094;
      </button>
      <button 
        className="cursor-pointer absolute bg-transparent p-[16] border-none rounded-[5] top-[1/2] right-[0] w-auto p-4 text-[white] font-bold text-[30px] transition duration-300 hover:bg-[black] hover:bg-[rgba(0,0,0,0.5)]"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Modal;

