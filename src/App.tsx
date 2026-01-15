import { useEffect, useState } from 'react';
import Menu from './components/Menu/Menu';
import Search from './components/Search/Search';
import AddListing from './components/AddListing/AddListing';
import UserProfile from './components/UserProfile/UserProfile';
import { init, backButton } from '@telegram-apps/sdk-react';
import './App.css';

// Расширить Window тип для Telegram
declare global {
  interface Window {
    Telegram: any;
  }
}

function App() {
  const [page, setPage] = useState('home');

  useEffect(() => {
    try {
      init();
      // Безопасная проверка Telegram WebApp
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.expand();  // Полноэкранный режим
      }
      backButton.mount();
    } catch (error: unknown) {
      console.error('Ошибка инициализации Telegram SDK:', error);
    }

    return () => {
      backButton.unmount();
    };
  }, []);

  const handleNavigate = (pageName: string) => {
    setPage(pageName);
  };

  const handleAddListing = (title: string, description: string) => {
    console.log('Add listing:', title, description);
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  return (
    <div className="app">
      <Menu onNavigate={handleNavigate} />
      
      {page === 'home' && (
        <div className="home">
          <h1>📱 Telegram Web App</h1>
          <p>Добро пожаловать! Используйте меню для навигации.</p>
        </div>
      )}
      
      {page === 'search' && <Search onSearch={handleSearch} />}
      {page === 'add' && <AddListing onAdd={handleAddListing} />}
      {page === 'profile' && (
        <UserProfile 
          username="Пользователь" 
          email="example@domain.com" 
          onLogout={() => console.log('Logout')} 
        />
      )}
    </div>
  );
}

export default App;
