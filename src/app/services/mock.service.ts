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
    private data: Record<string, IRestCollection<string>> = {};
    private removedData: Record<string, Set<number>> = {};

    get<T extends IEndpointName>(endpoint: T, id: number): Observable<IRestObject<T>> {
        return new Observable<IRestObject<T>>((subscriber) => {
            setTimeout(() => {
                const mockData = this.computeData(endpoint),
                    searchedItem = mockData.find((item: unknown & {id?: number}) => {
                        return 'id' in item && item.id === id;
                    });

                if (!searchedItem) {
                    subscriber.error();
                    return;
                }

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

    delete(endpoint: string, id: number): Observable<void> {
        return new Observable<void>((subscriber) => {
            if (typeof this.removedData[endpoint] === 'undefined') {
                this.removedData[endpoint] = new Set();
            }

            this.removedData[endpoint].add(id);

            setTimeout(() => {
                subscriber.next();
                subscriber.complete();
            }, 1000)
        });
    }

    private computeData<T extends IEndpointName>(endpoint: T): IRestCollection<T> {
        if (!this.data[endpoint]) {
            this.createData(endpoint);
        }

        return this.filterData(endpoint, this.data[endpoint]) as IRestCollection<T>;
    }

    private filterData<T extends IEndpointName>(endpoint: T, rawData: IRestCollection<T>): IRestCollection<T> {
        const filteredArray = rawData.filter((item: unknown & {id?: number}) => {
                return !this.removedData[endpoint]
                    || (item.id && !this.removedData[endpoint].has(item.id))
            }),
            filteredData = new RestCollection(endpoint, filteredArray, rawData.hydra);
        return filteredData as IRestCollection<T>;
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
                    url: `www.restaurant-${id}.pl`,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                };
                return restaurant
            default:
                return {
                    id
                };
        }
    }
}
