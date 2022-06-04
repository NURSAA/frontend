import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {tablesRoutes} from "src/app/views/private/tables/tables.routes";
import {TablesComponent} from 'src/app/views/private/tables/tables.component';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {ComponentsModule} from 'src/app/components/components.module';
import {CommonModule} from '@angular/common';


@NgModule({
    imports: [
        RouterModule.forChild(tablesRoutes),
        TranslationsModule,
        ComponentsModule,
        CommonModule,
    ],
    declarations: [
        TablesComponent
    ]
})
export class TablesModule {
}
