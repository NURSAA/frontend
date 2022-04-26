import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {IToast} from 'src/app/modules/toasts/toasts.service';
import {Toast} from 'bootstrap';

@Component({
    selector: 'toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
    @Input() toast!: IToast;

    @Output() readonly closed = new EventEmitter<void>();

    @ViewChild('toastEl', {static: true}) private toastEl!: ElementRef<HTMLDivElement>;

    bsToast!: Toast;

    private hiddenListener!: () => void;

    ngOnInit(): void {
        this.createBsToast();
        this.bsToast.show();
        this.outputToastClosing();
    }

    private createBsToast(): void {
        this.bsToast = new Toast(
            this.toastEl.nativeElement,
            {
                delay: 3000,
            }
        );
    }

    private outputToastClosing(): void {
        this.hiddenListener = (): void => {
            this.closed.emit();
        };
        this.toastEl.nativeElement.addEventListener(
            'hidden.bs.toast',
            this.hiddenListener
        );
    }

    ngOnDestroy(): void {
        this.bsToast.dispose();
        this.toastEl.nativeElement.removeEventListener(
            'hidden.bs.toast',
            this.hiddenListener
        );
    }
}
