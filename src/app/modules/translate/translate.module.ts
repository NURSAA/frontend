import {NgModule} from '@angular/core';
import {TranslatePipe} from 'src/app/modules/translate/translate.pipe';
import {ChangeLanguageComponent} from 'src/app/modules/translate/change-language/change-language.component';
// eslint-disable-next-line no-restricted-imports
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [
        ChangeLanguageComponent,
        TranslatePipe
    ],
    exports: [
        ChangeLanguageComponent,
        TranslatePipe
    ]
})
export class TranslationsModule {
}
