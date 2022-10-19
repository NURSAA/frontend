import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {ToastsService} from 'src/app/modules/toasts/toasts.service';
import {IAppInputOptions} from 'src/app/modules/app-forms/app-input/app-input.component';
import {UserService} from "src/app/services/user.service";

@Component({
    selector: 'reservation-list',
    templateUrl: './reservation-list.component.html'
})
export class ReservationListComponent implements OnInit {

    reload$: Observable<void>;
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

    addReservation(): void {
        this.isModalOpen = true;
        this.loading = true;
        this.form.reset();

        this.restClient.getAll('restaurants')
            .subscribe((restaurants) => {
                this.restaurantOptions = restaurants.map((restaurants) => {
                    return {
                        label: restaurants.name,
                        value: restaurants
                    };
                });
                this.loading = false;
            });
    }


    ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.form = new FormGroup({
            name: new FormControl(null, Validators.required),
            restaurant: new FormControl(null, Validators.required),
            dateFrom: new FormControl(null, Validators.required),
            dateTo: new FormControl(null, Validators.required)
        });
    }

    toggleModal(): void {
        this.isModalOpen = !this.isModalOpen;
    }

    saveReservation(): void {
        const payload = this.restClient.createObject(
            'reservations',
            {
                user:this.userService.recoverSavedUser()?.["@id"],
                ...this.form.value
            }
        );
        payload.persist()
            .subscribe(() => {

                this.toastService.saved();
                this.reloadSubject.next();
            });
    }
}
