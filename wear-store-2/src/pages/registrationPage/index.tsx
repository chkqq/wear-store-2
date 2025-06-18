'use client'
import Button from "@/components/ui/button"
import TextInput from "@/components/ui/inputText"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { useCartStore } from "@/store/cartStore"

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({ 
    login: '', 
    password: '', 
    confirmPassword: '' 
  })
  const [error, setError] = useState('')
  const router = useRouter()
  const { register } = useAuthStore()
  const { syncCartWithUser } = useCartStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают')
      return
    }
    
    try {
      register(formData.login, formData.password)
      await syncCartWithUser() 
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации')
    }
  }

  return (
    <form 
      className="flex flex-col items-center mt-[17%] gap-[10px] text-[#333333]"
      onSubmit={handleSubmit}
    >
      <Link
        href="/"
        className="no-underline text-inherit cursor-pointerw ml-[15px] font-normal text-[30px] font-bold"
      >
        =WEAR SHOP=
      </Link>
      <TextInput
        name="login"
        placeholder="Придумайте логин"
        value={formData.login}
        onChange={handleChange}
        required
        minLength={3}
      />
      <TextInput
        name="password"
        type="password"
        placeholder="Придумайте пароль"
        value={formData.password}
        onChange={handleChange}
        required
        minLength={6}
      />
      <TextInput
        name="confirmPassword"
        type="password"
        placeholder="Повторите пароль"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button text="Зарегистрироваться"/>
      <div className="text-sm">
        Если у вас уже есть аккаунт <Link href='/autorisation' className="text-blue-500">войдите</Link>
      </div>
    </form>
  )
}

export default RegistrationPage