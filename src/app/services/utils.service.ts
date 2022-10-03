

export class UtilsService {
    static shortenNestedObjects<T extends object>(data: T, fields: (keyof T)[]): void {
        fields.forEach((fieldName) => {
            const hasField = Object.keys(data).find((key) => {
                return key === fieldName;
            });

            console.log(fieldName);

            if (
                !hasField
                || typeof data[fieldName] === 'string'
            ) {
                return;
            }

            console.log(fieldName);

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
}
