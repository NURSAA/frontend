import {IRestaurant} from 'src/app/_types/restaurant';

export const MENU_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
} as const;

export interface IMenu {
    id?: number;
    name: string;
    restaurant: IRestaurant;
    status: typeof MENU_STATUS[keyof typeof MENU_STATUS];
}
