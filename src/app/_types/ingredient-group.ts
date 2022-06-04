import {IIngredient} from 'src/app/_types/ingredient';


export interface IIngredientGroup {
    id?: number;
    name: string;
    ingredients: IIngredient[];
}
