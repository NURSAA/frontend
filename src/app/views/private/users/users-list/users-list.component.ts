import {Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {ToastsService} from 'src/app/modules/toasts/toasts.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IUser} from 'src/app/_types/user';
import {ROLES, ROLES_OPTIONS} from 'src/app/modules/privileges/interfaces';
import {IRestObject} from 'src/app/modules/rest/rest-object';


@Component({
    selector: 'users-list',
    templateUrl: './users-list.component.html'
})
export class UsersListComponent {
    reload$: Observable<void>;

    isAddModalOpen = false;
    userAddForm = new FormGroup({
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, Validators.required),
    });

    isEditModalOpen = false;
    userEditForm = new FormGroup({
        id: new FormControl(null),
        role: new FormControl(null, Validators.required),
    });

    userRoles = ROLES_OPTIONS;


    private reloadSubject = new Subject<void>();

    constructor(
        private restClient: RestClient,
        private toastService: ToastsService,
    ) {
        this.reload$ = this.reloadSubject.asObservable();
    }

    addUser(): void {
        this.userAddForm.reset();
        this.isAddModalOpen = true;
    }

    editUser(user: IUser): void {
        this.isEditModalOpen = true;
        this.userEditForm.reset({
            id: user.id,
            role: user.role
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
            model = this.restClient.createObject<string, {id: number; roles: string[];}>(
                'users',
                {
                    id: this.userEditForm.value.id,
                    roles: [this.userEditForm.value['role']]
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
}
