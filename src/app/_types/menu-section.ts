import {IMenu} from 'src/app/_types/menu';
import {IRestObject} from 'src/app/modules/rest/rest-object';


export interface IMenuSection {
    id?: number;
    name: string;
    description: string;
    menu: IMenu;
    dishes: IRestObject<'dishes'>[];
    order: number;
}
