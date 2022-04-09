import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {RestCollection} from 'src/app/modules/rest/rest-collection';
import {RestObject} from 'src/app/modules/rest/rest-object';


@Injectable()
export class RestParser implements HttpInterceptor {
    constructor(
        private injector: Injector
    ) {
    }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (req.responseType === 'json') {
            return this.interceptResponse(req, next);
        }

        return next.handle(req);
    }

    private interceptResponse(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(req)
            .pipe(
                map((event) => {
                    if (event instanceof HttpResponse && typeof event.body === 'object') {
                        return event.clone({
                            body: this.parseToRestObjects(event.body, req)
                        });
                    } else {
                        return event;
                    }
                })
            );
    }

    private parseToRestObjects(
        body: Record<string, unknown | unknown[]>,
        req: HttpRequest<unknown>
    ): unknown {
        if (Array.isArray(body['hydra:member'])) {
            const originalData = {...body};
            return new RestCollection(req.url, body['hydra:member'], originalData);
        }

        if (
            typeof body['@id'] !== 'undefined'
            && typeof body['id'] === 'number'
        ) {
            return new RestObject(
                req.url,
                body as unknown & {id: number},
                this.injector
            );
        }
        return body;
    }
}
