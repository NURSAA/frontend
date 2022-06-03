import {Injectable} from '@angular/core';
import {IEndpointMap, IEndpointName} from 'src/app/_types/endpoint-map';
import {IRestCollection, RestCollection} from 'src/app/modules/rest/rest-collection';
import {IRestObject} from 'src/app/modules/rest/rest-object';
import {Observable} from 'rxjs';
import {IRestaurant} from 'src/app/_types/restaurant';
import {LocalStorage} from 'src/app/services/local-storage.service';
import {IMenu} from 'src/app/_types/menu';
import {IMenuSection} from 'src/app/_types/menu-section';
import {IDish} from 'src/app/_types/dish';


@Injectable({
    providedIn: 'root'
})
export class MockService {
    private static customId = 1;

    private data: Record<string, IRestCollection<string>> = {};
    private removedData: Record<string, Set<number>> = {};
    private readonly lsKey = {
        DATA: 'mock_data',
        REMOVED_DATA: 'mock_removed_data'
    };

    constructor() {
        this.loadLocalStorageData();
    }

    private loadLocalStorageData(): void {
        const savedData = LocalStorage.get<Record<string, unknown[]>>(this.lsKey.DATA);
        if (savedData) {
            Object.entries(savedData).forEach(([key, items]) => {
                this.data[key] = new RestCollection(key, items, {});
            });
            this.data = savedData as MockService['data'];
        }

        const savedRemovedData = LocalStorage.get<Record<string, number[]>>(this.lsKey.REMOVED_DATA);
        if (savedRemovedData) {
            const removedDataSets: MockService['removedData'] = {};
            Object.entries(savedRemovedData).forEach(([key, items]) => {
                removedDataSets[key] = new Set(items);
            });
            this.removedData = removedDataSets;
            console.log(this.removedData);
        }
    }

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

    persist<T extends IEndpointName>(endpoint: string, payload: IRestObject<T>): Observable<IRestObject<T>> {
        return new Observable((subscriber) => {
            const mockData = this.computeData(endpoint),
                searchedItem = mockData.find((item: unknown & {id?: number}) => {
                    return 'id' in item && item.id === payload.id;
                });

            if (searchedItem) {
                Object.entries(payload).forEach(([key, value]) => {
                    searchedItem[key] = value;
                });

                this.persistData();
                subscriber.next(searchedItem);
                subscriber.complete();
                return;
            }


            if (!payload.id) {
                payload.id = MockService.customId++;
            }
            this.data[endpoint].push(payload);

            this.persistData();
            subscriber.next(payload);
            subscriber.complete();
        });
    }

    private computeData<T extends IEndpointName>(endpoint: T): IRestCollection<T> {
        if (!this.data[endpoint]) {
            this.createData(endpoint);
        }

        this.persistData();
        return this.filterData(endpoint, this.data[endpoint]) as IRestCollection<T>;
    }

    private persistData(): void {
        LocalStorage.set(this.lsKey.DATA, this.data);

        const preparedData: Record<string, number[]> = {};
        Object.entries(this.removedData).forEach(([key, idSet]) => {
            preparedData[key] = Array.from(idSet);
        });
        LocalStorage.set(this.lsKey.REMOVED_DATA, preparedData);
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
                return this.restaurantFactory(id);
            case 'menus':
                return this.menuFactory(id);
            case 'menu_sections':
                return this.menuSectionFactory(id);
            case 'dishes':
                return this.dishFactory(id);
            default:
                return {
                    id
                };
        }
    }

    private restaurantFactory(id: number): IRestaurant {
        return {
            id,
            name: `Restaurant ${id}`,
            url: `www.restaurant-${id}.pl`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        };
    }

    private menuFactory(id: number): IMenu {
        return {
            id,
            name: `Menu ${id}`,
            restaurant: this.restaurantFactory(id)
        };
    }

    private menuSectionFactory(id: number): IMenuSection {
        return {
            id,
            name: `Section ${id}`,
            dishes: this.createIdArray(4).map((id) => {
                return this.dishFactory(id);
            })
        };
    }

    private dishFactory(id: number): IDish {
        return {
            id,
            name: `Dish ${id}`,
        };
    }

    private createIdArray(length = 10): number[] {
        const customArray = [...Array(length + 1).keys()];
        customArray.shift();
        return customArray;
    }
}
