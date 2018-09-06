import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { JwtHelperService }  from '@auth0/angular-jwt';

import { UserService } from '@services/user.service';
import { MatSnackBar } from '@angular/material';

import { FormBuilder, FormGroup, Validators }  from '@angular/forms';
import { publicModuleStrings, roleConfig }     from '@config/string.config';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    pageStrings: any;
    loginFormGroup: FormGroup;
    canDisableSignInButton: boolean;
    isLoggedIn: any;
    helper = new JwtHelperService();

    constructor(private _formBuilder: FormBuilder,
                private _userService: UserService,
                private _router: Router,
                public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.pageStrings = publicModuleStrings;
        this.loginFormGroup = this._formBuilder.group({
            citizendID: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.canDisableSignInButton = false;
    }

    onLogin() {
        this._userService.login(this.citizenID.value, this.password.value)
            .subscribe(
                data => {
                    if (data.message) {
                        this.snackBar.open(data.message , 'Got it', {
                            duration: 3000,
                        });
                    } else if (data.token) {
                        /* Navigate base on role */
                        const decodedToken = this.helper.decodeToken(data.token);
                        if (decodedToken.role === roleConfig.CITIZEN) {
                            this._router.navigate(['/home/voting']);
                        } else if (decodedToken.role === roleConfig.EA) {
                            this._router.navigate(['/ea-admin/management']);
                        } else if (decodedToken.role === roleConfig.RA) {
                            this._router.navigate(['/reg-admin/voter']);
                        }
                    }

                },
                error => {
                    console.log(error);
                }
            );
    }

    onSignUp() {
        this._router.navigate(['/register']);
    }

    get citizenID() {
        return this.loginFormGroup.get('citizendID');
    }

    get password() {
        return this.loginFormGroup.get('password');
    }

    getIdErrorMessage() {
        return this.citizenID.hasError('required') ? 'Mandatory information' : '';
    }

    getPasswordErrorMessage() {
        return this.password.hasError('required') ? 'Mandatory information' : '';
    }

}
