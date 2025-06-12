import styles from './style.module.scss'
import React, { useState } from 'react'
import Button from '../../ui/button'
import TextInput from '../../ui/inputText'

interface DeliveryFormProps {
  onSubmit: (formData: { name: string; phone: string; email: string; address: string }) => void
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', address: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form className={styles.deliveryForm} onSubmit={handleSubmit}>
      <TextInput
        name="name"
        placeholder="Фамилия Имя Отчество"
        value={formData.name}
        onChange={handleChange}
      />
      <TextInput
        name="phone"
        placeholder="+7 123 456 7890"
        value={formData.phone}
        onChange={handleChange}
      />
      <TextInput
        name="email"
        placeholder="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextInput
        name="address"
        placeholder="Ваш адрес"
        value={formData.address}
        onChange={handleChange}
      />
      <Button text="Оплатить" />
    </form>
  )
}

export default DeliveryForm
