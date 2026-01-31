import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Language } from './types';

type Dictionary = Record<string, string>;
type Translations = Record<Language, Dictionary>;

const translations: Translations = {
  uz: {
    'nav.home': 'Bosh sahifa',
    'nav.submit': 'Yuborish',
    'nav.launch': 'Ochish',
    'brand.title': 'REVEAL 2026',
    'footer.company': '© 2026 STARTUP REVEAL INC.',
    'footer.location': 'TOSHKENT, OʻZBEKISTON',

    'hero.est': 'EST. 2026',
    'hero.title': 'STARTUP REVEAL',
    'hero.subtitle1': 'Yilning eng kutilgan innovatsiya tadbiri.',
    'hero.subtitle2': 'Tanlov yopilishidan oldin gʻoyangizni yuboring.',

    'submission.phase': 'Yuborish bosqichi',
    'submission.selectionDate': 'Tanlash kuni',
    'submission.selectionValue': '7 Fev 2026, 23:59',
    'submission.endsIn': 'Tugashiga',
    'submission.closedTitle': 'Tanlov tugadi',
    'submission.closedSubtitle': 'Ariza topshirish oynasi yopildi',
    'submission.button.submit': 'Startapingizni yuboring',
    'submission.button.closed': 'Yuborish yopiq',

    'reveal.title': 'Ochish marosimi',
    'reveal.countdown': 'Ochilishiga',
    'reveal.protocolUnlocked': 'Protokol ochildi',
    'reveal.button.viewStartups': 'Ochilgan startaplar',
    'reveal.button.viewTimer': 'Ochilish taymeri',

    'submit.title': 'Startap yuborish',
    'submit.closedTitle': 'Yuborish yopilgan',
    'submit.closedDescription': '7 fevral, 23:59 muddati oʻtdi.',
    'submit.deadlineBadge': 'Tanlov muddati',
    'submit.deadlineValue': 'Fev 7, 23:59',
    'submit.helper': 'Formani toʻldiring. Yuborgach, maʼlumotlar ochilguncha bloklanadi.',
    'submit.input.name': 'Startap nomi',
    'submit.placeholder.name': 'masalan, Nexus AI',
    'submit.input.founder': 'Foydalanuvchi / Asoschi',
    'submit.placeholder.founder': 'Toʻliq ism',
    'submit.input.phone': 'Telefon raqam',
    'submit.placeholder.phone': '+998901234567',
    'submit.input.about': 'Startap haqida (kamida 30 ta belgi)',
    'submit.placeholder.about': 'Innovatsiyangizni tasvirlab bering...',
    'submit.input.file': 'Fayl (ixtiyoriy)',
    'submit.input.fileHelper': 'PDF/rasm/word fayl yuklash mumkin.',
    'submit.button.submit': 'Yuborish va bloklash',
    'submit.button.closed': 'Yuborish yopiq',
    'submit.countdown': 'Yuborish uchun qolgan vaqt',
    'submit.success.title': 'Ariza qabul qilindi',
    'submit.success.subtitle': 'Startapingiz shifrlanib bloklandi.',
    'submit.success.status': 'Holat',
    'submit.success.unlockDate': 'Ochilish sanasi',
    'submit.success.unlockTime': 'Ochilish vaqti',
    'submit.success.backHome': 'Bosh sahifaga qaytish',
    'submit.success.subscribe': '@FIgmalar kanaliga obuna bo\'ling',
    'submit.error.generic': 'Xatolik yuz berdi. Qayta urinib ko‘ring.',

    'errors.name': 'Startap nomi kamida 2 ta belgi boʻlishi kerak.',
    'errors.founder': 'Asoschi ismi shart.',
    'errors.phone': 'Format +998XXXXXXXXX boʻlishi kerak.',
    'errors.about': 'Iltimos, kamida 30 ta belgi bilan taʼrif bering.',

    'launch.accessDenied': 'Kirish rad etildi',
    'launch.description': 'Startaplar roʻyxati hozircha shifrlangan. Dekodlash 14 Fev 2026 da boshlanadi.',
    'launch.countdown': 'Dekodlashga qolgan vaqt',
    'launch.protocolUnlocked': 'Protokol ochildi',
    'launch.title': 'Ochilgan startaplar',
    'launch.searchPlaceholder': 'Nomi yoki asoschi bo‘yicha qidirish...',
    'launch.founder': 'Asoschi',
    'launch.revealedAt': 'Ochilgan vaqt',
    'launch.contact': 'Aloqa',
  },
  en: {
    'nav.home': 'Home',
    'nav.submit': 'Submit',
    'nav.launch': 'Launch',
    'brand.title': 'REVEAL 2026',
    'footer.company': '© 2026 STARTUP REVEAL INC.',
    'footer.location': 'TASHKENT, UZBEKISTAN',

    'hero.est': 'EST. 2026',
    'hero.title': 'STARTUP REVEAL',
    'hero.subtitle1': 'The most anticipated innovation event of the year.',
    'hero.subtitle2': 'Submit your idea before the breach closes.',

    'submission.phase': 'Submission Phase',
    'submission.selectionDate': 'Selection Date',
    'submission.selectionValue': 'Feb 7, 2026, 23:59',
    'submission.endsIn': 'Ends In',
    'submission.closedTitle': 'Submission Closed',
    'submission.closedSubtitle': 'Submission window closed',
    'submission.button.submit': 'Submit Your Startup',
    'submission.button.closed': 'Submissions Closed',

    'reveal.title': 'The Reveal',
    'reveal.countdown': 'Reveal Starts In',
    'reveal.protocolUnlocked': 'Protocol Unlocked',
    'reveal.button.viewStartups': 'View Revealed Startups',
    'reveal.button.viewTimer': 'View Reveal Timer',

    'submit.title': 'Submit Startup',
    'submit.closedTitle': 'Submission Closed',
    'submit.closedDescription': 'The deadline of Feb 7, 23:59 has passed.',
    'submit.deadlineBadge': 'Selection Deadline',
    'submit.deadlineValue': 'Feb 7, 23:59',
    'submit.helper': 'Fill out the form below. Once submitted, your data will be locked until the reveal.',
    'submit.input.name': 'Startup Name',
    'submit.placeholder.name': 'e.g. Nexus AI',
    'submit.input.founder': 'Founder Name',
    'submit.placeholder.founder': 'Full Name',
    'submit.input.phone': 'Phone Number',
    'submit.placeholder.phone': '+998901234567',
    'submit.input.about': 'About Startup (Min 30 chars)',
    'submit.placeholder.about': 'Describe your innovation...',
    'submit.input.file': 'Attachment (optional)',
    'submit.input.fileHelper': 'Upload PDF/image/word if you like.',
    'submit.button.submit': 'Submit & Lock',
    'submit.button.closed': 'Submissions Closed',
    'submit.countdown': 'Time Remaining to Submit',
    'submit.success.title': 'Submission Received',
    'submit.success.subtitle': 'Your startup has been encrypted and locked.',
    'submit.success.status': 'Status',
    'submit.success.unlockDate': 'Unlock Date',
    'submit.success.unlockTime': 'Unlock Time',
    'submit.success.backHome': 'Return Home',
    'submit.success.subscribe': 'Subscribe to @FIgmalar',
    'submit.error.generic': 'Something went wrong. Please try again.',

    'errors.name': 'Startup name must be at least 2 characters.',
    'errors.founder': 'Founder name is required.',
    'errors.phone': 'Format must be +998XXXXXXXXX',
    'errors.about': 'Please describe your startup in at least 30 characters.',

    'launch.accessDenied': 'Access Denied',
    'launch.description': 'The startup list is currently encrypted. Decryption protocol initiates on Feb 14, 2026.',
    'launch.countdown': 'Decryption Countdown',
    'launch.protocolUnlocked': 'Protocol Unlocked',
    'launch.title': 'Revealed Startups',
    'launch.searchPlaceholder': 'Search by name or founder...',
    'launch.founder': 'Founder',
    'launch.revealedAt': 'Revealed At',
    'launch.contact': 'Contact',
  },
  ru: {
    'nav.home': 'Главная',
    'nav.submit': 'Подать',
    'nav.launch': 'Запуск',
    'brand.title': 'REVEAL 2026',
    'footer.company': '© 2026 STARTUP REVEAL INC.',
    'footer.location': 'ТАШКЕНТ, УЗБЕКИСТАН',

    'hero.est': 'ОСН. 2026',
    'hero.title': 'STARTUP REVEAL',
    'hero.subtitle1': 'Самое ожидаемое инновационное событие года.',
    'hero.subtitle2': 'Отправьте идею до закрытия окна.',

    'submission.phase': 'Этап подачи',
    'submission.selectionDate': 'Дата отбора',
    'submission.selectionValue': '7 Фев 2026, 23:59',
    'submission.endsIn': 'До конца',
    'submission.closedTitle': 'Подача закрыта',
    'submission.closedSubtitle': 'Окно подачи закрыто',
    'submission.button.submit': 'Отправить стартап',
    'submission.button.closed': 'Подача закрыта',

    'reveal.title': 'Открытие',
    'reveal.countdown': 'До открытия',
    'reveal.protocolUnlocked': 'Протокол разблокирован',
    'reveal.button.viewStartups': 'Посмотреть стартапы',
    'reveal.button.viewTimer': 'Таймер открытия',

    'submit.title': 'Отправить стартап',
    'submit.closedTitle': 'Подача закрыта',
    'submit.closedDescription': 'Дедлайн 7 фев, 23:59 истёк.',
    'submit.deadlineBadge': 'Дедлайн отбора',
    'submit.deadlineValue': '7 фев, 23:59',
    'submit.helper': 'Заполните форму ниже. После отправки данные будут заблокированы до открытия.',
    'submit.input.name': 'Название стартапа',
    'submit.placeholder.name': 'например, Nexus AI',
    'submit.input.founder': 'Имя основателя',
    'submit.placeholder.founder': 'Полное имя',
    'submit.input.phone': 'Номер телефона',
    'submit.placeholder.phone': '+998901234567',
    'submit.input.about': 'О стартапе (мин. 30 символов)',
    'submit.placeholder.about': 'Опишите вашу инновацию...',
    'submit.input.file': 'Файл (опционально)',
    'submit.input.fileHelper': 'Можно прикрепить PDF/изображение/word.',
    'submit.button.submit': 'Отправить и заблокировать',
    'submit.button.closed': 'Подача закрыта',
    'submit.countdown': 'Осталось до подачи',
    'submit.success.title': 'Заявка получена',
    'submit.success.subtitle': 'Ваш стартап зашифрован и заблокирован.',
    'submit.success.status': 'Статус',
    'submit.success.unlockDate': 'Дата открытия',
    'submit.success.unlockTime': 'Время открытия',
    'submit.success.backHome': 'Вернуться домой',
    'submit.success.subscribe': 'Подписаться на @FIgmalar',
    'submit.error.generic': 'Что-то пошло не так. Попробуйте ещё раз.',

    'errors.name': 'Название должно быть не короче 2 символов.',
    'errors.founder': 'Имя основателя обязательно.',
    'errors.phone': 'Формат должен быть +998XXXXXXXXX',
    'errors.about': 'Опишите стартап минимум 30 символами.',

    'launch.accessDenied': 'Доступ запрещён',
    'launch.description': 'Список стартапов зашифрован. Расшифровка начнётся 14 фев 2026.',
    'launch.countdown': 'До расшифровки',
    'launch.protocolUnlocked': 'Протокол разблокирован',
    'launch.title': 'Открытые стартапы',
    'launch.searchPlaceholder': 'Поиск по названию или основателю...',
    'launch.founder': 'Основатель',
    'launch.revealedAt': 'Открыто',
    'launch.contact': 'Контакт',
  },
};

interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  languages: Language[];
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('uz');

  const t = (key: string, vars?: Record<string, string | number>) => {
    const template = translations[language][key] ?? translations.en[key] ?? key;
    if (!vars) return template;
    return Object.entries(vars).reduce((acc, [k, v]) => acc.replace(`{{${k}}}`, String(v)), template);
  };

  const value = useMemo(() => ({ language, setLanguage, t, languages: ['uz', 'en', 'ru'] as Language[] }), [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
};
