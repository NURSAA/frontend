import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {IToast, ToastsService} from 'src/app/modules/toasts/toasts.service';


@Component({
    selector: 'toasts',
    templateUrl: './toasts.component.html',
    styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit, OnDestroy {
    toasts: IToast[] = [];

    private _onDestroy$ = new Subject<void>();

    constructor(
        private toastsService: ToastsService
    ) {
    }

    ngOnInit(): void {
        this.toastsService.getToast$()
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((toast) => {
                console.log(toast);
                this.toasts.push(toast);
            })
    }

    removeToast(toastIndex: number): void {
        this.toasts.splice(toastIndex, 1);
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }
}
