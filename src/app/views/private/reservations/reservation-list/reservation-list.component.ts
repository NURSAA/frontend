import {Component, OnDestroy, OnInit} from '@angular/core';
import {mergeMap, Observable, of, Subject, takeUntil} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {ToastsService} from 'src/app/modules/toasts/toasts.service';
import {IAppInputOptions} from 'src/app/modules/app-forms/app-input/app-input.component';
import {UserService} from 'src/app/services/user.service';
import {IQueryObject} from 'src/app/modules/rest/interfaces';
import {UserRoles} from 'src/app/_types/user';
import {UtilsService} from 'src/app/services/utils.service';
import {IRestObject} from 'src/app/modules/rest/rest-object';

@Component({
    selector: 'reservation-list',
    templateUrl: './reservation-list.component.html'
})
export class ReservationListComponent implements OnInit, OnDestroy {

    reload$: Observable<void>;
    sameUserQuery?: IQueryObject;
    isModalOpen = false;
    form!: FormGroup;
    loading = false;
    restaurantOptions: IAppInputOptions[] = [];
    restaurantTables: IRestObject<'tables'>[] = [];
    selectedRestaurantTables: IRestObject<'tables'>[] = [];

    private _destroy$ = new Subject<void>();

    private reloadSubject = new Subject<void>();

    constructor(
        private restClient: RestClient,
        private toastService: ToastsService,
        private userService: UserService
    ) {
        this.reload$ = this.reloadSubject.asObservable();
    }

    ngOnInit(): void {
        this.initializeQuery();
        this.createForm();
    }

    private initializeQuery(): void {
        const {id, roles} = this.userService.recoverSavedUser() || {};

        if (
            Array.isArray(roles) && roles.includes(UserRoles.ROLE_ADMIN)
            || !id
        ) {
            return;
        }

        this.sameUserQuery = {
            'user.id': id
        };
    }

    private createForm(): void {
        this.form = new FormGroup({
            restaurant: new FormControl(null, Validators.required),
            start: new FormControl(null, Validators.required),
            end: new FormControl(null, Validators.required)
        });

        this.form.get('restaurant')?.valueChanges
            .pipe(
                takeUntil(this._destroy$),
                mergeMap((restaurant) => {
                    if (!restaurant) {
                        return of([]);
                    }

                    const query = {
                        'floor.restaurant.id': restaurant.id
                    };
                    return this.restClient.getAll('tables', query);
                })
            )
            .subscribe((tables) => {
                this.restaurantTables = tables;
            });
    }

    addReservation(): void {
        this.isModalOpen = true;
        this.loading = true;
        this.form.reset();

        this.restClient.getAll('restaurants')
            .subscribe((restaurants) => {
                this.restaurantOptions = restaurants.map((restaurant) => {
                    return {
                        label: restaurant.name,
                        value: restaurant
                    };
                });
                this.loading = false;
            });
    }

    toggleModal(): void {
        this.isModalOpen = !this.isModalOpen;
    }

    saveReservation(): void {
        const model = this.restClient.createObject(
            'reservations',
            {
                tables: this.selectedRestaurantTables.map((table) => table['@id']),
                user: this.userService.recoverSavedUser()?.['@id'],
                ...this.form.value
            }
        );

        UtilsService.shortenNestedObjects(model, ['restaurant']);

        model.persist()
            .subscribe(() => {
                this.toastService.saved();
                this.isModalOpen = false;
                this.reloadSubject.next();
            })
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
