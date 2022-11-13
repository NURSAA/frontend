import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
    RestaurantDetailsComponent
} from 'src/app/views/private/restaurants/restaurant-details/restaurant-details.component';
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastsService} from 'src/app/modules/toasts/toasts.service';
import {IRestObject} from 'src/app/modules/rest/rest-object';

type IIngredientGroupsExtended = IRestObject<'ingredient_groups'> & {collapsed?: boolean};

@Component({
    selector: 'ingredients',
    templateUrl: './ingredients.component.html'
})
export class IngredientsComponent implements OnInit {
    ingredientGroups!: IIngredientGroupsExtended[];

    loading = true;

    isIngredientGroupModalOpen = false;
    ingredientGroupForm = new FormGroup({
        name: new FormControl(null, Validators.required),
    });

    isIngredientModalOpen = false;
    ingredientParentGroup: IIngredientGroupsExtended | null = null;
    ingredientForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        price: new FormControl(1, Validators.required),
    });

    constructor(
        private route: ActivatedRoute,
        private restaurantDetails: RestaurantDetailsComponent,
        private restClient: RestClient,
        private toastsService: ToastsService,
    ) {
    }

    ngOnInit(): void {
        this.loadIngredients();
    }

    private loadIngredients(): void {
        const query = {
            'restaurant.id': this.restaurantDetails.restaurantId
        };

        this.loading = true;
        this.restClient.getAll('ingredient_groups', query)
            .subscribe((ingredientGroups) => {
                this.ingredientGroups = ingredientGroups;
                this.loading = false;
            });
    }

    openIngredientGroupModal(): void {
        this.ingredientGroupForm.reset();
        this.isIngredientGroupModalOpen = true;
    }

    saveIngredientGroup(): void {
        const restaurantIri = this.restClient.getIri('restaurants', this.restaurantDetails.restaurantId),
            model = this.restClient.createObject(
                'ingredient_groups',
                {
                    ...this.ingredientGroupForm.value,
                    restaurant: restaurantIri,
                    ingredients: []
                }
            );

        this.loading = true;
        model.persist()
            .subscribe(() => {
                this.toastsService.saved();
                this.loadIngredients();
                this.isIngredientGroupModalOpen = false;
                this.loading = true;
            })
    }

    openIngredientModal(ingredientGroup: IIngredientGroupsExtended): void {
        this.isIngredientModalOpen = true;
        this.ingredientParentGroup = ingredientGroup;
    }

    saveIngredient(): void {
        if (!this.ingredientParentGroup) {
            return;
        }

        const model = this.restClient.createObject(
            'ingredients',
            {
                ...this.ingredientForm.value,
                ingredientGroup: this.ingredientParentGroup['@id']
            }
        );

        this.loading = true;
        model.persist()
            .subscribe(() => {
                this.toastsService.saved();
                this.loadIngredients();
                this.ingredientParentGroup = null;
                this.isIngredientModalOpen = false;
                this.loading = true;
            })
    }
}
