import { useState } from 'react';

export default function LangSwitcher() {
  const [lang, setLang] = useState('🇮🇳');
  
  return (
    <button className="lang-switcher" onClick={() => setLang(lang === '🇮🇳' ? '🇬🇧' : '🇮🇳')}>
      {lang}
    </button>
  );
}
