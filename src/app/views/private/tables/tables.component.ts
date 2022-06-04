import {Component, OnInit} from '@angular/core';
import {MockService} from 'src/app/services/mock.service';
import {IFloor} from 'src/app/_types/floor';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastsService} from 'src/app/modules/toasts/toasts.service';
import {
    RestaurantDetailsComponent
} from 'src/app/views/private/restaurants/restaurant-details/restaurant-details.component';

type IFloorExtended = IFloor & {collapsed: boolean};

@Component({
    selector: 'tables',
    templateUrl: './tables.component.html'
})
export class TablesComponent implements OnInit {
    floors!: IFloorExtended[];

    isFloorModalOpen = false;
    floorForm!: FormGroup;

    constructor(
        private mockService: MockService,
        private toastService: ToastsService,
        private restaurantDetails: RestaurantDetailsComponent
    ) {
    }

    ngOnInit(): void {
        this.createForm();
        this.loadFloors();
    }

    private createForm(): void {
        this.floorForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            restaurant: new FormControl(null, Validators.required),
            level: new FormControl(null, Validators.required)
        });
        this.floorForm.get('restaurant')?.disable();
    }

    private loadFloors(): void {
        this.mockService.getAll('floors', {'restaurant.id': this.restaurantDetails.restaurantId})
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
        const payload = {
            ...this.floorForm.value,
            restaurant: this.restaurantDetails.restaurant,
            tables: []
        }
        this.mockService.persist('floors', payload)
            .subscribe(() => {
                this.toastService.saved();
                this.isFloorModalOpen = false;
                this.loadFloors();
            })
    }
}
