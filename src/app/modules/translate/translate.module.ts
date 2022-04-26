import {NgModule} from '@angular/core';
import {TranslatePipe} from 'src/app/modules/translate/translate.pipe';


@NgModule({
    declarations: [
        TranslatePipe
    ],
    exports: [
        TranslatePipe
    ]
})
export class TranslationsModule {
}
