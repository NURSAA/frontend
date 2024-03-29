

export const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    COOK: 'cook',
} as const;

export const ROLES_OPTIONS = [
    {
        label: 'ADMIN',
        value: ROLES.ADMIN,
    },
    {
        label: 'USER',
        value: ROLES.USER,
    },
    {
        label: 'COOK',
        value: ROLES.COOK,
    }
]

export interface IBasePrivilege {
    roles: typeof ROLES[keyof typeof ROLES][];
}

export interface IRoutePrivilege extends IBasePrivilege {
    path: string;
    redirectTo?: string[];
}

export interface IFeaturePrivilege extends IBasePrivilege {
    name: string;
}

export type IPrivilege = IFeaturePrivilege | IRoutePrivilege;
