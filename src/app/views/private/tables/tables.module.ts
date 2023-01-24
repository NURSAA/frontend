import {NgModule} from "@angular/core";
import {TablesComponent} from 'src/app/views/private/tables/tables.component';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {ComponentsModule} from 'src/app/components/components.module';
import {CommonModule} from '@angular/common';
import {AppFormsModule} from 'src/app/modules/app-forms/app-forms.module';
import {AppPipesModule} from 'src/app/pipes/app-pipes.module';


@NgModule({
    imports: [
        TranslationsModule,
        ComponentsModule,
        CommonModule,
        AppFormsModule,
        AppPipesModule,
    ],
    declarations: [
        TablesComponent
    ]
})
export class TablesModule {
}
