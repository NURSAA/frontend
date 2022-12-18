import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {ToastsService} from 'src/app/modules/toasts/toasts.service';
import {IAppInputOptions} from 'src/app/modules/app-forms/app-input/app-input.component';
import {UserService} from 'src/app/services/user.service';
import {IQueryObject} from 'src/app/modules/rest/interfaces';
import {UserRoles} from 'src/app/_types/user';

@Component({
    selector: 'reservation-list',
    templateUrl: './reservation-list.component.html'
})
export class ReservationListComponent implements OnInit {

    reload$: Observable<void>;
    sameUserQuery?: IQueryObject;
    isModalOpen = false;
    form!: FormGroup;
    loading = false;
    restaurantOptions?: IAppInputOptions[];

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

    addReservation(): void {
        this.isModalOpen = true;
        this.loading = true;
        this.form.reset();

        this.restClient.getAll('restaurants')
            .subscribe((restaurants) => {
                this.restaurantOptions = restaurants.map((restaurant) => {
                    return {
                        label: restaurant.name,
                        value: restaurant['@id']
                    };
                });
                this.loading = false;
            });
    }

    private createForm(): void {
        this.form = new FormGroup({
            restaurant: new FormControl(null, Validators.required),
            start: new FormControl(null, Validators.required),
            end: new FormControl(null, Validators.required)
        });
    }

    toggleModal(): void {
        this.isModalOpen = !this.isModalOpen;
    }

    saveReservation(): void {
        const model = this.restClient.createObject(
            'reservations',
            {
                tables: [],
                user: this.userService.recoverSavedUser()?.['@id'],
                ...this.form.value
            }
        );
        model.persist()
            .subscribe(() => {
                this.toastService.saved();
                this.isModalOpen = false;
                this.reloadSubject.next();
            })
    }
}
