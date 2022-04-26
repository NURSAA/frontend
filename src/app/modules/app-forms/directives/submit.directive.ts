import {Directive, HostBinding, OnDestroy, OnInit, Optional} from '@angular/core';
import {FormDirective} from 'src/app/modules/app-forms/directives/form.directive';
import {Subject, takeUntil} from 'rxjs';
import {FormGroup} from '@angular/forms';


@Directive({
    selector: 'button[type=submit]'
})
export class SubmitDirective implements OnInit, OnDestroy {
    @HostBinding('disabled') disabled!: boolean;

    private form?: FormGroup;
    private _destroy$ = new Subject<void>();

    constructor(
        @Optional() private formDirective: FormDirective
    ) {
    }

    ngOnInit(): void {
        this.extractForm();
        this.updateDisabledValue();
        this.watchStatusChange();
    }

    private extractForm(): void {
        if (!this.formDirective.formGroup) {
            return;
        }
        this.form = this.formDirective.formGroup;
    }

    private updateDisabledValue(): void {
        if (!this.form) {
            return;
        }
        this.disabled = this.form.invalid;
    }

    private watchStatusChange(): void {
        if (!this.form) {
            return;
        }

        this.form.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
                this.updateDisabledValue();
            })
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
