import {Component, OnInit} from '@angular/core';
import {MockService} from 'src/app/services/mock.service';
import {IFloor} from 'src/app/_types/floor';

type IFloorExtended = IFloor & {collapsed: boolean};

@Component({
    selector: 'tables',
    templateUrl: './tables.component.html'
})
export class TablesComponent implements OnInit {
    floors!: IFloorExtended[];

    constructor(
        private mockService: MockService
    ) {
    }

    ngOnInit(): void {
        this.mockService.getAll('floors')
            .subscribe((floors) => {
                this.floors = floors;
            });
    }
}
