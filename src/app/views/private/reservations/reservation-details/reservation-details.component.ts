import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IReservation} from "src/app/_types/reservation";
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {ORDER_STATUS} from 'src/app/_types/order';
import {DISH_ORDER_STATUS} from 'src/app/_types/dish-order';


@Component({
    selector: 'reservation-details',
    templateUrl: './reservation-details.component.html'
})
export class ReservationDetailsComponent implements OnInit {
    reservationId!: number;
    reservation!: IReservation;
    orderStatus = ORDER_STATUS;
    dishOrderStatus = DISH_ORDER_STATUS;

    constructor(
        private route: ActivatedRoute,
        private restClient: RestClient
    ) {
    }

    ngOnInit(): void {
        this.reservationId = Number(this.route.snapshot.params['id']);

        this.restClient.get('reservations', this.reservationId)
            .subscribe((reservation) => {
                this.reservation = reservation;
            });
    }
}
