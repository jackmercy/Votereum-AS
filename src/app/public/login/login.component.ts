import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CoreService } from '../../core/services/core.service';
import { MatSnackBar } from '@angular/material';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginFormGroup: FormGroup;
    canDisableSignInButton: boolean;
    isLoggedIn: any;

    constructor(private _formBuilder: FormBuilder,
                private _coreService: CoreService,
                private _router: Router,
                public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.loginFormGroup = this._formBuilder.group({
            citizendID: ['', Validators.required],
            password: ['', Validators.required]
        });
        // this._coreService.getAllUser().subscribe( data => console.log(data));
        this.canDisableSignInButton = false;
    }

    onLogin() {
        this._coreService.login(this.citizenID.value, this.password.value)
            .subscribe(
                data => {
                    if (data.message) {
                        this.snackBar.open(data.message , 'Got it', {
                            duration: 3000,
                        });
                    } else if (data.name && data.id) {
                        this._router.navigate(['/home/voting']);
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
