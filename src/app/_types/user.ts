import {ROLES} from "../modules/privileges/interfaces";

export interface IUser {
    id?: number;
    email: string,
    role: typeof ROLES[keyof typeof ROLES],
    restaurant?: string
}
