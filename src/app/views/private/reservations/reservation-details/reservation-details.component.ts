import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {ORDER_STATUS} from 'src/app/_types/order';
import {DISH_ORDER_STATUS, IDishOrder} from 'src/app/_types/dish-order';
import {IRestObject} from 'src/app/modules/rest/rest-object';
import {concatMap, Observable, of, Subject, tap} from 'rxjs';
import {UtilsService} from 'src/app/services/utils.service';
import {MENU_STATUS} from 'src/app/_types/menu';
import {IReservation} from 'src/app/_types/reservation';


@Component({
    selector: 'reservation-details',
    templateUrl: './reservation-details.component.html'
})
export class ReservationDetailsComponent implements OnInit {
    reservationId!: number;
    reservation!: IRestObject<'reservations'>;
    orderStatus = ORDER_STATUS;
    dishOrderStatus = DISH_ORDER_STATUS;
    reload$: Observable<void>;
    activeMenu?: IRestObject<'menus'>;
    private reloadSubject = new Subject<void>();

    constructor(
        private route: ActivatedRoute,
        private restClient: RestClient
    ) {
        this.reload$ = this.reloadSubject.asObservable();
    }

    ngOnInit(): void {
        this.reservationId = Number(this.route.snapshot.params['id']);

        this.resolveReservation$()
            .pipe(
                concatMap((reservation) => this.resolveActiveMenu$(reservation))
            )
            .subscribe((activeMenus) => {
                if (!activeMenus.length) {
                    return;
                }

                this.activeMenu = activeMenus.shift();
            });
    }

    private resolveReservation$(): Observable<IRestObject<'reservations'>> {
        return this.restClient.get('reservations', this.reservationId)
            .pipe(
                tap((reservation) => {
                    this.reservation = reservation;
                })
            );
    }

    private resolveActiveMenu$(reservation: IReservation): Observable<IRestObject<'menus'>[]> {
        if (!reservation.restaurant?.id) {
            return of ([]);
        }

        const query = {
            'restaurant.id': reservation.restaurant.id,
            'status': MENU_STATUS.ACTIVE
        }

        return this.restClient.getAll('menus', query);
    }

    changeStatus(dishOrder: IDishOrder): void {
        const model = this.restClient.createObject('dish_orders', dishOrder);
        UtilsService.shortenNestedObjects(model, ['dish']);
        switch (model.status) {
            case this.dishOrderStatus.STATUS_CREATED:
                model.status = this.dishOrderStatus.STATUS_PROCESSING;
                break;
            case this.dishOrderStatus.STATUS_PROCESSING:
                model.status = this.dishOrderStatus.STATUS_COMPLETED;
                break;
        }

        model.persist()
            .subscribe(() => {
                this.reloadSubject.next();
            })
    }
}
