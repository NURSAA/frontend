import {IRestaurant} from 'src/app/_types/restaurant';
import {ITable} from 'src/app/_types/table';
import {IUser} from 'src/app/_types/user';


export interface IReservation {
    id?: number;
    restaurant: IRestaurant;
    user: IUser;
    start: string;
    end: string;
    tables: ITable[];
}
