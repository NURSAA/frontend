import {Routes} from "@angular/router";
import {MenuListComponent} from 'src/app/views/private/menu/menu-list/menu-list.component';
import {MenuDetailsComponent} from 'src/app/views/private/menu/menu-details/menu-details.component';
import {MenuEditorComponent} from 'src/app/views/private/menu/menu-editor/menu-editor.component';

export const menuRoutes: Routes = [
    {
        path: '',
        component: MenuListComponent,
    },
    {
        path: ':id',
        children: [
            {
                path: 'editor',
                component: MenuEditorComponent,
            },
            {
                path: '',
                component: MenuDetailsComponent,
            },
        ]
    },
];
