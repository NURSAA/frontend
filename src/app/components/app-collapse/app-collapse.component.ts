import {
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output, TemplateRef,
    ViewChild
} from '@angular/core';
import {Collapse} from 'bootstrap';


@Component({
    selector: 'app-collapse',
    templateUrl: './app-collapse.component.html'
})
export class AppCollapseComponent implements OnInit, OnDestroy {
    @Input() collapse = false;
    @Output() readonly collapseChange = new EventEmitter<boolean>();

    @ViewChild('collapseEl', {static: true}) private collapseEl!: ElementRef<HTMLDivElement>;

    @ContentChild('headerTemplate', {static: true}) headerTemplate!: TemplateRef<{}>;
    @ContentChild('bodyTemplate', {static: true}) bodyTemplate!: TemplateRef<{}>;

    bsCollapse!: Collapse;

    private showListener!: () => void;
    private hiddenListener!: () => void;

    ngOnInit(): void {
        this.createBsCollapse();
        this.outputCollapseShow();
        this.outputCollapseClosing();
    }

    private createBsCollapse(): void {
        this.bsCollapse = new Collapse(this.collapseEl.nativeElement);

        if (this.collapse) {
            this.bsCollapse.hide();
        } else {
            this.bsCollapse.show()
        }
    }

    private outputCollapseShow(): void {
        this.showListener = (): void => {
            this.collapseChange.emit(false);
        };
        this.collapseEl.nativeElement.addEventListener(
            'show.bs.collapse',
            this.showListener
        );
    }

    private outputCollapseClosing(): void {
        this.hiddenListener = (): void => {
            this.collapseChange.emit(true);
        };
        this.collapseEl.nativeElement.addEventListener(
            'hide.bs.collapse',
            this.hiddenListener
        );
    }

    ngOnDestroy(): void {
        this.bsCollapse.dispose();
        this.collapseEl.nativeElement.removeEventListener(
            'show.bs.collapse',
            this.showListener
        );
        this.collapseEl.nativeElement.removeEventListener(
            'hide.bs.collapse',
            this.hiddenListener
        );
    }
}
