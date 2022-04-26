import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginCardComponent} from 'src/app/components/login-card/login-card.component';
import {NavBarComponent} from 'src/app/components/nav-bar/nav-bar.component';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {RouterModule} from '@angular/router';


@NgModule({
    imports: [
        CommonModule,
        TranslationsModule,
        RouterModule,
    ],
    declarations: [
        LoginCardComponent,
        NavBarComponent
    ],
    exports: [
        LoginCardComponent,
        NavBarComponent
    ]
})
export class ComponentsModule {
}
