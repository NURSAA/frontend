import {NgModule} from '@angular/core';
// eslint-disable-next-line no-restricted-imports
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormDirective} from 'src/app/modules/app-forms/directives/form.directive';
import {SubmitDirective} from 'src/app/modules/app-forms/directives/submit.directive';
import {AppInputComponent} from 'src/app/modules/app-forms/app-input/app-input.component';
import {CommonModule} from '@angular/common';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TranslationsModule
    ],
    declarations: [
        AppInputComponent,
        FormDirective,
        SubmitDirective
    ],
    exports: [
        AppInputComponent,
        FormDirective,
        SubmitDirective,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AppFormsModule {
}
