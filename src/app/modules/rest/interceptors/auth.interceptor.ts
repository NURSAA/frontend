import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {UserService} from 'src/app/services/user.service';
import {Observable, tap} from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private userService: UserService
    ) {
    }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const authToken = this.userService.getAuthorizationToken(),
            handleRequest = (request: HttpRequest<unknown>): Observable<HttpEvent<unknown>> => {
                return next.handle(request)
                    .pipe(
                        tap({
                            error: (error: HttpErrorResponse) => {
                                if (error.status === 401) {
                                    this.userService.logout();
                                    return;
                                }

                                throw error;
                            }
                        })
                    );
            }

        if (!authToken) {
            return handleRequest(req);
        }

        const authReq = req.clone({
            headers: req.headers.set('Authorization', authToken)
        });
        return handleRequest(authReq);
    }
}
