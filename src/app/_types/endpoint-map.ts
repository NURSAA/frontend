import {IUser} from "./user";
import {IRestaurant} from 'src/app/_types/restaurant';
import {IDish} from 'src/app/_types/dish';
import {IMenuSection} from 'src/app/_types/menu-section';
import {IIngredient} from 'src/app/_types/ingredient';
import {IIngredientGroup} from 'src/app/_types/ingredient-group';

export interface IEndpointMap {
    'users': IUser;
    'login_check': {token: string;};
    'restaurants': IRestaurant;
    'dishes': IDish;
    'menu_sections': IMenuSection;
    'ingredients': IIngredient;
    'ingredient_groups': IIngredientGroup;
    [key: string]: unknown;
}

export type IEndpointName = keyof IEndpointMap & string;
