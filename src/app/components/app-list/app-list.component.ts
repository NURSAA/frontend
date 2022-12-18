import {Component, ContentChild, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {IRestCollection} from 'src/app/modules/rest/rest-collection';
import {isObservable, Observable, Subject, takeUntil} from 'rxjs';
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {IQueryObject} from 'src/app/modules/rest/interfaces';


@Component({
    selector: 'app-list',
    templateUrl: './app-list.component.html'
})
export class AppListComponent implements OnInit, OnDestroy {
    @Input() endpoint!: string;
    @Input() queryObject?: IQueryObject;
    @Input() reload$?: Observable<void>;

    @ContentChild(TemplateRef) itemTemplate!: TemplateRef<{$implicit: unknown}>

    listItems!: IRestCollection<string>;

    private _destroy$ = new Subject<void>();

    constructor(
        private restClient: RestClient
    ) {
    }

    ngOnInit(): void {
        if (!this.endpoint) {
            throw new Error('App-list need specified endpoint!');
        }
        this.loadData();

        if (isObservable(this.reload$)) {
            this.reload$
                .pipe(takeUntil(this._destroy$))
                .subscribe(() => {
                    this.loadData();
                });
        }
    }

    private loadData(): void {
        this.restClient.getAll(this.endpoint, this.queryObject)
            .subscribe((items) => {
                this.listItems = items;
            });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
