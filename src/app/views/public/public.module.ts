import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./login/login.component";
import {publicRoutes} from "./public.routes";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(publicRoutes),
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class PublicModule {
}
