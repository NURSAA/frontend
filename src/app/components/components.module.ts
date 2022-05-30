import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginCardComponent} from 'src/app/components/login-card/login-card.component';
import {NavBarComponent} from 'src/app/components/nav-bar/nav-bar.component';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {RouterModule} from '@angular/router';
import {AppListComponent} from 'src/app/components/app-list/app-list.component';
import {LoadingComponent} from 'src/app/components/loading/loading.component';
import {AppDetailsComponent} from "./app-details/app-details.component";


@NgModule({
    imports: [
        CommonModule,
        TranslationsModule,
        RouterModule,
    ],
    declarations: [
        AppListComponent,
        AppDetailsComponent,
        LoginCardComponent,
        NavBarComponent,
        LoadingComponent
    ],
    exports: [
        AppListComponent,
        AppDetailsComponent,
        LoginCardComponent,
        NavBarComponent,
        LoadingComponent
    ]
})
export class ComponentsModule {
}
