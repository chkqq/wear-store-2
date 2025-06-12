import React from 'react';
import styles from './style.module.scss';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
interface ButtonProps {
   icon?: string | StaticImageData;
  text?: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ icon, text, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {icon && <Image src={icon} alt="icon" className={styles.icon} />}
      {text && <span className={styles.text}>{text}</span>}
    </button>
  );
};

export default Button;
