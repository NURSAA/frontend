import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {reservationsRoutes} from 'src/app/views/private/reservations/reservations.routes';
import {ReservationListComponent} from 'src/app/views/private/reservations/reservation-list/reservation-list.component';
import {TranslationsModule} from 'src/app/modules/translate/translate.module';


@NgModule({
    imports: [
        RouterModule.forChild(reservationsRoutes),
        TranslationsModule,
    ],
    declarations: [
        ReservationListComponent
    ]
})
export class ReservationsModule {
}
