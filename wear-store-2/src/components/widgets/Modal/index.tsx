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
    <div className={styles.modal} onClick={onClose}>
      <span className={styles.close} onClick={onClose}>&times;</span>
      <img className={styles.modalContent} src={images[currentImageIndex]} alt="Product" />
      <button className={styles.prev} onClick={(e) => { e.stopPropagation(); onPrev(); }}>&#10094;</button>
      <button className={styles.next} onClick={(e) => { e.stopPropagation(); onNext(); }}>&#10095;</button>
    </div>
  );
};

export default Modal;
