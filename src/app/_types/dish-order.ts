import {IOrder} from 'src/app/_types/order';
import {IDish} from 'src/app/_types/dish';

export const DISH_ORDER_STATUS = {
    STATUS_CREATED: 'created',
    STATUS_COMPLETED: 'completed',
    STATUS_PROCESSING: 'processing'
} as const;

export interface DishOrder {
    id: number;
    details: string;
    price: number;
    status: keyof typeof DISH_ORDER_STATUS;
    order: IOrder;
    dish: IDish;
}
