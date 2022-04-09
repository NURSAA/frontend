import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from 'src/app/modules/rest/interceptors/auth.interceptor';
import {RestParser} from 'src/app/modules/rest/interceptors/rest-parser.interceptor';


export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: RestParser, multi: true},
];
