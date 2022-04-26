import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./login/login.component";
import {publicRoutes} from "./public.routes";
import {RouterModule} from "@angular/router";
import {AppFormsModule} from 'src/app/modules/app-forms/app-forms.module';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {RegisterComponent} from 'src/app/views/public/register/register.component';
import {ComponentsModule} from 'src/app/components/components.module';


@NgModule({
    imports: [
        AppFormsModule,
        CommonModule,
        RouterModule.forChild(publicRoutes),
        TranslationsModule,
        ComponentsModule,
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ]
})
export class PublicModule {
}
