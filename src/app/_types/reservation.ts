import {IRestaurant} from 'src/app/_types/restaurant';
import {ITable} from 'src/app/_types/table';


export interface IReservation {
    id?: number;
    restaurant: IRestaurant;
    user: {
        name: string;
        surname: string;
    }
    start: number;
    end: number;
    table: ITable;
}
