import {Component, OnInit} from '@angular/core';
import {ILanguageKey, languageKeys} from 'src/app/modules/translate/translations/translations';
import {TranslateService} from 'src/app/modules/translate/translate.service';


@Component({
    selector: 'change-language',
    templateUrl: './change-language.component.html'
})
export class ChangeLanguageComponent implements OnInit {
    currentLanguage?: ILanguageKey;
    availableLanguages = languageKeys;

    constructor(
        private translateService: TranslateService
    ) {
    }

    ngOnInit(): void {
        this.currentLanguage = this.translateService.getCurrentLanguage();
    }

    changeLanguage(languageKey: ILanguageKey): void {
        this.translateService.changeLanguage(languageKey);
    }
}
