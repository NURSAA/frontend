import {Component, Input} from '@angular/core';
import {IRestObject} from 'src/app/modules/rest/rest-object';
import {ToastsService} from 'src/app/modules/toasts/toasts.service';


@Component({
    selector: 'remove-button',
    templateUrl: './remove-button.component.html'
})
export class RemoveButtonComponent {
    @Input() objectToRemove?: IRestObject<string>;
    @Input() label = 'REMOVE_OBJECT';
    @Input() message = 'REMOVE_OBJECT_CONFIRM';

    isRemoveModalOpen = false;

    constructor(
        private toastsService: ToastsService
    ) {
    }

    confirmRemove(): void {
        this.isRemoveModalOpen = true;
    }

    removeObject(): void {
        if (!this.objectToRemove) {
            return;
        }

        this.objectToRemove.delete()
            .subscribe(() => {
                this.toastsService.saved();
                this.isRemoveModalOpen = false;
            });
    }
}
