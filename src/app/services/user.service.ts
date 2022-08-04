import {Injectable} from '@angular/core';
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {Observable, tap} from 'rxjs';
import {IUser} from 'src/app/_types/user';
import {Router} from '@angular/router';
import {LocalStorage} from 'src/app/services/local-storage.service';

interface ILoginCheckPayload {
    username: string;
    password: string;
}
interface IUserData extends IUser {
    token: string;
    '@id': string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    isLoggedIn = false;

    private readonly USER_KEY = 'userData';
    private userData?: IUserData;

    constructor(
        private restClient: RestClient,
        private router: Router
    ) {
        this.recoverSavedUser();
    }

    tryLogin(
        username: string,
        password: string
    ): Observable<IUserData> {
        return this.restClient.post<string, ILoginCheckPayload, IUserData>(
            'login_check',
            {username, password}
        )
            .pipe(
                tap((userData) => {
                    this.handleSuccessfulLogin(userData);
                })
            );
    }

    private handleSuccessfulLogin(userData: IUserData): void {
        this.isLoggedIn = true;
        this.userData = userData;
        LocalStorage.set(this.USER_KEY, userData);

        this.router.navigate(['/app/restaurants']);
    }

    logout(): void {
        this.isLoggedIn = false;
        this.userData = undefined;
        LocalStorage.clear();
        this.router.navigate(['']);
    }

    getAuthorizationToken(): string | null {
        if (!this.userData) {
            return null;
        }
        return `Bearer ${this.userData.token}`;
    }

    recoverSavedUser(): IUserData | null {
        const userData = LocalStorage.get<IUserData>(this.USER_KEY);
        if (!userData) {
            return null;
        }

        this.isLoggedIn = true;
        this.userData = userData;
        return userData;
    }
}
