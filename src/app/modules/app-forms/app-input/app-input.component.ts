import {Component, Injector, Input, OnDestroy, OnInit} from '@angular/core';
import {IInputType} from 'src/app/modules/app-forms/interfaces';
import {
    AbstractControl,
    ControlValueAccessor,
    FormControl,
    NG_VALUE_ACCESSOR,
    NgControl,
    Validators
} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';



@Component({
    selector: 'app-input',
    templateUrl: './app-input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AppInputComponent,
            multi: true
        }
    ]
})
export class AppInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input() name!: string;
    @Input() type: IInputType = 'text';

    parentControl!: AbstractControl;
    inputControl = new FormControl();
    isRequired = false;
    _onChange?: (value: unknown) => void;
    _onTouched?: () => unknown;

    private _destroy$ = new Subject<void>();

    constructor(
        private injector: Injector
    ) {
    }

    writeValue(value: unknown): void {
        this.inputControl.setValue(value);
    }

    ngOnInit(): void {
        this.inputControl.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe((value) => {
                if (typeof this._onChange === 'function') {
                    this._onChange(value);
                }
            });
        this.accessParentControl();
    }

    private accessParentControl(): void {
        setTimeout(() => {
            this.parentControl = this.injector.get(NgControl).control as AbstractControl;
            this.isRequired = this.parentControl.hasValidator(Validators.required);
        })
    }

    registerOnChange(fn: (value: unknown) => unknown): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => unknown): void {
        this._onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        if (isDisabled) {
            this.inputControl.disable();
        } else {
            this.inputControl.enable();
        }
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
