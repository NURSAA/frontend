import {Routes} from "@angular/router";
import {ReservationListComponent} from 'src/app/views/private/reservations/reservation-list/reservation-list.component';
import {
    ReservationDetailsComponent
} from 'src/app/views/private/reservations/reservation-details/reservation-details.component';

export const reservationsRoutes: Routes = [
    {
        path: '',
        component: ReservationListComponent,
    },
    {
        path: ':id',
        component: ReservationDetailsComponent,
    },
];
