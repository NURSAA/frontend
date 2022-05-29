import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {privateRoutes} from "./private.routes";
import {RestaurantListComponent} from "./restaurants/restaurant-list/restaurant-list.component";
import {ComponentsModule} from 'src/app/components/components.module';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(privateRoutes),
        ComponentsModule,
        TranslationsModule
    ],
    declarations: [
        RestaurantListComponent
    ]
})
export class PrivateModule {
}
