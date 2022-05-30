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
    id =

    @ContentChild(TemplateRef) itemTemplate!: TemplateRef<{$implicit: unknown}>

    item!: RestObject<string>

    constructor(
        private mockService: MockService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        if (!this.endpoint) {
            throw new Error('App-details need specified endpoint!');
        }

        let id = this.route.paramMap.subscribe((params: ParamMap) => {
            return params.get('id');
        })
        this.mockService.get(this.endpoint, id)
            .subscribe((items) => {
                this.item = items;
            });
    }
}
