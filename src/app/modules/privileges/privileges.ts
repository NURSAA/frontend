import {IPrivilege} from 'src/app/modules/privileges/interfaces';

export const PRIVILEGES: IPrivilege[] = [
    {
        path: 'login',
        roles: ['admin', 'user']
    },
    {
        path: 'register',
        roles: ['admin', 'user']
    },
    {
        path: 'restaurants',
        roles: ['admin'],
        redirectTo: ['app', 'menus']
    },
    {
        path: 'menus',
        roles: ['admin', 'user']
    },
    {
        path: 'reservations',
        roles: ['admin']
    }
]
