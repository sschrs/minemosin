/**
 * @author Süleyman Özarslan
 * @version 1.0.0
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { lang } from './language';

i18n.use(initReactI18next).init({
    resources: {
        en: {translations: lang.en},
        tr: {translations: lang.tr},
        de: {translations: lang.de}
    },
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeperator: false,
    interpolation: {
        escapeValue: false,
        formatSeperator: ','
    },
    react: {
        wait: true
    }
});

export default i18n;