import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {IEndpointMap, IEndpointName} from 'src/app/_types/endpoint-map';
import {Observable} from 'rxjs';
import {Injector} from '@angular/core';

export type IRestObject<T extends IEndpointName> = {
    [Property in keyof IEndpointMap[T]]: IEndpointMap[T][Property];
} & RestObject<T>;

export class RestObject<T extends IEndpointName, TItem extends IEndpointMap[T] = IEndpointMap[T]> {
    private readonly id: number;
    private restClient: RestClient;

    constructor(
        private readonly endpoint: T,
        source: TItem & {id: number},
        injector: Injector
    ) {
        if (typeof source.id === 'undefined') {
            throw new Error('Rest object always need id property!');
        }
        this.id = source.id;
        Object.assign<this, TItem>(this, source);

        this.restClient = injector.get(RestClient);
        this.endpoint = this.restClient.stripApiPath(this.endpoint);
    }

    update(): Observable<IRestObject<T>> {
        return this.restClient.put(this.endpoint, this);
    }

    delete(): Observable<IRestObject<T>> {
        return this.restClient.delete(this.endpoint, this.id);
    }
}
