import {Component, OnInit} from '@angular/core';
import {MockService} from 'src/app/services/mock.service';
import {IFloor} from 'src/app/_types/floor';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastsService} from 'src/app/modules/toasts/toasts.service';
import {ActivatedRoute} from '@angular/router';

type IFloorExtended = IFloor & {collapsed: boolean};

@Component({
    selector: 'tables',
    templateUrl: './tables.component.html'
})
export class TablesComponent implements OnInit {
    floors!: IFloorExtended[];

    isFloorModalOpen = false;
    floorForm = new FormGroup({
        name: new FormControl(null, Validators.required)
    })

    constructor(
        private mockService: MockService,
        private toastService: ToastsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.loadFloors();
    }

    private loadFloors(): void {
        const restaurantId = Number(this.route.snapshot.parent?.params['id']);
        this.mockService.getAll('floors', {'restaurant.id': restaurantId})
            .subscribe((floors) => {
                this.floors = floors;
            });
    }

    openFloorModal(): void {
        this.isFloorModalOpen = true;
        this.floorForm.reset();
    }


    saveFloor(): void {
        this.mockService.persist('floors', this.floorForm.value)
            .subscribe(() => {
                this.toastService.saved();
                this.isFloorModalOpen = false;
                this.loadFloors();
            })
    }
}
