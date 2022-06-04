import {Routes} from "@angular/router";
import {MenuListComponent} from 'src/app/views/private/menu/menu-list/menu-list.component';
import {MenuDetailsComponent} from 'src/app/views/private/menu/menu-details/menu-details.component';

export const menuRoutes: Routes = [
    {
        path: '',
        component: MenuListComponent,
    },
    {
        path: ':id',
        children: [
            {
                path: 'edit',
                component: MenuDetailsComponent,
            },
            {
                path: '',
                component: MenuDetailsComponent,
            },
        ]
    },
];
