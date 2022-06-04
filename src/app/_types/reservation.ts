import {IRestaurant} from 'src/app/_types/restaurant';
import {ITable} from 'src/app/_types/table';


export interface IReservation {
    id?: number;
    restaurant: IRestaurant;
    user: {
        name: string;
        surname: string;
    }
    start: string;
    end: string;
    table: ITable;
}
