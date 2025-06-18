import React from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
interface ButtonProps {
  icon?: StaticImageData;
  text?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, text, onClick }) => {
  return (
    <button
      className="flex items-center
      justify-center mx-auto p-[10px] border-none rounded-[5px] bg-[#fff] text-[#333] cursor-pointer transition-colors duration-300 ease-[ease] hover:bg-[#eeeeee]"
      onClick={onClick}
    >
      {icon && (
        <Image
          src={icon} 
          alt="icon" 
          className="px-[5px] flex items-center" 
        />
      )}
      {text && (
        <span className="text-[16px] font-medium">
          {text}
        </span>
      )}
    </button>
  );
};

export default Button;