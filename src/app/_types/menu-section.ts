import {IDish} from 'src/app/_types/dish';
import {IMenu} from 'src/app/_types/menu';


export interface IMenuSection {
    id?: number;
    name: string;
    description: string;
    menu: IMenu;
    dishes: IDish[];
    order: number;
}
