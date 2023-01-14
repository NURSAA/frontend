import {IReservation} from "./reservation";
import {IDish} from "./dish";


export const ORDER_STATUS = {
    STATUS_CREATED: 'created',
    STATUS_COMPLETED: 'completed',
    STATUS_PROCESSING: 'processing'
} as const;

export interface IOrder {
    id?: number;
    reservation: IReservation;
    dishOrders: IDish[];
    price: number;
    status: typeof ORDER_STATUS[keyof typeof ORDER_STATUS];
}
