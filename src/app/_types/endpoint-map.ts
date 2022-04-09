import {IUser} from "./user";

export interface IEndpointMap {
    'users': IUser;
    'login_check': {token: string;};
    [key: string]: unknown;
}

export type IEndpointName = keyof IEndpointMap & string;
