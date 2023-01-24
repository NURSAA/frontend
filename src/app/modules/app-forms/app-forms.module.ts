import {NgModule} from '@angular/core';
// eslint-disable-next-line no-restricted-imports
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormDirective} from 'src/app/modules/app-forms/directives/form.directive';
import {SubmitDirective} from 'src/app/modules/app-forms/directives/submit.directive';
import {AppInputComponent} from 'src/app/modules/app-forms/app-input/app-input.component';
import {CommonModule} from '@angular/common';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {AppFormErrorComponent} from 'src/app/modules/app-forms/app-form-error/app-form-error.component';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TranslationsModule
    ],
    declarations: [
        AppInputComponent,
        AppFormErrorComponent,
        FormDirective,
        SubmitDirective
    ],
    exports: [
        AppInputComponent,
        AppFormErrorComponent,
        FormDirective,
        SubmitDirective,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AppFormsModule {
}
