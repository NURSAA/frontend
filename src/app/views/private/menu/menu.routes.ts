import {Routes} from "@angular/router";
import {MenuListComponent} from 'src/app/views/private/menu/menu-list/menu-list.component';
import {MenuDetailsComponent} from 'src/app/views/private/menu/menu-details/menu-details.component';
import {MockPaymentComponent} from 'src/app/views/private/menu/mock-payment/mock-payment.component';

export const menuRoutes: Routes = [
    {
        path: '',
        component: MenuListComponent,
    },
    {
        path: ':id',
        children: [
            {
                path: 'payment/:reservationId',
                component: MockPaymentComponent
            },
            {
                path: 'payment',
                redirectTo: '',
                pathMatch: 'full'
            },
            {
                path: ':reservationId',
                component: MenuDetailsComponent,
            },
            {
                path: '',
                component: MenuDetailsComponent,
            },
        ]
    },
];
