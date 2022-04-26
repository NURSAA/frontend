import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {TranslateService} from 'src/app/modules/translate/translate.service';

export type IToast = {
    type: 'danger' | 'warning' | 'info' | 'success';
    title: string;
    description?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ToastsService {
    private toastsSubject = new Subject<IToast>();

    constructor(
        private translateService: TranslateService
    ) {
    }

    getToast$(): Observable<IToast> {
        return this.toastsSubject.asObservable();
    }

    push(toast: IToast): void {
        toast.title = this.translateService.get(toast.title);
        if (toast.description) {
            toast.description = this.translateService.get(toast.description);
        }

        this.toastsSubject.next(toast);
    }

    pushError(): void {
        this.push({
            type: 'danger',
            title: 'ERROR',
            description: 'ERROR_DESCRIPTION'
        });
    }
}
