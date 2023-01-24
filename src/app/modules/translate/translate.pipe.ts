import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from 'src/app/modules/translate/translate.service';
import {ILanguageKey} from 'src/app/modules/translate/translations/translations';


@Pipe({
    name: 'translate',
    // eslint-disable-next-line @angular-eslint/no-pipe-impure
    pure: false
})
export class TranslatePipe implements PipeTransform {
    lastResolveLanguageKey?: ILanguageKey;
    lastTranslation?: string;

    constructor(
        private translateService: TranslateService
    ) {
    }

    transform(key: string): string {
        if (this.lastResolveLanguageKey !== this.translateService.getCurrentLanguage()) {
            this.lastResolveLanguageKey = this.translateService.getCurrentLanguage();
            this.lastTranslation = this.translateService.get(key);
        }

        return this.lastTranslation as string;
    }
}
