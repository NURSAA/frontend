import {NgModule} from "@angular/core";
import {TablesComponent} from 'src/app/views/private/tables/tables.component';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {ComponentsModule} from 'src/app/components/components.module';
import {CommonModule} from '@angular/common';
import {AppFormsModule} from 'src/app/modules/app-forms/app-forms.module';


@NgModule({
    imports: [
        TranslationsModule,
        ComponentsModule,
        CommonModule,
        AppFormsModule,
    ],
    declarations: [
        TablesComponent
    ]
})
export class TablesModule {
}
