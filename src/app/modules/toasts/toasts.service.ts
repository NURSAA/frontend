import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

export type IToast = {
    type: 'danger' | 'warning' | 'info' | 'success';
    title: string;
    description: string;
}

@Injectable({
    providedIn: 'root'
})
export class ToastsService {
    private toastsSubject = new Subject<IToast>();

    getToast$(): Observable<IToast> {
        return this.toastsSubject.asObservable();
    }

    push(toast: IToast): void {
        // @Todo try translating title/desc
        this.toastsSubject.next(toast);
    }
}
