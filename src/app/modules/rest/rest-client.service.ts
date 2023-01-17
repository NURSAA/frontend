import {Injectable} from '@angular/core';
import {IEndpointMap, IEndpointName} from 'src/app/_types/endpoint-map';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRestCollection, RestCollection} from 'src/app/modules/rest/rest-collection';
import {IRestObject, RestObject} from 'src/app/modules/rest/rest-object';
import {IQueryObject} from 'src/app/modules/rest/interfaces';
import {CustomHttpParamEncoder} from 'src/app/modules/rest/custom-decoder';


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
        endpoint: T,
        query?: IQueryObject
    ): Observable<IRestCollection<T>> {
        return this.httpClient.get<RestCollection<T>>(
            this.getUrl(endpoint),
            {params: this.getParams(query)}
        );
    }

    getSubresource<T extends IEndpointName>(
        config: {
            id: number,
            endpoint: IEndpointName,
            subresourceEndpoint: T,
        },
        query?: IQueryObject
    ): Observable<IRestCollection<T>> {
        const {id, endpoint, subresourceEndpoint} = config,
            subresourcePath = `${endpoint}/${id}/${subresourceEndpoint}`;

        return this.getAll(subresourcePath as T, query);
    }

    private getParams(query?: IQueryObject): HttpParams | undefined {
        if (!query) {
            return undefined;
        }

        const paramsObject: Record<string, IQueryObject[string]> = {};

        Object.entries(query).forEach(([key, value]) => {
            if (!Array.isArray(value)) {
                paramsObject[key] = value;
                return;
            }

            const arrayKey = key + '[]';
            value.forEach((item) => {
                paramsObject[arrayKey] = item;
            });
        });

        return new HttpParams({fromObject: paramsObject, encoder: new CustomHttpParamEncoder()});
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

    createObject<T extends IEndpointName, TItem extends IEndpointMap[T] = IEndpointMap[T]>(
        endpoint: T,
        source: TItem & {id?: number}
    ): IRestObject<T> {
        return new RestObject(endpoint, source, this) as IRestObject<T> ;
    }

    stripApiPath<T extends string>(url: T): T {
        if (!url.includes(this.API_PATH)) {
            return url;
        }
        return url.replace(this.API_PATH, '') as T;
    }

    getIri(endpoint: IEndpointName, id: number): string {
        return `${this.API_PATH}${endpoint}/${id}`;
    }

    getId(iri: string): number {
        return Number(iri.split('/').pop());
    }
}
