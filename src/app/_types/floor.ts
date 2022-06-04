import {IRestaurant} from 'src/app/_types/restaurant';
import {ITable} from 'src/app/_types/table';


export interface IFloor {
    id?: number;
    restaurant: IRestaurant;
    tables: ITable[];
    level: number;
}
