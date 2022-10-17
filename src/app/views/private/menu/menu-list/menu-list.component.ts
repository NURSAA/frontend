import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {ToastsService} from 'src/app/modules/toasts/toasts.service';
import {IAppInputOptions} from 'src/app/modules/app-forms/app-input/app-input.component';
import {UtilsService} from 'src/app/services/utils.service';


@Component({
    selector: 'menu-list',
    templateUrl: './menu-list.component.html'
})
export class MenuListComponent implements OnInit {
    reload$: Observable<void>;
    isModalOpen = false;
    form!: FormGroup;
    loading = false;
    restaurantOptions?: IAppInputOptions[];

    private reloadSubject = new Subject<void>();

    constructor(
        private restClient: RestClient,
        private toastService: ToastsService,
    ) {
        this.reload$ = this.reloadSubject.asObservable();
    }

    ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.form = new FormGroup({
            name: new FormControl(null, Validators.required),
            restaurant: new FormControl(null, Validators.required)
        });
    }

    addMenu(): void {
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

    saveMenu(): void {
        const model = this.restClient.createObject(
            'menus',
            this.form.value
        );

        UtilsService.shortenNestedObjects(model, ['restaurant']);

        model.persist()
            .subscribe(() => {
                this.toastService.saved();
                this.isModalOpen = false;
                this.reloadSubject.next();
            })
    }
}
