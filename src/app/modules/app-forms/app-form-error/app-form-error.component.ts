import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';


@Component({
    selector: 'app-form-error',
    templateUrl: './app-form-error.component.html'
})
export class AppFormErrorComponent {
    @Input() control?: AbstractControl;
    @Input() overrideError?: string;
}
