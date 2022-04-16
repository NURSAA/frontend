import {Directive, OnInit, Optional} from '@angular/core';
import {FormGroup, FormGroupDirective, NgForm} from '@angular/forms';


@Directive({
    selector: 'form:not([ngNoForm]),ngForm,ng-form,[ngForm]'
})
export class FormDirective implements OnInit {
    formGroup?: FormGroup;

    constructor(
        @Optional() private ngForm: NgForm,
        @Optional() private formGroupDirective: FormGroupDirective,
    ) {
    }

    ngOnInit(): void {
        this.extractFormGroup();
    }

    private extractFormGroup(): void {
        if (this.formGroupDirective) {
            this.formGroup = this.formGroupDirective.form;
        } else if (this.ngForm) {
            this.formGroup = this.ngForm.form;
        }
    }
}
