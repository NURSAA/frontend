import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'mock-payment',
    templateUrl: './mock-payment.component.html'
})
export class MockPaymentComponent {
    private readonly reservationId!: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.reservationId = Number(this.route.snapshot.params['reservationId']);
    }

    confirmPayment(): void {
        this.router.navigate(['/app/reservations', this.reservationId]);
    }
}
