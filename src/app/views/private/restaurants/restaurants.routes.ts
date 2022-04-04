import {Routes} from "@angular/router";
import {RestaurantListComponent} from "./restaurant-list/restaurant-list.component";


export const restaurantsRoutes: Routes = [
    {
        path: '',
        component: RestaurantListComponent
    }
];
