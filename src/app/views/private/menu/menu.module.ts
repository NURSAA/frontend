import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ComponentsModule} from 'src/app/components/components.module';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {AppFormsModule} from 'src/app/modules/app-forms/app-forms.module';
import {menuRoutes} from 'src/app/views/private/menu/menu.routes';
import {MenuEditorComponent} from 'src/app/views/private/menu/menu-editor/menu-editor.component';
import {MenuListComponent} from 'src/app/views/private/menu/menu-list/menu-list.component';
import {MenuDetailsComponent} from 'src/app/views/private/menu/menu-details/menu-details.component';


@NgModule({
    imports: [
        AppFormsModule,
        CommonModule,
        ComponentsModule,
        RouterModule.forChild(menuRoutes),
        TranslationsModule
    ],
    declarations: [
        MenuEditorComponent,
        MenuListComponent,
        MenuDetailsComponent
    ]
})
export class MenuModule {
}
