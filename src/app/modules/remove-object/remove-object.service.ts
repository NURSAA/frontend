import {Injectable, Input} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IRestObject} from 'src/app/modules/rest/rest-object';

export interface IRemoveObjectInfo {
    objectToRemove: IRestObject<string>
    config: {
        label: string;
        message: string;
    };
    removedCb: () => void;
}


@Injectable({
    providedIn: 'root'
})
export class RemoveObjectService {
    private removeObjectSubject = new Subject<IRemoveObjectInfo>();

    removeObject(objectToRemove: IRestObject<string>, config: IRemoveObjectInfo['config']): Observable<void> {
        return new Observable<void>((subscriber) => {
            const removedCb = (): void => {
                subscriber.next();
                subscriber.complete();
            };

            this.removeObjectSubject.next({
                objectToRemove,
                config,
                removedCb
            });

        });
    }

    getRemoveObject$(): Observable<IRemoveObjectInfo> {
        return this.removeObjectSubject.asObservable();
    }
}
