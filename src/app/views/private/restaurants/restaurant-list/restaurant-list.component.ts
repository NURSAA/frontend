import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {ToastsService} from 'src/app/modules/toasts/toasts.service';
import {IRestObject} from 'src/app/modules/rest/rest-object';


@Component({
    selector: 'restaurant-list',
    templateUrl: './restaurant-list.component.html'
})
export class RestaurantListComponent implements OnInit {
    reload$: Observable<void>;
    isModalOpen = false;
    form!: FormGroup;

    private reloadSubject = new Subject<void>();

    constructor(
        private restClient: RestClient,
        private toastsService: ToastsService
    ) {
        this.reload$ = this.reloadSubject.asObservable();
    }

    ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.form = new FormGroup({
            id: new FormControl(null, Validators.required),
            name: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            url: new FormControl(null, Validators.required),
        });
    }

    editRestaurant(restaurant?: IRestObject<'restaurants'>): void {
        this.isModalOpen = true;
        this.form.reset(restaurant);
    }

    toggleModal(): void {
        this.isModalOpen = !this.isModalOpen;
    }

    saveRestaurant(): void {
        const model = this.restClient.createObject(
            'restaurants',
            this.form.value
        );
        model.persist()
            .subscribe(() => {
                this.toastsService.saved();
                this.isModalOpen = false;
                this.reloadSubject.next();
            })
    }
}
