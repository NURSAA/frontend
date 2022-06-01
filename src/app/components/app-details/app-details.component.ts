import {Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
import {MockService} from 'src/app/services/mock.service';
import {RestObject} from "../../modules/rest/rest-object";
import {ActivatedRoute, ParamMap} from "@angular/router";


@Component({
    selector: 'app-details',
    templateUrl: './app-details.component.html'
})
export class AppDetailsComponent implements OnInit {
    @Input() endpoint!: string;
    @Input() id!: number;

    @ContentChild(TemplateRef) itemTemplate!: TemplateRef<{$implicit: unknown}>

    item!: RestObject<string>

    constructor(
        private mockService: MockService
    ) { }

    ngOnInit(): void {
        if (!this.endpoint) {
            throw new Error('App-details need specified endpoint!');
        }
        console.log(this.id);
        console.log(this.endpoint);

        this.mockService.get(this.endpoint, this.id)
            .subscribe((items) => {
                this.item = items;
            });
    }
}
