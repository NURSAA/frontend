

export const ROLES = {
    ADMIN: 'admin',
    USER: 'user'
} as const;

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
