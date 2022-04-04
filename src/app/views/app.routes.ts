import {Routes} from "@angular/router";


export const appRoutes: Routes = [
    {
        path: 'app',
        loadChildren: () => import('./private/private.module').then(m => m.PrivateModule)
    },
    {
        path: '',
        loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
    }
];
