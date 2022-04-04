import {Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";


export const publicRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
