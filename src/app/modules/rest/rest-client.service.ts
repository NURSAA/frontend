import {Injectable} from "@angular/core";
import {IEndpointMap, IEndpointName} from 'src/app/_types/endpoint-map';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRestCollection, RestCollection} from 'src/app/modules/rest/rest-collection';
import {IRestObject} from 'src/app/modules/rest/rest-object';


@Injectable({
    providedIn: 'root'
})
export class RestClient {
    private readonly API_PATH = '/api/';

    constructor(
        private httpClient: HttpClient,
    ) {
    }

    get<T extends IEndpointName>(
        endpoint: T,
        id: number
    ): Observable<IRestObject<T>> {
        return this.httpClient.get<IRestObject<T>>(
            this.getUrl(endpoint) + `/${id}`,
        );
    }

    getAll<T extends IEndpointName>(
        endpoint: T
    ): Observable<IRestCollection<T>> {
        return this.httpClient.get<RestCollection<T>>(
            this.getUrl(endpoint)
        );
    }

    post<T extends IEndpointName, TBody = IEndpointMap[T], TReturn = IRestObject<T>>(
        endpoint: T,
        body: TBody
    ): Observable<TReturn> {
        return this.httpClient.post<TReturn>(
            this.getUrl(endpoint),
            body
        );
    }

    put<T extends IEndpointName, TBody = IEndpointMap[T], TReturn = IRestObject<T>>(
        endpoint: T,
        body: TBody
    ): Observable<TReturn> {
        return this.httpClient.put<TReturn>(
            this.getUrl(endpoint),
            body
        );
    }

    delete<T extends IEndpointName>(
        endpoint: T,
        id: number
    ): Observable<IRestObject<T>> {
        return this.httpClient.delete<IRestObject<T>>(
            this.getUrl(endpoint) + `/${id}`,
        );
    }

    private getUrl(endpoint: string): string {
        return this.API_PATH + endpoint;
    }

    stripApiPath<T extends string>(url: T): T {
        if (!url.includes(this.API_PATH)) {
            return url;
        }
        return url.replace(this.API_PATH, '') as T;
    }
}
