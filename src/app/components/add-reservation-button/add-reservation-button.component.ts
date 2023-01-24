import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IAppInputOptions} from 'src/app/modules/app-forms/app-input/app-input.component';
import {UtilsService} from 'src/app/services/utils.service';
import {IRestObject} from 'src/app/modules/rest/rest-object';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {mergeMap, of, Subject, takeUntil} from 'rxjs';
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {UserService} from 'src/app/services/user.service';
import {ToastsService} from 'src/app/modules/toasts/toasts.service';
import {IRestaurant} from 'src/app/_types/restaurant';


@Component({
    selector: 'add-reservation-button',
    templateUrl: './add-reservation-button.component.html'
})
export class AddReservationButtonComponent implements OnInit, OnDestroy {
    @Input() restaurant?: IRestaurant;
    @Output() readonly reservationAdded = new EventEmitter<void>();
    isModalOpen = false;
    form!: FormGroup;
    restaurantOptions: IAppInputOptions<IRestaurant>[] = [];
    selectedRestaurantTables: IRestObject<'tables'>[] = [];
    restaurantTables: IRestObject<'tables'>[] = [];
    loading = false

    private _destroy$ = new Subject<void>();

    constructor(
        private restClient: RestClient,
        private userService: UserService,
        private toastsService: ToastsService
    ) {
    }

    ngOnInit(): void {
        this.createForm();
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

                if (this.restaurant) {
                    this.restaurant = restaurants.find((restaurant) => {
                        return restaurant?.id === this.restaurant?.id;
                    });
                    this.form.patchValue({restaurant: this.restaurant});
                }
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
                this.toastsService.saved();
                this.isModalOpen = false;
                this.reservationAdded.emit();
            })
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
