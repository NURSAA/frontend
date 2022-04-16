import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./login/login.component";
import {publicRoutes} from "./public.routes";
import {RouterModule} from "@angular/router";
import {AppFormsModule} from 'src/app/modules/app-forms/app-forms.module';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';


@NgModule({
    imports: [
        AppFormsModule,
        CommonModule,
        RouterModule.forChild(publicRoutes),
        TranslationsModule,
    ],
    declarations: [
        LoginComponent
    ]
})
export class PublicModule {
}
