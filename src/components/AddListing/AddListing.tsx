import React, { useState } from 'react'

type AddListingProps = {
  onAdd: (title: string, description: string) => void
}

const AddListing: React.FC<AddListingProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleAdd = () => {
    if (title.trim() && description.trim()) {
      onAdd(title.trim(), description.trim())
      setTitle('')
      setDescription('')
    } else {
      alert('Пожалуйста, заполните все поля')
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Заголовок объявления"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Текст объявления"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAdd}>Добавить объявление</button>
    </div>
  )
}

export default AddListing
