import React from 'react'

type UserProfileProps = {
  username: string
  email: string
  onLogout: () => void
}

const UserProfile: React.FC<UserProfileProps> = ({ username, email, onLogout }) => {
  return (
    <div>
      <h2>Личный кабинет</h2>
      <p>Пользователь: {username}</p>
      <p>Email: {email}</p>
      <button onClick={onLogout}>Выйти</button>
    </div>
  )
}

export default UserProfile
