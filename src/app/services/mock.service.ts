import {Injectable} from '@angular/core';
import {IEndpointMap, IEndpointName} from 'src/app/_types/endpoint-map';
import {IRestCollection, RestCollection} from 'src/app/modules/rest/rest-collection';
import {IRestObject} from 'src/app/modules/rest/rest-object';
import {Observable} from 'rxjs';
import {IRestaurant} from 'src/app/_types/restaurant';

@Injectable({
    providedIn: 'root'
})
export class MockService {
    data: Record<string, IRestCollection<string>> = {};

    get<T extends IEndpointName>(endpoint: T, id: number): Observable<IRestObject<T>> {
        const mockData = this.computeData(endpoint),
            searchedItem = mockData.find((item: unknown & {id?: number}) => {
                return 'id' in item && item.id === id;
            });

        return new Observable<IRestObject<T>>((subscriber) => {
            setTimeout(() => {
                subscriber.next(searchedItem as IRestObject<T>);
                subscriber.complete();
            }, 1000)
        });
    }

    getAll<T extends IEndpointName>(endpoint: T): Observable<IRestCollection<T>> {
        return new Observable<IRestCollection<T>>((subscriber) => {
            setTimeout(() => {
                subscriber.next(this.computeData(endpoint));
                subscriber.complete();
            }, 1000)
        });
    }

    private computeData<T extends IEndpointName>(endpoint: T): IRestCollection<T> {
        if (this.data[endpoint]) {
            return this.data[endpoint] as IRestCollection<T>;
        }

        this.createData(endpoint);
        return this.data[endpoint] as IRestCollection<T>;
    }

    private createData(endpoint: string): void {
        const data = [];
        for (let i = 1; i <= 10; i++) {
            const mockedData = this.createMockEntry(endpoint, i);
            data.push(mockedData);
        }

        this.data[endpoint] = new RestCollection(endpoint, data, {});
    }

    private createMockEntry<T extends IEndpointName>(endpoint: T, id: number): IEndpointMap[T] {
        switch (endpoint) {
            case 'restaurants':
                const restaurant: IRestaurant = {
                    id,
                    name: `Restaurant ${id}`,
                };
                return restaurant
            default:
                return {
                    id
                };
        }
    }
}
