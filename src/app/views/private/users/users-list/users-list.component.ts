import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable, Subject, takeUntil} from 'rxjs';
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {ToastsService} from 'src/app/modules/toasts/toasts.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IUser} from 'src/app/_types/user';
import {ROLES, ROLES_OPTIONS} from 'src/app/modules/privileges/interfaces';
import {IRestObject} from 'src/app/modules/rest/rest-object';
import {IAppInputOptions} from 'src/app/modules/app-forms/app-input/app-input.component';


@Component({
    selector: 'users-list',
    templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit, OnDestroy {
    reload$: Observable<void>;

    isAddModalOpen = false;
    userAddForm = new FormGroup({
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, Validators.required),
    });

    isEditModalOpen = false;
    editedUser?: IUser;
    userEditForm = new FormGroup({
        id: new FormControl(null),
        email: new FormControl({value: null, disabled: true}),
        role: new FormControl(null, Validators.required),
    });

    userRoles = ROLES_OPTIONS;
    restaurantOptions?: IAppInputOptions[];

    private reloadSubject = new Subject<void>();
    private _destroy$ = new Subject<void>();

    constructor(
        private restClient: RestClient,
        private toastService: ToastsService,
    ) {
        this.reload$ = this.reloadSubject.asObservable();
    }

    ngOnInit(): void {
        this.getRestaurantOptions();
        this.assignRestaurantToUser();
    }

    private getRestaurantOptions(): void {
        this.restClient.getAll('restaurants')
            .pipe(
                map((restaurants) => {
                    return restaurants.map((restaurant) => {
                        return {
                            value: restaurant['@id'],
                            label: restaurant['name'],
                        }
                    });
                })
            )
            .subscribe((options) => {
                this.restaurantOptions = options;
            })
    }

    private assignRestaurantToUser(): void {
        const roleControl = this.userEditForm.get('role');
        if (!roleControl) {
            return;
        }

        roleControl.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe((value) => {
                const controlName = 'restaurant';
                console.log(value);
                if (value === ROLES.COOK) {
                    const restaurantControl = new FormControl(this.editedUser?.restaurant, Validators.required);
                    this.userEditForm.addControl(controlName, restaurantControl);
                    return;
                }

                this.userEditForm.removeControl(controlName);
            });
    }

    addUser(): void {
        this.userAddForm.reset();
        this.isAddModalOpen = true;
    }

    editUser(user: IUser): void {
        this.isEditModalOpen = true;
        this.editedUser = user;
        this.userEditForm.reset({
            id: user.id,
            email: user.email,
            role: user.role,
            restaurant: user.restaurant
        });
    }

    saveUser(): void {
        let model: IRestObject<string>;
        if (this.isAddModalOpen) {
            model = this.restClient.createObject(
                'register',
                this.userAddForm.value
            );
        } else {
            const {id, role, restaurant} = this.userEditForm.value;
            model = this.restClient.createObject<string, Partial<IUser>>(
                'users',
                {
                    id,
                    role,
                    restaurant: restaurant || null
                }
            );
        }

        model.persist()
            .subscribe(() => {
                this.toastService.saved();
                this.isAddModalOpen = false;
                this.isEditModalOpen = false;
                this.reloadSubject.next();
            });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
