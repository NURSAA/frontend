import {Routes} from "@angular/router";
import {RestaurantListComponent} from "./restaurant-list/restaurant-list.component";
import {
    RestaurantDetailsComponent
} from 'src/app/views/private/restaurants/restaurant-details/restaurant-details.component';


export const restaurantsRoutes: Routes = [
    {
        path: ':id',
        component: RestaurantDetailsComponent
    },
    {
        path: '',
        component: RestaurantListComponent
    }
];
