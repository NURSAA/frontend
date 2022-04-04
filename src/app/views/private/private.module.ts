import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {privateRoutes} from "./private.routes";
import {RestaurantListComponent} from "./restaurants/restaurant-list/restaurant-list.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(privateRoutes)
  ],
  declarations: [
    RestaurantListComponent
  ]
})
export class PrivateModule {
}
