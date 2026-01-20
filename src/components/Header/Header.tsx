import { useState } from 'react';
import LangSwitcher from '../LangSwitcher/LangSwitcher';

export default function Header({ onMenuToggle }: { onMenuToggle: () => void }) {
  const [search, setSearch] = useState('');

  return (
    <header className="header">
      <LangSwitcher />
      <div className="city">मुंबई / Mumbai</div>
      <button className="menu-btn" onClick={onMenuToggle}>🍔</button>
      
      <div className="search-container">
        <input 
          className="search-input"
          placeholder="🔍 Поиск объявлений..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="filters-btn">▼</button>
      </div>
    </header>
  );
}
