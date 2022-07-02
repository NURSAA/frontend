import {HttpParameterCodec} from '@angular/common/http';


export class CustomHttpParamEncoder implements HttpParameterCodec {
    encodeKey(key: string): string {
        return this.encode(key);
    }

    encodeValue(value: string): string {
        return this.encode(value);
    }

    decodeKey(key: string): string {
        return this.decode(key);
    }

    decodeValue(value: string): string {
        return this.decode(value);
    }

    private encode(value: string): string {
        return encodeURIComponent(value)
            .replace(/%5B/gi, '[')
            .replace(/%5D/gi, ']');
    }

    private decode(value: string): string {
        return decodeURIComponent(value)
            .replace(/%5B/gi, '[')
            .replace(/%5D/gi, ']');
    }
}
