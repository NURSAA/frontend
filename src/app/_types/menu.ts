import {IRestaurant} from 'src/app/_types/restaurant';


export interface IMenu {
    id: number;
    name: string;
    restaurant: IRestaurant;
}
