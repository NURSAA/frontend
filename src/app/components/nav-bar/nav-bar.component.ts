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
        }
    ];

    constructor(
        public userService: UserService
    ) {
    }
}
