import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';


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
    ) {
        this.reload$ = this.reloadSubject.asObservable();
    }

    ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.form = new FormGroup({
            name: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            url: new FormControl(null, Validators.required),
        });
    }

    addRestaurant(): void {
        this.isModalOpen = true;
        this.form.reset();
    }

    toggleModal(): void {
        this.isModalOpen = !this.isModalOpen;
    }

    saveRestaurant(): void {
        // this.restClient.persist('restaurants', this.form.value)
        //     .subscribe(() => {
        //         this.toastService.saved();
        //         this.isModalOpen = false;
        //         this.reloadSubject.next();
        //     })
    }
}
