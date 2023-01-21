import {Directive, HostBinding, Input, OnChanges, OnDestroy, OnInit, Optional, SimpleChanges} from '@angular/core';
import {FormDirective} from 'src/app/modules/app-forms/directives/form.directive';
import {Subject, takeUntil} from 'rxjs';
import {FormGroup} from '@angular/forms';


@Directive({
    selector: 'button[type=submit]'
})
export class SubmitDirective implements OnInit, OnChanges, OnDestroy {
    @Input() disabled?: boolean;
    @HostBinding('disabled') isButtonDisabled!: boolean;

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

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['disabled']) {
            this.updateDisabledValue();
        }
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

        this.isButtonDisabled = this.disabled || this.form.invalid;
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
