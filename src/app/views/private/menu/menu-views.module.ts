import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ComponentsModule} from 'src/app/components/components.module';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {AppFormsModule} from 'src/app/modules/app-forms/app-forms.module';
import {menuRoutes} from 'src/app/views/private/menu/menu.routes';
import {MenuListComponent} from 'src/app/views/private/menu/menu-list/menu-list.component';
import {MenuDetailsComponent} from 'src/app/views/private/menu/menu-details/menu-details.component';
import {CommonModule} from '@angular/common';
import {AppPipesModule} from 'src/app/pipes/app-pipes.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AppDirectivesModule} from 'src/app/directives/app-directives.module';


@NgModule({
    imports: [
        AppFormsModule,
        ComponentsModule,
        RouterModule.forChild(menuRoutes),
        TranslationsModule,
        CommonModule,
        AppPipesModule,
        FontAwesomeModule,
        AppDirectivesModule
    ],
    declarations: [
        MenuListComponent,
        MenuDetailsComponent
    ]
})
export class MenuViewsModule {
}
