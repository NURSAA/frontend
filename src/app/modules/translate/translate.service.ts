import {Injectable} from '@angular/core';
import {ITranslation} from 'src/app/modules/translate/interfaces';
import {enTranslations} from 'src/app/modules/translate/translations/en';


@Injectable({
    providedIn: 'root'
})
export class TranslateService {
    private language = 'en';
    private translations: Record<string, ITranslation[]> = {
        en: enTranslations
    };

    get(key: string): string {
        if (!this.translations[this.language]) {
            return key;
        }

        const searched = this.translations[this.language].find((translation) => {
            return translation.key === key;
        });
        return searched
            ? searched.value
            : key;
    }
}
