import {Component, OnInit} from '@angular/core';
import {MockService} from 'src/app/services/mock.service';
import {IIngredientGroup} from 'src/app/_types/ingredient-group';
import {ActivatedRoute} from '@angular/router';

type IIngredientGroupsExtended = IIngredientGroup & {collapsed: boolean};

@Component({
    selector: 'ingredients',
    templateUrl: './ingredients.component.html'
})
export class IngredientsComponent implements OnInit {
    ingredientGroups!: IIngredientGroupsExtended[];

    constructor(
        private mockService: MockService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        const restaurantId = Number(this.route.snapshot.parent?.params['id']);
        this.mockService.getAll('ingredient_groups', {'restaurant.id': restaurantId})
            .subscribe((ingredientGroups) => {
                this.ingredientGroups = ingredientGroups;
            })
    }
}
