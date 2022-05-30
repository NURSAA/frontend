import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {restaurantsRoutes} from "./restaurants.routes";
import {
    RestaurantDetailsComponent
} from 'src/app/views/private/restaurants/restaurant-details/restaurant-details.component';
import {RestaurantListComponent} from 'src/app/views/private/restaurants/restaurant-list/restaurant-list.component';
import {ComponentsModule} from 'src/app/components/components.module';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {AppFormsModule} from 'src/app/modules/app-forms/app-forms.module';


@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        RouterModule.forChild(restaurantsRoutes),
        TranslationsModule,
        AppFormsModule
    ],
    declarations: [
        RestaurantDetailsComponent,
        RestaurantListComponent
    ]
})
export class RestaurantsModule {
}
