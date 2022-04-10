import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;

    constructor(
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, Validators.required),
        })
    }

    login(): void {
        const {username, password} = this.loginForm.value;

        this.loading = true;
        this.userService.tryLogin(
            username,
            password
        )
            .pipe(
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe({
                error: () => {
                    this.loginForm.reset();
                }
            })
    }
}
