import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output, SimpleChanges,
    ViewChild
} from '@angular/core';
import {Modal} from 'bootstrap';


@Component({
    selector: 'app-modal',
    templateUrl: './app-modal.component.html'
})
export class AppModalComponent implements OnInit, OnChanges, OnDestroy {
    @Input() open = false;
    @Output() readonly openChange = new EventEmitter<boolean>();

    @ViewChild('modalEl', {static: true}) private modalEl!: ElementRef<HTMLDivElement>;

    bsModal!: Modal;

    private shownListener!: () => void;
    private hiddenListener!: () => void;

    ngOnInit(): void {
        this.createBsModal();
        this.outputModalOpening();
        this.outputModalClosing();
    }

    private createBsModal(): void {
        this.bsModal = new Modal(this.modalEl.nativeElement);
        if (this.open) {
            this.bsModal.show()
        }
    }

    private outputModalOpening(): void {
        this.shownListener = (): void => {
            this.openChange.emit(true);
        };
        this.modalEl.nativeElement.addEventListener(
            'show.bs.modal',
            this.shownListener
        );
    }

    private outputModalClosing(): void {
        this.hiddenListener = (): void => {
            this.openChange.emit(false);
        };
        this.modalEl.nativeElement.addEventListener(
            'hide.bs.modal',
            this.hiddenListener
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            !this.bsModal
            || !changes['open']
        ) {
            return;
        }

        this.toggle(this.open);
    }

    toggle(open: boolean): void {
        this.bsModal.toggle()
        this.openChange.emit(open);
    }

    ngOnDestroy(): void {
        this.bsModal.dispose();
        this.modalEl.nativeElement.removeEventListener(
            'show.bs.modal',
            this.shownListener
        );
        this.modalEl.nativeElement.removeEventListener(
            'hidden.bs.toast',
            this.hiddenListener
        );
    }
}
