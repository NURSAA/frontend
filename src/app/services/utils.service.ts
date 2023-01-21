import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';


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
}
