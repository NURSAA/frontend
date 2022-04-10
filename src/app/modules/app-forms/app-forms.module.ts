import {NgModule} from '@angular/core';
// eslint-disable-next-line no-restricted-imports
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormDirective} from 'src/app/modules/app-forms/form.directive';
import {SubmitDirective} from 'src/app/modules/app-forms/submit.directive';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        FormDirective,
        SubmitDirective
    ],
    exports: [
        FormDirective,
        SubmitDirective,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AppFormsModule {
}
