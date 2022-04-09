import {Component} from "@angular/core";
import {UserService} from 'src/app/services/user.service';


@Component({
    selector: 'restaurant-list',
    templateUrl: './restaurant-list.component.html'
})
export class RestaurantListComponent {
    constructor(
        public userService: UserService
    ) {
    }
}
