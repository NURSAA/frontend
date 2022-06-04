import {Routes} from "@angular/router";
import {RestaurantListComponent} from "./restaurant-list/restaurant-list.component";
import {
    RestaurantDetailsComponent
} from 'src/app/views/private/restaurants/restaurant-details/restaurant-details.component';
import {TablesComponent} from 'src/app/views/private/tables/tables.component';
import {IngredientsComponent} from 'src/app/views/private/ingredients/ingredients.component';


export const restaurantsRoutes: Routes = [
    {
        path: ':id',
        component: RestaurantDetailsComponent,
        children: [
            {
                path: 'tables',
                component: TablesComponent
            },
            {
                path: 'ingredients',
                component: IngredientsComponent
            }
        ]
    },
    {
        path: '',
        component: RestaurantListComponent
    }
];
