import { useEffect, useState } from 'react';
import { init, backButton } from '@telegram-apps/sdk-react';
import Header from './components/Header/Header';
import CategoryGrid from './components/CategoryGrid/CategoryGrid';
import PlaceAdButton from './components/PlaceAdButton/PlaceAdButton';
import Menu from './components/Menu/Menu';
import Search from './components/Search/Search';
import AddListing from './components/AddListing/AddListing';
import UserProfile from './components/UserProfile/UserProfile';
import './App.css';

type Page = 'home' | 'search' | 'add' | 'profile';

function App() {
  const [page, setPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ ФИНАЛЬНЫЙ useEffect (без ошибок локально)
  useEffect(() => {
    init();
    
    // ✅ Безопасная проверка Telegram WebApp
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      
      tg.expand(); // Мобильный fullscreen
      
      // ПК fullscreen (если доступно)
      if (tg.requestFullscreen) {
        tg.requestFullscreen();
      }
      
      // MainButton
      tg.MainButton.text = "🚀 Разместить объявление";
      tg.MainButton.onClick(() => setPage('add'));
      tg.MainButton.show();
      
      // Хедер
      tg.headerColor = "#6366f1";
    }
    
    backButton.mount();
    return () => backButton.unmount();
  }, []);

  const handleNavigate = (pageName: string) => {
    setPage(pageName as Page);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="app">  {/* ✅ ТОЛЬКО className! ФОН в CSS */}
      <Header onMenuToggle={toggleMenu} />
      
      {isMenuOpen && (
        <Menu onNavigate={handleNavigate} className="menu-overlay" />
      )}
      
      <main className="main-content">
        {page === 'home' && (
          <>
            <CategoryGrid />
            <PlaceAdButton />
          </>
        )}
        
        {page === 'search' && <Search onSearch={() => {}} />}
        {page === 'add' && <AddListing onAdd={() => {}} />}
        {page === 'profile' && (
          <UserProfile 
            username="Пользователь" 
            email="example@domain.com" 
            onLogout={() => {}}
          />
        )}
      </main>
    </div>
  );
}

export default App;
