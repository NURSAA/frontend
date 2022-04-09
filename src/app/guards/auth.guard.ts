import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from 'src/app/services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private router: Router
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        if (!this.userService.isLoggedIn()) {
            this.userService.recoverSavedUser();
        }

        if (state.url.startsWith('/login')) {
            return this.handleLoginPage();
        }

        if (this.userService.isLoggedIn()) {
            return true;
        }
        return this.router.createUrlTree(['/login']);
    }

    private handleLoginPage(): boolean | UrlTree {
        if (!this.userService.isLoggedIn()) {
            return true;
        }
        return this.router.createUrlTree(['/app']);
    }
}
