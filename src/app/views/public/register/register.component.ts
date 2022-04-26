import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestClient} from 'src/app/modules/rest/rest-client.service';
import {finalize} from 'rxjs';
import {Router} from '@angular/router';
import {ToastsService} from 'src/app/modules/toasts/toasts.service';


@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    loading = false;

    constructor(
        private restClient: RestClient,
        private router: Router,
        private toastService: ToastsService
    ) {
    }

    ngOnInit(): void {
        this.registerForm = new FormGroup({
            email: new FormControl(null, [Validators.email, Validators.required]),
            password: new FormControl(null, Validators.required)
        });
    }

    register(): void {
        this.loading = true;
        this.restClient.post('register', this.registerForm.value)
            .pipe(
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe({
                next: () => {
                    this.router.navigate(['/login']);
                },
                error: () => {
                    this.registerForm.reset();
                    this.toastService.pushError();
                }
            })
    }
}
