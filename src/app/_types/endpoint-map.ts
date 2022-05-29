import {IUser} from "./user";
import {IRestaurant} from 'src/app/_types/restaurant';

export interface IEndpointMap {
    'users': IUser;
    'login_check': {token: string;};
    'restaurants': IRestaurant;
    [key: string]: unknown;
}

export type IEndpointName = keyof IEndpointMap & string;
