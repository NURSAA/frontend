import {IIngredientGroup} from 'src/app/_types/ingredient-group';


export interface IIngredient {
    id?: number;
    name: string;
    price: number;
    ingredientGroup: IIngredientGroup;
}
