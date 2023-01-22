import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastsService} from 'src/app/modules/toasts/toasts.service';
import {Subject, takeUntil} from 'rxjs';
import {IRemoveObjectInfo, RemoveObjectService} from 'src/app/modules/remove-object/remove-object.service';


@Component({
    selector: 'remove-modal',
    templateUrl: './remove-modal.component.html'
})
export class RemoveModalComponent implements OnInit, OnDestroy {
    isRemoveModalOpen = false;
    currentRemoveObjectInfo?: IRemoveObjectInfo;

    private _destroy$ = new Subject<void>();

    constructor(
        private toastsService: ToastsService,
        private removeObjectService: RemoveObjectService,
    ) {
    }

    ngOnInit(): void {
        this.removeObjectService.getRemoveObject$()
            .pipe(takeUntil(this._destroy$))
            .subscribe((removeObjectInfo) => {
                this.isRemoveModalOpen = true;
                this.currentRemoveObjectInfo = removeObjectInfo;
            });
    }

    removeObject(): void {
        if (!this.currentRemoveObjectInfo) {
            return;
        }

        this.currentRemoveObjectInfo.objectToRemove.delete()
            .subscribe(() => {
                this.currentRemoveObjectInfo?.removedCb();
                this.toastsService.saved();

                this.isRemoveModalOpen = false;
                this.currentRemoveObjectInfo = undefined;
            });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
