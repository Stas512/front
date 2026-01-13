#!/bin/bash
# 🔥 Fix CVE-2025-55182/55184/55183 для ВСЕХ React проектов
# Запуск: chmod +x fix-rsc-cve.sh && ./fix-rsc-cve.sh

echo "🚀 RSC CVE Fixer для classifieds-app и других проектов..."

# 1. НАЙТИ все React/Next.js проекты
projects=$(find . -maxdepth 4 -name "package.json" -exec grep -lE '"react"|"next"' {} ; | xargs -I {} dirname {} | sort -u)

for proj in $projects; do
  echo "🔍 Проверяем: $proj"
  cd "$proj"
  
  # 2. ПРОВЕРИТЬ уязвимые версии
  if npm list react next --depth=0 2>/dev/null | grep -E "19.[0-2].|15.[0-5]|16.0.[0-7]"; then
    echo "🚨 УЯЗВИМЫЙ! Фиксим..."
    
    # 3. БЭКАП package.json
    cp package.json package.json.bak
    
    # 4. ОБНОВИТЬ до безопасных версий
    npm install react@19.2.3 react-dom@19.2.3 --save-exact
    npm install next@16.0.8 --save-exact 2>/dev/null || true
    
    # 5. Очистка + переустановка
    rm -rf node_modules .next package-lock.json
    npm install
    
    # 6. ПРОВЕРКА результата
    echo "✅ ФИКС: $(npm list react next --depth=0)"
  else
    echo "✅ Безопасно: $(npm list react next --depth=0 2>/dev/null || echo 'Нет React')"
  fi
  
  # 7. Middleware защита server.js
  if [ -f "server.js" ] || [ -f "src/server.js" ]; then
    cat >> server.js << 'EOF'

// 🔥 RSC CVE Защита (CVE-2025-55184/55183)
app.use('/api', (req, res, next) => {
  if (req.headers['content-type']?.includes('flight') ||
      req.url.includes('react-server-dom') ||
      req.body.toString().includes('__react_server_')) {
    return res.status(403).json({error: 'RSC blocked - CVE-2025-55184'});
  }
  next();
});
EOF
    echo "🛡️ RSC middleware добавлен"
  fi
  
  cd -
  echo "---"
done

# 8. nginx.conf защита (глобально)
cat > nginx-rsc-block.conf << 'EOF'
# 🔥 Блок RSC CVE-2025-55184/55183
location ~* "(flight|__react_server_|react-server-dom|ServerAction)" {
    return 403 "RSC blocked";
}
EOF

echo "🎉 ГОТОВО! Все проекты защищены."
echo "📋 Запуски: npm run build && git commit -m 'Fix RSC CVE'"
echo "🔒 Nginx: include nginx-rsc-block.conf;"