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

  // ✅ ФИНАЛЬНЫЙ useEffect (ПК F11 + Мобильный fullscreen)
  useEffect(() => {
    init();
    
    if (window.Telegram?.WebApp) {
      // ✅ Мобильный: 100vh без поля ввода
      window.Telegram.WebApp.expand();
      
      // ✅ ПК: настоящий F11 fullscreen
      if (window.Telegram.WebApp.requestFullscreen) {
        window.Telegram.WebApp.requestFullscreen();
      }
      
      // ✅ MainButton (зеленая кнопка снизу)
      window.Telegram.WebApp.MainButton.text = "🚀 Разместить объявление";
      window.Telegram.WebApp.MainButton.onClick(() => {
        setPage('add');
      });
      window.Telegram.WebApp.MainButton.show();
      
      // ✅ Фиолетовый градиент хедера Telegram
      window.Telegram.WebApp.headerColor = "#6366f1";
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
    <div className="app">
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
