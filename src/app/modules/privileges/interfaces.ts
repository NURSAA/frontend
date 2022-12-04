

export const ROLES = {
    ADMIN: 'admin',
    USER: 'user'
} as const;

export const ROLES_OPTIONS = [
    {
        label: 'ADMIN',
        value: 'admin',
    },
    {
        label: 'USER',
        value: 'user',
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
