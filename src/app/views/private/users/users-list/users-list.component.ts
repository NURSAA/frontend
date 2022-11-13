import {Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {ToastsService} from 'src/app/modules/toasts/toasts.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'users-list',
    templateUrl: './users-list.component.html'
})
export class UsersListComponent {
    reload$: Observable<void>;

    isUserModalOpen = false;
    userForm = new FormGroup({
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, Validators.required),
    });

    private reloadSubject = new Subject<void>();

    constructor(
        private restClient: RestClient,
        private toastService: ToastsService,
    ) {
        this.reload$ = this.reloadSubject.asObservable();
    }

    addUser(): void {
        this.userForm.reset();
        this.isUserModalOpen = true;
    }

    saveUser(): void {
        const model = this.restClient.createObject(
            'register',
            this.userForm.value
        );

        model.persist()
            .subscribe(() => {
                this.toastService.saved();
                this.isUserModalOpen = false;
                this.reloadSubject.next();
            });
    }
}
