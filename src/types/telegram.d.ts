// src/types/telegram.d.ts  ← НОВЫЙ ФАЙЛ
import { TelegramWebApp } from '@telegram-apps/sdk-react';

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

export {};
