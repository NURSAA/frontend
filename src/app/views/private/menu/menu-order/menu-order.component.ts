import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {IRestObject} from 'src/app/modules/rest/rest-object';
import {Router} from '@angular/router';


@Component({
    selector: 'menu-order',
    templateUrl: './menu-order.component.html'
})
export class MenuOrderComponent {
    @Input() reservationId!:number;
    @Input() dishes: IRestObject<'dishes'>[] = [];
    @Output() readonly dishesChange = new EventEmitter<IRestObject<'dishes'>[]>();

    constructor(
        private restClient: RestClient,
        private router: Router
    ) {
    }
    removeDish(dishIndex: number): void {
        this.dishes.splice(dishIndex, 1);
        this.dishesChange.next(this.dishes);

    }

    makeOrder(): void {
        const payload = {
            reservationIri: this.restClient.getIri('reservations', this.reservationId),
            dishOrders: this.dishes.map((dish: IRestObject<'dishes'>) => {
                return {
                    dishIri: dish['@id'],
                    details: ''
                }
            })
        };

        this.restClient.post('orders/create', payload)
            .subscribe(() => {
                this.router.navigate(['/app/reservations', this.reservationId]);
            });
    }
}
