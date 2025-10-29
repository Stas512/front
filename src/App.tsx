import { useEffect, useState } from 'react';
import Menu from './components/Menu/Menu';
import Search from './components/Search/Search';
import AddListing from './components/AddListing/AddListing';
import UserProfile from './components/UserProfile/UserProfile';
import { init, backButton } from '@telegram-apps/sdk-react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState('home');

  useEffect(() => {
    try {
      init();
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

  return (
    <>
      <Menu onNavigate={handleNavigate} />
      {page === 'home' && (
        <>
          <div>
            <a href="https://vite.dev" target="_blank" rel="noreferrer">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noreferrer">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>Edit <code>src/App.tsx</code> and save to test HMR</p>
          </div>
        </>
      )}
      {page === 'search' && <Search onSearch={(q) => console.log('Search query:', q)} />}
      {page === 'add' && <AddListing onAdd={(title, desc) => console.log('Add listing:', title, desc)} />}
      {page === 'profile' && <UserProfile username="User" email="user@example.com" onLogout={() => console.log('Logout')} />}
    </>
  );
}

export default App;
