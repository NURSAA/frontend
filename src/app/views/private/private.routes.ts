import {Routes} from "@angular/router";

export const privateRoutes: Routes = [
    {
        path: 'restaurants',
        loadChildren: () => import('./restaurants/restaurants.module').then(m => m.RestaurantsModule)
    },
    {
        path: '',
        redirectTo: 'restaurants',
        pathMatch: 'full',
    }
];
