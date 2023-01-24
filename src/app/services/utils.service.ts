import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';


export class UtilsService {
    static shortenNestedObjects<T extends object>(data: T, fields: (keyof T)[]): void {
        fields.forEach((fieldName) => {
            const hasField = Object.keys(data).find((key) => {
                return key === fieldName;
            });

            if (
                !hasField
                || typeof data[fieldName] === 'string'
            ) {
                return;
            }

            if (
                !(fieldName in data)
            ) {
                return;
            }

            const value = data[fieldName] as (unknown & {'@id'?: string});
            if ('@id' in value) {
                // We want to override field with IRI.
                data[fieldName] = value['@id'] as unknown as T[keyof T];
            }
        });
    }

    static urlValidator(control: AbstractControl): ValidationErrors | null {
        const urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
            patternResult = Validators.pattern(urlPattern)(control);
        return patternResult ? {url: true} : null;
    }

    static sameValueValidator(fields: string[]): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            if (
                !fields.length
            ) {
                return null;
            }

            if (!(formGroup instanceof FormGroup)) {
                return null;
            }

            const firstFieldValue = formGroup.controls[fields[0]].value,
                wrongValueControl = Object.entries(formGroup.controls).find(([name, control]) => {
                    if (fields.includes(name)) {
                        return control.value !== firstFieldValue;
                    }

                    return false;
                });
            return wrongValueControl ? {fieldsNotSame: fields} : null;
        };
    }
}
