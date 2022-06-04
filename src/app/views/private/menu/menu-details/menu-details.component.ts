import {Component, OnInit} from '@angular/core';
import {MockService} from 'src/app/services/mock.service';
import {IMenuSection} from 'src/app/_types/menu-section';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IDish} from 'src/app/_types/dish';


type IMenuDetailsSection = IMenuSection & {collapsed: boolean;};

@Component({
    selector: 'menu-details',
    templateUrl: './menu-details.component.html'
})
export class MenuDetailsComponent implements OnInit {
    isEditView = false;
    sections!: IMenuDetailsSection[];

    isSectionModalOpen = false;
    sectionForm = new FormGroup({
        name: new FormControl(null, Validators.required)
    })

    constructor(
        private mockService: MockService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.loadMenuSections();
        this.checkEditView();
    }

    private loadMenuSections(): void {
        const menuId = Number(this.route.snapshot.params['id']);
        this.mockService.getAll(
            'menu_sections',
            {'menu.id': menuId}
        )
            .subscribe((sections) => {
                this.sections = sections;
            });
    }

    private checkEditView(): void {
        if (this.route.snapshot.url?.length) {
            this.isEditView = this.route.snapshot.url[0].path === 'edit';
        }
    }

    openSectionModal(): void {
        this.sectionForm.reset();
        this.isSectionModalOpen = true;
    }

    saveSection(): void {
        this.sections.push(this.sectionForm.value);
        this.isSectionModalOpen = false;
    }

    addDish(parentSection: IMenuDetailsSection): void {
        parentSection.dishes.push({
            name: 'Test',
            ingredients: [],
            price: 2500
        } as IDish);
    }
}
