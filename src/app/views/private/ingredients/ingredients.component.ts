import {Component, OnInit} from '@angular/core';
import {MockService} from 'src/app/services/mock.service';
import {IIngredientGroup} from 'src/app/_types/ingredient-group';

type IIngredientGroupsExtended = IIngredientGroup & {collapsed: boolean};

@Component({
    selector: 'ingredients',
    templateUrl: './ingredients.component.html'
})
export class IngredientsComponent implements OnInit {
    ingredientGroups!: IIngredientGroupsExtended[];

    constructor(
        private mockService: MockService
    ) {
    }

    ngOnInit(): void {
        this.mockService.getAll('ingredient_groups')
            .subscribe((ingredientGroups) => {
                this.ingredientGroups = ingredientGroups;
            })
    }
}
