import {IIngredient} from 'src/app/_types/ingredient';
import {IMenuSection} from 'src/app/_types/menu-section';


export interface IDish {
    id?: number;
    name: string;
    description: string;
    menuSection: IMenuSection;
    ingredients: IIngredient[];
    dishOrder: number;
    price: number;
}
