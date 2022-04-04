import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {restaurantsRoutes} from "./restaurants.routes";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(restaurantsRoutes)
  ]
})
export class RestaurantsModule {
}
