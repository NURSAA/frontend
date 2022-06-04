import {IIngredient} from 'src/app/_types/ingredient';
import {IRestaurant} from 'src/app/_types/restaurant';


export interface IIngredientGroup {
    id?: number;
    name: string;
    restaurant: IRestaurant;
    ingredients: IIngredient[];
}
