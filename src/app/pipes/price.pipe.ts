import {Pipe, PipeTransform} from '@angular/core';
import {PriceService} from 'src/app/services/price.service';


@Pipe({
    name: 'price'
})
export class PricePipe implements PipeTransform {

    transform(value: number | string): string {
        return PriceService.transformFromBackendPrice(Number(value));
    }
}
