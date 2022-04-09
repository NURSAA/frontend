import {IEndpointMap, IEndpointName} from 'src/app/_types/endpoint-map';

export type IRestCollection<T extends IEndpointName, TItem = IEndpointMap[T]> = RestCollection<T, TItem>;

export class RestCollection<T extends IEndpointName, TItem = IEndpointMap[T]> extends Array {
    constructor(
        private _endpoint: T,
        collection: TItem[],
        private _hydra: Record<string, unknown>
    ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        super(...collection as any)
    }

    get hydra(): Record<string, unknown> {
        return this._hydra;
    }

    get endpoint(): T {
        return this._endpoint;
    }
}
