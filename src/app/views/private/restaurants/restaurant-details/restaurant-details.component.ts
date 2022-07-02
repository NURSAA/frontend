import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OnInit} from "@angular/core";
import {IRestaurant} from 'src/app/_types/restaurant';
import {RestClient} from 'src/app/modules/rest/rest-client.service';


@Component({
    selector: 'restaurant-details',
    templateUrl: './restaurant-details.component.html'
})
export class RestaurantDetailsComponent implements OnInit {
    restaurantId!: number;
    restaurant!: IRestaurant;

    constructor(
        private route: ActivatedRoute,
        private restClient: RestClient
    ) {
    }

    ngOnInit(): void {
        this.restaurantId = Number(this.route.snapshot.params['id']);
        this.restClient.get('restaurants', this.restaurantId)
            .subscribe((restaurant) => {
                this.restaurant = restaurant;
            });
    }
}
