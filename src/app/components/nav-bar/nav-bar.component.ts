import {Component} from '@angular/core';
import {UserService} from 'src/app/services/user.service';

interface IMenuItem {
    lang: string;
    path: string;
}

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {
    menuItems: IMenuItem[] = [
        {
            lang: 'RESTAURANTS',
            path: '/app/restaurants'
        },
        {
            lang: 'MENUS',
            path: '/app/menus'
        },
        {
            lang: 'INGREDIENTS',
            path: '/app/ingredients'
        },
        {
            lang: 'RESERVATIONS',
            path: '/app/reservations'
        }
    ];

    constructor(
        public userService: UserService
    ) {
    }
}
