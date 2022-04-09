import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {UserService} from 'src/app/services/user.service';
import {Observable} from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private userService: UserService
    ) {
    }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const authToken = this.userService.getAuthorizationToken();

        if (!authToken) {
            return next.handle(req);
        }

        const authReq = req.clone({
            headers: req.headers.set('Authorization', authToken)
        });
        return next.handle(authReq);
    }
}
