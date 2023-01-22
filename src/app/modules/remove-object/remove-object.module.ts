import {NgModule} from '@angular/core';
import {AppDirectivesModule} from 'src/app/directives/app-directives.module';
import {CommonModule} from '@angular/common';
import {RemoveButtonComponent} from 'src/app/modules/remove-object/remove-button/remove-button.component';
import {RemoveModalComponent} from 'src/app/modules/remove-object/remove-modal/remove-modal.component';
import {ComponentsModule} from 'src/app/components/components.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {AppFormsModule} from 'src/app/modules/app-forms/app-forms.module';


@NgModule({
    imports: [
        AppDirectivesModule,
        AppFormsModule,
        CommonModule,
        ComponentsModule,
        FontAwesomeModule,
        TranslationsModule,
    ],
    declarations: [
        RemoveButtonComponent,
        RemoveModalComponent
    ],
    exports: [
        RemoveButtonComponent,
        RemoveModalComponent
    ]
})
export class RemoveObjectModule {
}
