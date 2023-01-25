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
import {PriceService} from 'src/app/services/price.service';

let appInputId = 0;

export interface IAppInputOptions<T = unknown> {
    value: T;
    label: string;
}

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
    @Input() options?: IAppInputOptions[];

    parentControl!: AbstractControl;
    inputControl = new FormControl();
    isRequired = false;
    inputId = `app-input-${appInputId++}`;
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
        this.syncInputValue();
        this.accessParentControl();
    }

    private syncInputValue(): void {
        this.inputControl.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe((value) => {
                if (typeof this._onChange === 'function') {
                    this._onChange(value);
                }
            });
    }

    private accessParentControl(): void {
        // Wait to next cycle so parent control can be created.
        setTimeout(() => {
            this.parentControl = this.injector.get(NgControl).control as AbstractControl;

            this.isRequired = this.parentControl.hasValidator(Validators.required)
                || this.parentControl.errors?.['required'];

            this.passResetMethod();
        })
    }

    private passResetMethod(): void {
        const parentReset = this.parentControl.reset.bind(this.parentControl);
        this.parentControl.reset = (value, options): void => {
            parentReset(value, options);
            this.inputControl.reset(value, options);
        }
    }

    handleBlur(event: Event): void {
        if (this.type === 'price') {
            this.transformAmount(event);
        }

        if (this._onTouched) {
            this._onTouched();
        }
    }

    private transformAmount(event: Event): void {
        let inputValue = this.inputControl.value;
        if (typeof inputValue === 'string') {
            inputValue = PriceService.removeCurrency(inputValue);
        }

        const floatPrice = Number(inputValue),
            formattedValue = PriceService.transformToCurrency(floatPrice),
            backendValue = PriceService.transformToBackendPrice(formattedValue);
        this.inputControl.setValue(backendValue);

        (event.target as unknown as HTMLInputElement).value = formattedValue;
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
