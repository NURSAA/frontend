import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {reservationsRoutes} from 'src/app/views/private/reservations/reservations.routes';
import {ReservationListComponent} from 'src/app/views/private/reservations/reservation-list/reservation-list.component';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';
import {
    ReservationDetailsComponent
} from 'src/app/views/private/reservations/reservation-details/reservation-details.component';


@NgModule({
    imports: [
        RouterModule.forChild(reservationsRoutes),
        TranslationsModule,
    ],
    declarations: [
        ReservationListComponent,
        ReservationDetailsComponent
    ]
})
export class ReservationsModule {
}
