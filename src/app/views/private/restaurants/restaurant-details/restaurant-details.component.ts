import {Component} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {OnInit} from "@angular/core";


@Component({
    selector: 'restaurant-details',
    templateUrl: './restaurant-details.component.html'
})
export class RestaurantDetailsComponent implements OnInit {

    private id?: number | null;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.id = +params.get('id');
        });

        console.log(this.id);
    }
}
