const categories = [
  { emoji: '🏍️', name: 'МОТОЦИКЛЫ', top: '⭐⭐⭐ Pulsar ₹1.2L Mumbai' },
  { emoji: '📱', name: 'ТЕЛЕФОНЫ', top: '⭐⭐ iPhone ₹35K Mumbai' },
  { emoji: '👗', name: 'ОДЕЖДА', top: '⭐ Saree ₹8K BLR' },
  { emoji: '🚗', name: 'АВТО', top: '⭐ Swift ₹4.5L Delhi' },
  { emoji: '💻', name: 'НОУТБУКИ', top: '⭐ Dell i5 ₹25K BLR' },
  { emoji: '🏠', name: 'ДОМЫ', top: '⭐ 1BHK ₹25K/мес' }
];

export default function CategoryGrid() {
  return (
    <div className="category-grid">
      {categories.map(cat => (
        <div key={cat.emoji} className="category-card">
          <div className="emoji">{cat.emoji}</div>
          <div className="cat-name">{cat.name}</div>
          <div className="top-ad">{cat.top}</div>
        </div>
      ))}
    </div>
  );
}
