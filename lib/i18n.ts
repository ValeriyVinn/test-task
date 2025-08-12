
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import en from '../public/locales/en/common.json';
// import uk from '../public/locales/uk/common.json';

// i18n.use(initReactI18next).init({
//   resources: {
//     en: { translation: en },
//     uk: { translation: uk },
//   },
//   lng: 'en',
//   fallbackLng: 'en',
//   interpolation: { escapeValue: false }
// });

// export default i18n;
// lib/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../public/locales/en/common.json';
import uk from '../public/locales/uk/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      uk: { common: uk },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
