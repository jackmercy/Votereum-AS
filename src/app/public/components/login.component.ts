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
            name: ['', Validators.required],
            id: ['', Validators.required]
        });
        // this._coreService.getAllUser().subscribe( data => console.log(data));
        this.canDisableSignInButton = false;
    }

    onLogin() {
        this.isLoggedIn = this._coreService.login(this.citizenName.value, this.citizenID.value);
        if (this.isLoggedIn) {
            this._router.navigate(['/home/']);
        } else {
            this.snackBar.open('No user is found', 'Got it', {
                duration: 5000,
            });
        }
    }

    get citizenName() {
        return this.loginFormGroup.get('name');
    }

    get citizenID() {
        return this.loginFormGroup.get('id');
    }

    getNameErrorMessage() {
        return this.citizenName.hasError('required') ? 'Mandatory information' : '';
    }

    getIdErrorMessage() {
        return this.citizenID.hasError('required') ? 'Mandatory information' : '';
    }

}
