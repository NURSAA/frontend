import {IFeaturePrivilege, IPrivilege, IRoutePrivilege} from 'src/app/modules/privileges/interfaces';


const featurePrivileges: IFeaturePrivilege[] = [
    {
        name: 'menus:add',
        roles: ['admin']
    },
    {
        name: 'dish:edit',
        roles: ['admin']
    },
    {
        name: 'dish:delete',
        roles: ['admin']
    },
    {
        name: 'ingredient_group:add',
        roles: ['admin']
    },
    {
        name: 'menus:edit',
        roles: ['admin']
    },
    {
        name: 'table:add',
        roles: ['admin']
    },
    {
        name: 'floor:edit',
        roles: ['admin']
    },
    {
        name: 'restaurant:edit',
        roles: ['admin']
    },
    {
        name: 'restaurant:details',
        roles: ['admin']
    },
    {
        name: 'restaurant:add',
        roles: ['admin']
    },
    {
        name: 'reservations:add',
        roles: ['admin', 'user']
    },
    {
        name: 'menus:order',
        roles: ['user']
    },
    {
        name: 'menus:order:add',
        roles: ['user', 'admin']
    },
    {
        name: 'route:restaurants',
        roles: ['admin', 'user']
    },
    {
        name: 'route:menus',
        roles: ['admin']
    },
    {
        name: 'route:reservations',
        roles: ['admin', 'user', 'cook']
    },
    {
        name: 'route:users',
        roles: ['admin']
    },
    {
        name: 'route:add_reservation',
        roles: ['admin', 'user']
    },
    {
        name: 'dishOrder:change_status',
        roles: ['admin', 'cook']
    },
];

const routePrivileges: IRoutePrivilege[] = [
    {
        path: 'login',
        roles: ['admin', 'user', 'cook']
    },
    {
        path: 'register',
        roles: ['admin', 'user', 'cook']
    },
    {
        path: 'restaurants',
        roles: ['admin', 'user'],
        redirectTo: ['app', 'menus']
    },
    {
        path: 'menus',
        roles: ['admin', 'user'],
        redirectTo: ['app', 'reservations']
    },
    {
        path: 'reservations',
        roles: ['admin', 'user', 'cook']
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
