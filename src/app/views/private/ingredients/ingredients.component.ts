import {Component, OnInit} from '@angular/core';
import {MockService} from 'src/app/services/mock.service';
import {IIngredientGroup} from 'src/app/_types/ingredient-group';
import {ActivatedRoute} from '@angular/router';
import {
    RestaurantDetailsComponent
} from 'src/app/views/private/restaurants/restaurant-details/restaurant-details.component';

type IIngredientGroupsExtended = IIngredientGroup & {collapsed?: boolean};

@Component({
    selector: 'ingredients',
    templateUrl: './ingredients.component.html'
})
export class IngredientsComponent implements OnInit {
    ingredientGroups!: IIngredientGroupsExtended[];

    constructor(
        private mockService: MockService,
        private route: ActivatedRoute,
        private restaurantDetails: RestaurantDetailsComponent
    ) {
    }

    ngOnInit(): void {
        const query = {
            'restaurant.id': this.restaurantDetails.restaurantId
        };
        this.mockService.getAll('ingredient_groups', query)
            .subscribe((ingredientGroups) => {
                this.ingredientGroups = ingredientGroups;
            })
    }

    addIngredient(): void {
        this.ingredientGroups[0].ingredients.push({
            name: 'New ingredient',
            price: 3000,
        })
    }

    addIngredientGroup(): void {
        this.ingredientGroups.push({
            name: 'New ingredient group',
            restaurant: this.restaurantDetails.restaurant,
            ingredients: []
        });
    }
}
