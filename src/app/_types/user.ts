
const UserRoles = {
    ROLE_USER: 'user',
    ROLE_ADMIN: 'admin',
    ROLE_SUPER_ADMIN: 'super_admin'
} as const;

export interface IUser {
    id?: number;
    email: string,
    roles: typeof UserRoles[keyof typeof UserRoles][],
}
