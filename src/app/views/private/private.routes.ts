import {Routes} from "@angular/router";


export const privateRoutes: Routes = [
    {
        path: 'restaurants',
        loadChildren: () => import('./restaurants/restaurants.module').then(m => m.RestaurantsModule)
    },
    {
        path: 'menus',
        loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)
    },
    {
        path: 'ingredients',
        loadChildren: () => import('./ingredients/ingredients.module').then(m => m.IngredientsModule)
    },
    {
        path: '',
        redirectTo: 'restaurants',
        pathMatch: 'full',
    }
];
