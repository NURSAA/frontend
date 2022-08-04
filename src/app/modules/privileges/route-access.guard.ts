import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanLoad,
    Route,
    Router,
    UrlTree
} from '@angular/router';
import {PrivilegesService} from 'src/app/modules/privileges/privileges.service';
import {UserService} from 'src/app/services/user.service';

@Injectable({
    providedIn: 'root'
})
export class RouteAccessGuard implements CanLoad, CanActivate {
    constructor(
        private privilegesService: PrivilegesService,
        private userService: UserService,
        private router: Router
    ) {
    }

    canLoad(route: Route): boolean | UrlTree {
        return this.allowPath(route.path);
    }

    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
        return this.allowPath(route.routeConfig?.path);
    }

    private allowPath(path?: string): boolean | UrlTree {
        if (!path || !this.userService.isLoggedIn) {
            return true;
        }

        if (this.privilegesService.hasAccess(path)) {
            return true;
        }

        const privilege = this.privilegesService.getPrivilege(path);

        if (
            privilege
            && 'redirectTo' in privilege && privilege.redirectTo
        ) {
            return this.router.createUrlTree(privilege.redirectTo);
        }

        this.userService.logout();
        return false;
    }
}
