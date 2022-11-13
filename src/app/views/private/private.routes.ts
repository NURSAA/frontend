import {Routes} from "@angular/router";
import {RouteAccessGuard} from 'src/app/modules/privileges/route-access.guard';

export const privateRoutes: Routes = [
    {
        path: 'restaurants',
        loadChildren: () => import('./restaurants/restaurants.module').then(m => m.RestaurantsModule),
        canLoad: [RouteAccessGuard],
        canActivate: [RouteAccessGuard]
    },
    {
        path: 'menus',
        loadChildren: () => import('src/app/views/private/menu/menu-views.module').then(m => m.MenuViewsModule),
        canLoad: [RouteAccessGuard],
        canActivate: [RouteAccessGuard]
    },
    {
        path: 'reservations',
        loadChildren: () => import('./reservations/reservations.module').then(m => m.ReservationsModule),
        canLoad: [RouteAccessGuard],
        canActivate: [RouteAccessGuard]
    },
    {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        canLoad: [RouteAccessGuard],
        canActivate: [RouteAccessGuard]
    },
    {
        path: '',
        redirectTo: 'restaurants',
        pathMatch: 'full',
    }
];
