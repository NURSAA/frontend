import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IRestObject} from 'src/app/modules/rest/rest-object';
import {RemoveObjectService} from 'src/app/modules/remove-object/remove-object.service';


@Component({
    selector: 'remove-button',
    templateUrl: './remove-button.component.html'
})
export class RemoveButtonComponent {
    @Input() objectToRemove?: IRestObject<string>;
    @Input() label = 'REMOVE_OBJECT';
    @Input() message = 'REMOVE_OBJECT_CONFIRM';
    @Input() viewType: 'textButton' | 'icon' = 'textButton';

    @Output() readonly removed = new EventEmitter<void>();

    constructor(
        private removeObjectService: RemoveObjectService
    ) {
    }

    confirmRemove(): void {
        if (!this.objectToRemove) {
            return;
        }
        const config = {
            label: this.label,
            message: this.message
        };
        this.removeObjectService.removeObject(this.objectToRemove, config)
            .subscribe(() => {
                this.removed.emit();
            });
    }
}
