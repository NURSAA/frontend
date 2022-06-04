import {Directive, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Tooltip} from 'bootstrap';

@Directive({
    selector: '[title]'
})
export class TitleDirective implements OnInit, OnDestroy {
    private bsTooltip!: Tooltip;

    constructor(
        private elementRef: ElementRef
    ) {
    }

    ngOnInit(): void {
        this.bsTooltip = new Tooltip(this.elementRef.nativeElement);
    }

    ngOnDestroy(): void {
        this.bsTooltip.dispose();
    }
}
