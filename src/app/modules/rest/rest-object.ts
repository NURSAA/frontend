import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {IEndpointMap, IEndpointName} from 'src/app/_types/endpoint-map';
import {Observable} from 'rxjs';
import {Injector} from '@angular/core';

export type IRestObject<T extends IEndpointName> = {
    [Property in keyof IEndpointMap[T]]: IEndpointMap[T][Property];
} & RestObject<T>;

export class RestObject<T extends IEndpointName, TItem extends IEndpointMap[T] = IEndpointMap[T]> {
    id!: number;

    constructor(
        private readonly endpoint: T,
        source: TItem & {id?: number},
        private injector: Injector
    ) {
        this.assignProperties(source);
        this.endpoint = this.restClient().stripApiPath(this.endpoint);
    }

    private assignProperties(source: TItem & {id?: number}): void {
        if (source.id) {
            this.id = source.id;
        }
        Object.assign<this, TItem>(this, source);
    }

    /**
     * It's workaround to avoid circular structure in JSON.stringify while performing requests.
     */
    private restClient(): RestClient {
        return this.injector.get(RestClient);
    }

    persist(): Observable<IRestObject<T>> {
        if (this.id) {
            return this.restClient().put(this.endpoint, this);
        }
        return this.restClient().post(this.endpoint, this);
    }

    delete(): Observable<IRestObject<T>> {
        return this.restClient().delete(this.endpoint, this.id);
    }
}
