import {Injectable} from '@angular/core';
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {map, Observable} from 'rxjs';
import {IUser} from 'src/app/_types/user';
import {Router} from '@angular/router';
import {LocalStorage} from 'src/app/services/local-storage.service';

interface ILoginCheckPayload {
    username: string;
    password: string;
}
interface IUserData extends IUser {
    token: string
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly USER_KEY = 'userData';
    private userData?: IUserData;

    constructor(
        private restClient: RestClient,
        private router: Router
    ) {
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
                map((userData) => {
                    this.handleSuccessfulLogin(userData);

                    return this.userData as IUserData;
                })
            );
    }

    private handleSuccessfulLogin(userData: IUserData): void {
        this.userData = userData;
        LocalStorage.set(this.USER_KEY, userData);

        this.router.navigate(['/app/restaurants']);
    }

    getAuthorizationToken(): string | null {
        if (!this.userData) {
            return null;
        }
        return `Bearer ${this.userData.token}`;
    }

    isLoggedIn(): boolean {
        return !!this.userData;
    }

    recoverSavedUser(): IUserData | null {
        const userData = LocalStorage.get<IUserData>(this.USER_KEY);
        if (!userData) {
            return null;
        }

        this.userData = userData;
        return userData;
    }
}
