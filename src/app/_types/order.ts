import {IReservation} from "./reservation";
import {IDish} from "./dish";


export interface IOrder {
    id?: number;
    reservation: IReservation;
    dishes: IDish[]
    price: number;
    status: 'COMPLETE' | 'NOT_COMPLETE'
}
