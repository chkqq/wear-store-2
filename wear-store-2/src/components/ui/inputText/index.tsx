import React from 'react'

interface TextInputProps {
  name: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: 'text' | 'password' | 'email'
  required?: boolean
  minLength?: number
  className?: string
  autoComplete?: string
}

const TextInput: React.FC<TextInputProps> = ({ 
  name, 
  placeholder = '', 
  value, 
  onChange, 
  type = 'text',
  required = false,
  minLength,
  className = '',
  autoComplete = 'off'
}) => {
  return (
    <input
      className={`
        w-[500px] h-[30px]
        p-[10px]
        text-[15px]
        border border-gray-300 rounded-md
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        transition-all
        ${className}
      `}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      minLength={minLength}
      autoComplete={autoComplete}
    />
  )
}

export default TextInput