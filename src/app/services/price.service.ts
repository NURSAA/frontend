import {CurrencyPipe} from '@angular/common';


export class PriceService {
    static readonly CURRENCY = 'PLN';
    static readonly LOCALE = 'en';

    /**
     * Parse string price 'PLN1.00' or '1.00' to backend price like 1000.
     */
    static transformToBackendPrice(stringPrice: string | null): number {
        if (!stringPrice) {
            return 0;
        }

        stringPrice = this.removeCurrency(stringPrice);
        const [integer, decimal] = stringPrice.split('.'),
            result = Number(integer) * 1000 + Number(decimal);
        return Number.isNaN(result) ? 0 : result;
    }

    /**
     * Parse backend price like 1000 to frontend string like PLN1
     */
    static transformFromBackendPrice(backendPrice: number): string {
        const decimal = backendPrice % 1000,
            integer = (backendPrice - decimal) / 1000,
            floatValue = Number(`${integer}.${decimal}`);
        return this.transformToCurrency(floatValue);
    }

    static removeCurrency(value: string): string {
        return value.replace(PriceService.CURRENCY, '');
    }

    static transformToCurrency(price: number): string {
        return (new CurrencyPipe(this.LOCALE)).transform(
            price,
            this.CURRENCY
        ) || `${this.CURRENCY}0`;
    }
}
