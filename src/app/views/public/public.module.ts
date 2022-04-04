import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./login/login.component";
import {publicRoutes} from "./public.routes";
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(publicRoutes)
  ],
  declarations: [
    LoginComponent
  ]
})
export class PublicModule {
}
