import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {ToastsService} from 'src/app/modules/toasts/toasts.service';
import {UserService} from 'src/app/services/user.service';
import {IQueryObject} from 'src/app/modules/rest/interfaces';
import {ROLES} from 'src/app/modules/privileges/interfaces';

@Component({
    selector: 'reservation-list',
    templateUrl: './reservation-list.component.html'
})
export class ReservationListComponent implements OnInit {

    reload$: Observable<void>;
    queryObject?: IQueryObject;

    reloadSubject = new Subject<void>();

    constructor(
        private restClient: RestClient,
        private toastService: ToastsService,
        private userService: UserService
    ) {
        this.reload$ = this.reloadSubject.asObservable();
    }

    ngOnInit(): void {
        this.initializeQuery();
    }

    private initializeQuery(): void {
        const {id, role, restaurant} = this.userService.recoverSavedUser() || {},
            baseQuery = {
                'order[id]': 'desc'
            };

        if (
            role === ROLES.ADMIN
            || !id
        ) {
            this.queryObject = baseQuery;
            return;
        }

        if (
            role === ROLES.COOK
            && restaurant
        ) {
            this.queryObject = {
                ...baseQuery,
                'restaurant.id': this.restClient.getId(restaurant)
            };
            return;
        }

        this.queryObject = {
            ...baseQuery,
            'user.id': id
        };
    }
}
