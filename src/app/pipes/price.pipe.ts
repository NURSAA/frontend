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
        const numberValue = typeof value === 'number'
                ? value
                : Number(value),
            priceValue = numberValue / 1000,
            translation = this.translate.get('ZL');
        return `${priceValue} ${translation}`;
    }
}
