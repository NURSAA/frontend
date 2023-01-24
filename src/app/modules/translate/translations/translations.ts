import {enTranslations} from 'src/app/modules/translate/translations/en';
import {plTranslations} from 'src/app/modules/translate/translations/pl';

export const translations = {
    en: enTranslations,
    pl: plTranslations,
} as const;

export const languageKeys = Object.keys(translations);

export type ILanguageKey = keyof typeof translations;
