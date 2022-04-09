import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

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

        this.userService.tryLogin(
            username,
            password
        )
            .subscribe()
    }
}
