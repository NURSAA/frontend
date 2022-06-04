import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {reservationsRoutes} from 'src/app/views/private/reservations/reservations.routes';
import {ReservationListComponent} from 'src/app/views/private/reservations/reservation-list/reservation-list.component';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {
    ReservationDetailsComponent
} from 'src/app/views/private/reservations/reservation-details/reservation-details.component';
import {ComponentsModule} from 'src/app/components/components.module';
import {AppFormsModule} from "../../../modules/app-forms/app-forms.module";
import {AppDirectivesModule} from "../../../directives/app-directives.module";
import {CommonModule} from "@angular/common";
import {AppPipesModule} from "../../../pipes/app-pipes.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
    imports: [
        AppFormsModule,
        RouterModule.forChild(reservationsRoutes),
        TranslationsModule,
        ComponentsModule,
        AppDirectivesModule,
        CommonModule,
        AppPipesModule,
        FontAwesomeModule,
    ],
    declarations: [
        ReservationListComponent,
        ReservationDetailsComponent
    ]
})
export class ReservationsModule {
}
