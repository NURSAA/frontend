import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastsService} from 'src/app/modules/toasts/toasts.service';
import {
    RestaurantDetailsComponent
} from 'src/app/views/private/restaurants/restaurant-details/restaurant-details.component';
import {IAppInputOptions} from 'src/app/modules/app-forms/app-input/app-input.component';
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {IRestObject} from 'src/app/modules/rest/rest-object';

type IFloorExtended = IRestObject<'floors'> & {collapsed: boolean};

@Component({
    selector: 'tables',
    templateUrl: './tables.component.html'
})
export class TablesComponent implements OnInit {
    floors!: IFloorExtended[];

    isFloorModalOpen = false;
    floorForm!: FormGroup;

    isTableModalOpen = false;
    tableForm!: FormGroup;
    tableOptions: IAppInputOptions[] = [];

    constructor(
        private restClient: RestClient,
        private toastService: ToastsService,
        private restaurantDetails: RestaurantDetailsComponent
    ) {
    }

    ngOnInit(): void {
        this.createFloorForm();
        this.createTableForm();
        this.loadFloors();
    }

    private createTableForm(): void {
        this.tableForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            floor: new FormControl(null, Validators.required),
            seats: new FormControl(null, Validators.required)
        });
    }

    private createFloorForm(): void {
        this.floorForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            restaurant: new FormControl(null, Validators.required),
            level: new FormControl(null, Validators.required)
        });
        this.floorForm.get('restaurant')?.disable();
    }

    private loadFloors(): void {
        const query = {
            'restaurant.id': this.restaurantDetails.restaurantId,
            'with': ['tables']
        };

        this.restClient.getAll('floors', query)
            .subscribe((floors) => {
                this.floors = floors;
            });
    }

    openFloorModal(): void {
        this.isFloorModalOpen = true;
        this.floorForm.reset({
            restaurant: this.restaurantDetails.restaurant.name
        });
    }

    saveFloor(): void {
        const model = this.restClient.createObject(
            'floors',
            {
                ...this.floorForm.value,
                restaurant: this.restaurantDetails.restaurant['@id'],
                tables: []
            }
        );
        model.persist()
            .subscribe(() => {
                this.toastService.saved();
                this.isFloorModalOpen = false;
                this.loadFloors();
            })
    }

    openTableModal(): void {
        this.tableOptions = this.floors.map((floor) => {
            return {
                label: floor.name,
                value: floor['@id']
            }
        });

        this.isTableModalOpen = true;
        this.tableForm.reset();
    }

    saveTable(): void {
        const model = this.restClient.createObject(
            'tables',
            this.tableForm.value
        );
        model.persist()
            .subscribe(() => {
                this.toastService.saved();
                this.isTableModalOpen = false;
                this.loadFloors();
            })
    }
}
