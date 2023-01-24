import {Injectable} from '@angular/core';
import {ILanguageKey, translations} from './translations/translations';


@Injectable({
    providedIn: 'root'
})
export class TranslateService {
    private translations = translations;
    private currentLanguage: ILanguageKey = 'en';

    get(key: string): string {
        if (!this.translations[this.currentLanguage]) {
            return key;
        }

        const searched = this.translations[this.currentLanguage].find((translation) => {
            return translation.key === key;
        });
        return searched
            ? searched.value
            : key;
    }

    changeLanguage(key: ILanguageKey): void {
        this.currentLanguage = key;
    }

    getCurrentLanguage(): ILanguageKey {
        return this.currentLanguage;
    }
}
