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

    hasPagination = false;
    page = 1;
    lastPage = 1;

    private readonly PER_PAGE = 30;
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
        this.addPaginationQuery();
        this.restClient.getAll(this.endpoint, this.queryObject)
            .subscribe((items) => {
                this.computePagination(items)
                this.listItems = items;
            });
    }

    private addPaginationQuery(): void {
        if (!this.hasPagination) {
            return;
        }

        const paginationQuery = {
            page: this.page
        };

        Object.assign(this.queryObject, paginationQuery);
    }

    private computePagination(collection: IRestCollection<string>): void {
        console.log(collection.hydra);
        const totalItems = collection.hydra?.['hydra:totalItems'] as number;

        if (!totalItems) {
            return;
        }

        if (
            collection.length < totalItems
            && !this.hasPagination
        ) {
            this.hasPagination = true;
            this.lastPage = Math.ceil(totalItems / this.PER_PAGE);
            return;
        }
    }

    changePage(action: 'next' | 'prev'): void {
        let newPage = this.page;
        if (action === 'next') {
            newPage++;
        } else {
            newPage--;
        }

        if (newPage < 1 || newPage > this.lastPage) {
            return;
        }

        this.page = newPage;
        this.loadData();
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
