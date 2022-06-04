import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OnInit} from "@angular/core";


@Component({
    selector: 'restaurant-details',
    templateUrl: './restaurant-details.component.html'
})
export class RestaurantDetailsComponent implements OnInit {

    restaurantId!: number;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.restaurantId = Number(this.route.snapshot.params['id']);
    }
}
