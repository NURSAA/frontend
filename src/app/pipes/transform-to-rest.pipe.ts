import {Pipe, PipeTransform} from '@angular/core';
import {IEndpointMap, IEndpointName} from 'src/app/_types/endpoint-map';
import {IRestObject, RestObject} from 'src/app/modules/rest/rest-object';
import {RestClient} from 'src/app/modules/rest/rest-client.service';


@Pipe({
    name: 'transformToRest'
})
export class TransformToRestPipe implements PipeTransform {
    constructor(
        private restClient: RestClient
    ) {
    }

    transform<T extends IEndpointName, TBody = IEndpointMap[T]>(
        value: TBody | IRestObject<T>,
        endpoint: T
    ): IRestObject<T> {
        if (value instanceof RestObject) {
            return value;
        }

        return this.restClient.createObject(endpoint, value);
    }
}
