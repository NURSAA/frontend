import {Component, ContentChild, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {MockService} from 'src/app/services/mock.service';
import {IRestCollection} from 'src/app/modules/rest/rest-collection';
import {isObservable, Observable, Subject, takeUntil} from 'rxjs';


@Component({
    selector: 'app-list',
    templateUrl: './app-list.component.html'
})
export class AppListComponent implements OnInit, OnDestroy {
    @Input() endpoint!: string;
    @Input() reload$?: Observable<void>;

    @ContentChild(TemplateRef) itemTemplate!: TemplateRef<{$implicit: unknown}>

    listItems!: IRestCollection<string>;

    private _destroy$ = new Subject<void>();

    constructor(
        private mockService: MockService
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
        this.mockService.getAll(this.endpoint)
            .subscribe((items) => {
                this.listItems = items;
            });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
