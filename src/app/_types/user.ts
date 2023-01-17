import {ROLES} from "../modules/privileges/interfaces";

export interface IUser {
    id?: number;
    email: string,
    roles: typeof ROLES[keyof typeof ROLES][],
}
