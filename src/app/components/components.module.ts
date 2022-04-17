import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginCardComponent} from 'src/app/components/login-card/login-card.component';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        LoginCardComponent
    ],
    exports: [
        LoginCardComponent
    ]
})
export class ComponentsModule {
}
