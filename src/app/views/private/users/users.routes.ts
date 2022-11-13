import {Routes} from "@angular/router";
import {UsersListComponent} from 'src/app/views/private/users/users-list/users-list.component';


export const usersRoutes: Routes = [
    {
        path: '',
        component: UsersListComponent
    }
];
