import {Component, OnInit} from '@angular/core';
import {MockService} from 'src/app/services/mock.service';
import {IMenuSection} from 'src/app/_types/menu-section';


type IMenuDetailsSection = IMenuSection & {collapsed: boolean;};

@Component({
    selector: 'menu-details',
    templateUrl: './menu-details.component.html'
})
export class MenuDetailsComponent implements OnInit {
    sections!: IMenuDetailsSection[];

    constructor(
        private mockService: MockService
    ) {
    }

    ngOnInit(): void {
        this.mockService.getAll('menu_sections')
            .subscribe((sections) => {
                this.sections = sections;
            });
    }
}
