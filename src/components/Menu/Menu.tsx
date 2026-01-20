import React from 'react'

type MenuProps = {
  onNavigate: (page: string) => void
  className?: string  // ✅ Добавлено!
}

const Menu: React.FC<MenuProps> = ({ onNavigate, className }) => {
  return (
    <nav className={className}>  // ✅ Использует className из App.tsx
      <ul>
        <li><button onClick={() => onNavigate('home')}>Главная</button></li>
        <li><button onClick={() => onNavigate('search')}>Поиск</button></li>
        <li><button onClick={() => onNavigate('add')}>Добавить объявление</button></li>
        <li><button onClick={() => onNavigate('profile')}>Личный кабинет</button></li>
      </ul>
    </nav>
  )
}

export default Menu
