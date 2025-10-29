import React, { useState } from 'react'

type SearchProps = {
  onSearch: (query: string) => void
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    onSearch(query.trim())
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Введите запрос для поиска"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch()
        }}
      />
      <button onClick={handleSearch}>Поиск</button>
    </div>
  )
}

export default Search
