import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OnInit} from "@angular/core";
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {IRestObject} from 'src/app/modules/rest/rest-object';


@Component({
    selector: 'restaurant-details',
    templateUrl: './restaurant-details.component.html'
})
export class RestaurantDetailsComponent implements OnInit {
    restaurantId!: number;
    restaurant!: IRestObject<'restaurants'>;

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
