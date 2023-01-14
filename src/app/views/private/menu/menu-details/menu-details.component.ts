import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {ToastsService} from 'src/app/modules/toasts/toasts.service';
import {IRestObject} from 'src/app/modules/rest/rest-object';
import {mergeMap, of} from 'rxjs';


type IMenuDetailsSection = IRestObject<'menu_sections'> & {collapsed: boolean;};

@Component({
    selector: 'menu-details',
    templateUrl: './menu-details.component.html'
})
export class MenuDetailsComponent implements OnInit {
    isEditView = false;
    sections!: IMenuDetailsSection[];
    loading = true;

    isSectionModalOpen = false;
    sectionForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        description: new FormControl(null),
        sectionOrder: new FormControl(1, Validators.required),
    });

    isDishModalOpen = false;
    dishParentSection: IMenuDetailsSection | null = null;
    dishForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        description: new FormControl(null),
        price: new FormControl(0, Validators.required),
        dishOrder: new FormControl(1, Validators.required),
    });
    dishSelectedIngredients: IRestObject<'ingredients'>[] = [];
    ingredients: IRestObject<'ingredients'>[] = [];

    orderedDishes: IRestObject<'dishes'>[] = [];

    menuId: number;
    reservationId?: number;

    constructor(
        private route: ActivatedRoute,
        private restClient: RestClient,
        private toastsService: ToastsService
    ) {
        this.menuId = Number(this.route.snapshot.params['id']);
        this.reservationId = Number(this.route.snapshot.params['reservationId']) || undefined;
    }

    ngOnInit(): void {
        this.loadRestaurantIngredients();
        this.loadMenuSections();
    }

    private loadRestaurantIngredients(): void {
        this.restClient.get('menus', this.menuId)
            .pipe(
                mergeMap(({restaurant}) => {
                    if (!restaurant.id) {
                        return of(null);
                    }
                    const query = {
                        'restaurant.id': restaurant.id
                    };
                    return this.restClient.getAll('ingredient_groups', query);
                })
            )
            .subscribe((ingredientGroups) => {
                if (!ingredientGroups) {
                    return;
                }
                this.ingredients = ingredientGroups.reduce((ingredients: IRestObject<'ingredients'>[], ingredientGroup) => {
                    return ingredients.concat(ingredientGroup.ingredients);
                }, []);
            });
    }

    private loadMenuSections(): void {
        this.loading = true;

        this.restClient.getAll(
            'menu_sections',
            {'menu.id': this.menuId}
        )
            .subscribe((sections) => {
                this.sections = sections;
                this.loading = false;
            });
    }

    openSectionModal(): void {
        this.sectionForm.reset();
        this.isSectionModalOpen = true;
    }

    saveSection(): void {
        const model = this.restClient.createObject(
            'menu_sections',
            {
                ...this.sectionForm.value,
                menu: this.restClient.getIri('menus', this.menuId)
            }
        );

        this.loading = true;
        model.persist()
            .subscribe(() => {
                this.toastsService.saved();
                this.isSectionModalOpen = false;
                this.loadMenuSections();
            })
    }

    openDishModal(parentSection: IMenuDetailsSection): void {
        this.dishParentSection = parentSection;
        this.dishSelectedIngredients = [];
        this.dishForm.reset();
        this.isDishModalOpen = true;
    }

    saveDish(): void {
        if (!this.dishParentSection) {
            return;
        }

        const model = this.restClient.createObject(
            'dishes',
            {
                ...this.dishForm.value,
                menuSection: this.dishParentSection['@id'],
                ingredients: this.dishSelectedIngredients.map((ingredient) => {
                    return ingredient['@id'];
                })
            }
        );

        this.loading = true;
        model.persist()
            .subscribe(() => {
                this.toastsService.saved();
                this.dishParentSection = null;
                this.isDishModalOpen = false;
                this.loadMenuSections();
            });
    }

    orderDish(dish: IRestObject<'dishes'>): void {
        this.orderedDishes.push(dish);
    }
}
