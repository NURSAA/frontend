import {Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
import {MockService} from 'src/app/services/mock.service';
import {IRestCollection} from 'src/app/modules/rest/rest-collection';


@Component({
    selector: 'app-list',
    templateUrl: './app-list.component.html'
})
export class AppListComponent implements OnInit {
    @Input() endpoint!: string;

    @ContentChild(TemplateRef) itemTemplate!: TemplateRef<{$implicit: unknown}>

    listItems!: IRestCollection<string>;

    constructor(
        private mockService: MockService
    ) {
    }

    ngOnInit(): void {
        if (!this.endpoint) {
            throw new Error('App-list need specified endpoint!');
        }

        this.mockService.getAll(this.endpoint)
            .subscribe((restaurants) => {
                this.listItems = restaurants;
            });
    }
}
