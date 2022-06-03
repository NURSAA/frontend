import {IDish} from 'src/app/_types/dish';


export interface IMenuSection {
    id: number;
    name: string;
    dishes: IDish[];
}
