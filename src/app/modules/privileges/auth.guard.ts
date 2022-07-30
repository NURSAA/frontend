import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from 'src/app/services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private LOGOUT_URLS = ['/login', '/register'];

    constructor(
        private userService: UserService,
        private router: Router
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        if (!this.userService.isLoggedIn) {
            this.userService.recoverSavedUser();
        }

        if (this.LOGOUT_URLS.includes(state.url)) {
            return this.handleLoginPage();
        }

        if (this.userService.isLoggedIn) {
            return true;
        }
        return this.router.createUrlTree(['/login']);
    }

    private handleLoginPage(): boolean | UrlTree {
        if (!this.userService.isLoggedIn) {
            return true;
        }
        return this.router.createUrlTree(['/app']);
    }
}
