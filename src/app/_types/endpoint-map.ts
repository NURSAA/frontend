import {IUser} from "./user";
import {IRestaurant} from 'src/app/_types/restaurant';
import {IDish} from 'src/app/_types/dish';
import {IMenuSection} from 'src/app/_types/menu-section';
import {IIngredient} from 'src/app/_types/ingredient';
import {IIngredientGroup} from 'src/app/_types/ingredient-group';
import {IReservation} from 'src/app/_types/reservation';
import {ITable} from 'src/app/_types/table';
import {IFloor} from 'src/app/_types/floor';
import {IOrder} from "./order";
import {IMenu} from 'src/app/_types/menu';
import {IDishOrder} from 'src/app/_types/dish-order';

export interface IEndpointMap {
    'users': IUser;
    'login_check': {token: string;};
    'restaurants': IRestaurant;
    'dishes': IDish;
    'menu_sections': IMenuSection;
    'ingredients': IIngredient;
    'ingredient_groups': IIngredientGroup;
    'reservations': IReservation;
    'tables': ITable;
    'floors': IFloor;
    'orders': IOrder;
    'dish_orders': IDishOrder;
    'menus': IMenu;
    [key: string]: unknown;
}

export type IEndpointName = keyof IEndpointMap & string;
