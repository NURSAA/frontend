import {IUser} from "./user";
import {IRestaurant} from 'src/app/_types/restaurant';
import {IDish} from 'src/app/_types/dish';
import {IMenuSection} from 'src/app/_types/menu-section';

export interface IEndpointMap {
    'users': IUser;
    'login_check': {token: string;};
    'restaurants': IRestaurant;
    'dishes': IDish;
    'menu_sections': IMenuSection;
    [key: string]: unknown;
}

export type IEndpointName = keyof IEndpointMap & string;
