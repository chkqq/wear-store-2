import React from 'react'

interface ErrorMessageProps {
  message: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="fixed top-[90%]
    left-[85%] 
    -translate-x-1/2 
    w-[470px] 
    h-[20px] 
    mt-[10px] 
    p-[10px] 
    bg-[#f8d7da] 
    text-[#721c24]
    text-[15px]    
    border border-[#f5c6cb] 
    rounded-[5px] 
    z-[1000] 
    animate-[fadeIn_0.5s,fadeOut_0.5s_2.5s]">
      {message}
    </div>
  )
}

export default ErrorMessage