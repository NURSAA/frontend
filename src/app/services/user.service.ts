import {Injectable} from '@angular/core';
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {map, Observable, tap} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private token?: string;

    constructor(
        private restClient: RestClient
    ) {
    }

    tryLogin(
        username: string,
        password: string
    ): Observable<void> {
        return this.restClient.post<string, {username: string, password: string}, {token: string}>(
            'login_check',
            {username, password}
        )
            .pipe(
                tap(({token}) => {
                    this.token = token;
                }),
                map(() => {
                    return undefined;
                })
            );
    }

    getAuthorizationToken(): string | null {
        if (!this.token) {
            return null;
        }
        return `Bearer ${this.token}`;
    }
}
