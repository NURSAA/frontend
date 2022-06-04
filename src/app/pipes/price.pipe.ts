import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from 'src/app/modules/translate/translate.service';


@Pipe({
    name: 'price'
})
export class PricePipe implements PipeTransform {
    constructor(
        private translate: TranslateService
    ) {
    }

    transform(value: number | string): string {
        const stringValue = typeof value === 'string'
                ? value
                : value.toString(),
            firstPart = stringValue.slice(0, 2),
            secondPart = stringValue.slice(2, 4),
            translation = this.translate.get('ZL');
        return `${firstPart},${secondPart} ${translation}`;
    }
}
