import {Routes} from "@angular/router";
import {ReservationListComponent} from 'src/app/views/private/reservations/reservation-list/reservation-list.component';

export const reservationsRoutes: Routes = [
    {
        path: '',
        component: ReservationListComponent,
    },
];
