import {Injectable} from '@angular/core';
import {PRIVILEGES} from 'src/app/modules/privileges/privileges';
import {UserService} from 'src/app/services/user.service';
import {IPrivilege} from 'src/app/modules/privileges/interfaces';


@Injectable({
    providedIn: 'root'
})
export class PrivilegesService {
    constructor(
        private userService: UserService
    ) {
    }

    hasAccess(name: string): boolean {
        const privilege = this.getPrivilege(name);

        if (!privilege) {
            return false;
        }

        const roles = this.userService.recoverSavedUser()?.roles || [];
        return privilege.roles.some((privilegeRole) => {
            return roles.includes(privilegeRole);
        })
    }

    getPrivilege(name: string): IPrivilege | undefined {
        return PRIVILEGES.find((privilege) => {
            return 'path' in privilege && privilege.path === name
                || 'name' in privilege && privilege.name === name;
        });
    }
}
