import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {IEndpointMap, IEndpointName} from 'src/app/_types/endpoint-map';
import {Observable} from 'rxjs';


export type IRestObject<T extends IEndpointName> = {
    [Property in keyof IEndpointMap[T]]: IEndpointMap[T][Property];
} & RestObject<T>;

export class RestObject<T extends IEndpointName, TItem extends IEndpointMap[T] = IEndpointMap[T]> {
    id!: number;
    '@id'!: string;

    constructor(
        private endpoint: T,
        source: TItem & {id?: number, '@id'?: string},
        private restClient: RestClient
    ) {
        this.assignProperties(source);
        this.endpoint = this.restClient.stripApiPath(this.endpoint);
    }

    private assignProperties(source: TItem & {id?: number}): void {
        if (source.id) {
            this.id = source.id;
        }
        Object.assign<this, TItem>(this, source);
    }

    persist(): Observable<IRestObject<T>> {
        if (this.id) {
            return this.restClient.put(`${this.endpoint}/${this.id}`, this);
        }
        return this.restClient.post(this.endpoint, this);
    }

    delete(): Observable<IRestObject<T>> {
        return this.restClient.delete(this.endpoint, this.id);
    }

    toJSON(): this {
        const shallowCopy = {...this},
            omittedFields = ['endpoint', 'restClient'] as const;
        omittedFields.forEach((fieldName) => {
            delete shallowCopy[fieldName];
        })

        return shallowCopy;
    }
}
