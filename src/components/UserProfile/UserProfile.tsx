// src/components/UserProfile/UserProfile.tsx
import React, { useState, useEffect } from 'react';

type UserProfileProps = {
  username: string;
  userId?: number;
  email: string;
  onLogout: () => void;
};

const UserProfile: React.FC<UserProfileProps> = ({ 
  username, 
  userId = 0, 
  email, 
  onLogout 
}) => {
  const [profile, setProfile] = useState({
    bio: '',
    age: '',
    city: 'Калининград'
  });
  const [isEditing, setIsEditing] = useState(false);

  // LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('profile');
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const saveProfile = () => {
    localStorage.setItem('profile', JSON.stringify(profile));
    
    // Telegram MainButton progress (безопасно)
    if (window.Telegram?.WebApp?.MainButton) {
      window.Telegram.WebApp.MainButton.showProgress();
      setTimeout(() => window.Telegram.WebApp.MainButton.hideProgress(), 1000);
    }
    
    setIsEditing(false);
  };

  const updateField = (field: keyof typeof profile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '400px', 
      margin: '0 auto',
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      minHeight: '100vh'
    }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '24px' }}>
        👤 Личный кабинет
      </h2>
      
      {/* Аватар + основная информация */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '24px',
        paddingBottom: '20px',
        borderBottom: '1px solid #eee'
      }}>
        <div style={{ 
          fontSize: '64px', 
          marginBottom: '16px',
          display: 'inline-block'
        }}>👨‍💻</div>
        <h3 style={{ margin: '0 0 8px 0', color: '#6366f1' }}>
          {username}
          {userId ? <span style={{ fontSize: '14px', color: '#666' }}>
            (ID: {userId})
          </span> : null}
        </h3>
        <p style={{ margin: '0 0 16px 0', color: '#666' }}>
          {email}
        </p>
      </div>

      {/* Редактируемые поля */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          📝 О себе:
        </label>
        <input
          type="text"
          value={profile.bio}
          onChange={(e) => updateField('bio', e.target.value)}
          placeholder="Расскажите о себе..."
          disabled={!isEditing}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: `2px solid ${isEditing ? '#00d4aa' : '#e5e7eb'}`,
            borderRadius: '12px',
            fontSize: '16px',
            boxSizing: 'border-box',
            background: isEditing ? 'white' : '#f9fafb'
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          🎂 Возраст:
        </label>
        <input
          type="number"
          value={profile.age}
          onChange={(e) => updateField('age', e.target.value)}
          placeholder="Возраст"
          disabled={!isEditing}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: `2px solid ${isEditing ? '#00d4aa' : '#e5e7eb'}`,
            borderRadius: '12px',
            fontSize: '16px',
            boxSizing: 'border-box',
            background: isEditing ? 'white' : '#f9fafb'
          }}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          📍 Город:
        </label>
        <input
          type="text"
          value={profile.city}
          onChange={(e) => updateField('city', e.target.value)}
          placeholder="Ваш город"
          disabled={!isEditing}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: `2px solid ${isEditing ? '#00d4aa' : '#e5e7eb'}`,
            borderRadius: '12px',
            fontSize: '16px',
            boxSizing: 'border-box',
            background: isEditing ? 'white' : '#f9fafb'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              padding: '14px 20px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ✏️ Редактировать
          </button>
        ) : (
          <button
            onClick={saveProfile}
            style={{
              padding: '14px 20px',
              background: '#00d4aa',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            💾 Сохранить
          </button>
        )}
        
        <button
          onClick={onLogout}
          style={{
            padding: '14px 20px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          🚪 Выйти
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
