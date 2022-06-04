import {Routes} from "@angular/router";

export const privateRoutes: Routes = [
    {
        path: 'restaurants',
        loadChildren: () => import('./restaurants/restaurants.module').then(m => m.RestaurantsModule)
    },
    {
        path: 'menus',
        loadChildren: () => import('src/app/views/private/menu/menu-views.module').then(m => m.MenuViewsModule)
    },
    {
        path: 'ingredients',
        loadChildren: () => import('./ingredients/ingredients.module').then(m => m.IngredientsModule)
    },
    {
        path: 'reservations',
        loadChildren: () => import('./reservations/reservations.module').then(m => m.ReservationsModule)
    },
    {
        path: 'tables',
        loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
    },
    {
        path: '',
        redirectTo: 'restaurants',
        pathMatch: 'full',
    }
];
