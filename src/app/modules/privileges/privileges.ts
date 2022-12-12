import {IFeaturePrivilege, IPrivilege, IRoutePrivilege} from 'src/app/modules/privileges/interfaces';


const featurePrivileges: IFeaturePrivilege[] = [
    {
        name: 'menus:add',
        roles: ['admin']
    },
    {
        name: 'menus:edit',
        roles: ['admin']
    },
    {
        name: 'menus:order',
        roles: ['user']
    },
    {
        name: 'route:restaurants',
        roles: ['admin']
    },
    {
        name: 'route:menus',
        roles: ['admin']
    },
    {
        name: 'route:reservations',
        roles: ['admin']
    },
    {
        name: 'route:users',
        roles: ['admin']
    },
];

const routePrivileges: IRoutePrivilege[] = [
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
    },
    {
        path: 'users',
        roles: ['admin']
    },
];

export const PRIVILEGES: IPrivilege[] = [
    ...routePrivileges,
    ...featurePrivileges
];
