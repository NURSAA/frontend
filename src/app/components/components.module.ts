import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginCardComponent} from 'src/app/components/login-card/login-card.component';
import {NavBarComponent} from 'src/app/components/nav-bar/nav-bar.component';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {RouterModule} from '@angular/router';
import {AppListComponent} from 'src/app/components/app-list/app-list.component';
import {LoadingComponent} from 'src/app/components/loading/loading.component';
import {AppModalComponent} from 'src/app/components/app-modal/app-modal.component';
import {AppCollapseComponent} from 'src/app/components/app-collapse/app-collapse.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AppPipesModule} from 'src/app/pipes/app-pipes.module';


@NgModule({
    imports: [
        CommonModule,
        TranslationsModule,
        RouterModule,
        FontAwesomeModule,
        AppPipesModule,
    ],
    declarations: [
        AppListComponent,
        AppModalComponent,
        LoginCardComponent,
        NavBarComponent,
        LoadingComponent,
        AppCollapseComponent
    ],
    exports: [
        AppListComponent,
        AppModalComponent,
        LoginCardComponent,
        NavBarComponent,
        LoadingComponent,
        AppCollapseComponent
    ]
})
export class ComponentsModule {
}
