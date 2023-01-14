import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';


@Component({
    selector: 'multiple-options-creator',
    templateUrl: './multiple-options-creator.component.html',
    styleUrls: ['./multiple-options-creator.component.scss']
})
export class MultipleOptionsCreatorComponent<T extends object, TKeys extends keyof T> implements OnInit, OnChanges {
    @Input() selectedItems: T[] = [];
    @Output() readonly selectedItemsChange = new EventEmitter<T[]>();

    @Input() items: T[] = [];
    @Input() itemLabelKey!: TKeys;
    @Input() label = 'SELECT_MULTIPLE_OPTIONS';

    ngOnInit(): void {
        if (!this.itemLabelKey) {
            throw new Error('Multiple options creator need `itemLabelKey` input.');
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['items']) {
            this.items = [...this.items];
        }

        if (changes['items'] || changes['itemLabelKey']) {
            this.selectedItems = [];
        }
    }

    moveItem(itemIndex: number, select = true): void {
        const source = select ? this.items : this.selectedItems,
            destination = select ? this.selectedItems : this.items,
            item = source[itemIndex];

        source.splice(itemIndex, 1);
        destination.push(item);
        this.selectedItemsChange.next(this.selectedItems);
    }
}
