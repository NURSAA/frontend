import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MockService} from "../../../../services/mock.service";
import {IReservation} from "../../../../_types/reservation";


@Component({
    selector: 'reservation-details',
    templateUrl: './reservation-details.component.html'
})
export class ReservationDetailsComponent implements OnInit {
    reservationId!: number;
    reservation!: IReservation;

    constructor(
        private route: ActivatedRoute,
        private mockService: MockService
    ) {
    }

    ngOnInit(): void {
        this.reservationId = Number(this.route.snapshot.params['id']);
        this.mockService.get('reservations', this.reservationId)
            .subscribe((restaurant) => {
                this.reservation = restaurant;
            });
    }
}
