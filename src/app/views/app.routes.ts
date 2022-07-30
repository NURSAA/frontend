import {Routes} from "@angular/router";
import {AuthGuard} from 'src/app/modules/privileges/auth.guard';


export const appRoutes: Routes = [
    {
        path: 'app',
        loadChildren: () => import('./private/private.module').then(m => m.PrivateModule),
        canActivate: [AuthGuard],
    },
    {
        path: '',
        loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
        canActivate: [AuthGuard],
    }
];
