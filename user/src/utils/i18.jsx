import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

// const resources = {
//     en: {
//         translation: {
//             "categoryTitle": "My Categories"
//         }
//     },
//     ar: {
//         translation: {
//             "categoryTitle": "أصنافي"
//         }
//     }
// };

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(backend)
  .init({
    // resources,
    // lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    // fallbackLng: "en",
    detection: {
      order: [
        'cookie',
        'querystring',
        'localStorage',
        'sessionStorage',
        'navigator',
        'htmlTag',
        'path',
        'subdomain',
      ],
      caches: ['cookie'],
    },
    backend: { loadPath: './locales/{{lng}}/translation.json' },
    // interpolation: {
    //     escapeValue: false // react already safes from xss
    // }
  });

export default i18n;
