'use client'
import Button from "@/components/ui/button"
import TextInput from "@/components/ui/inputText"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { useCartStore } from "@/store/cartStore"

const AutorisationPage: React.FC = () => {
  const [formData, setFormData] = useState({ login: '', password: '' })
  const [error, setError] = useState('')
  const router = useRouter()
  const { login } = useAuthStore()
  const { syncCartWithUser } = useCartStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const success = login(formData.login, formData.password)
      if (success) {
        await syncCartWithUser() // Синхронизируем корзину после успешного входа
        router.push('/')
      } else {
        setError('Неверный логин или пароль')
      }
    } catch (err) {
      setError('Ошибка при авторизации')
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
        placeholder="Введите логин"
        value={formData.login}
        onChange={handleChange}
        required
      />
      <TextInput
        name="password"
        type="password"
        placeholder="Введите пароль"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button text="Войти" />
      <div className="text-sm">
        Если у вас ещё нет аккаунта <Link href='/registration' className="text-blue-500">зарегистрируйтесь</Link>
      </div>
    </form>
  )
}

export default AutorisationPage