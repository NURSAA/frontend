import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OnInit} from "@angular/core";
import {MockService} from 'src/app/services/mock.service';
import {IRestaurant} from 'src/app/_types/restaurant';


@Component({
    selector: 'restaurant-details',
    templateUrl: './restaurant-details.component.html'
})
export class RestaurantDetailsComponent implements OnInit {
    restaurantId!: number;
    restaurant!: IRestaurant;

    constructor(
        private route: ActivatedRoute,
        private mockService: MockService
    ) {
    }

    ngOnInit(): void {
        this.restaurantId = Number(this.route.snapshot.params['id']);
        this.mockService.get('restaurants', this.restaurantId)
            .subscribe((restaurant) => {
                this.restaurant = restaurant;
            });
    }
}
