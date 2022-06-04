import {IIngredient} from 'src/app/_types/ingredient';


export interface IDish {
    id: number;
    name: string;
    ingredients: IIngredient[];
    price: number;
}
