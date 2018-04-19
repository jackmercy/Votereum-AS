import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoreService} from '../../core/services/core.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerFormGroup: FormGroup;
    canDisableSignInButton: boolean;

    constructor(private _formBuilder: FormBuilder,
                private _coreService: CoreService,
                private _router: Router,
                public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.registerFormGroup = this._formBuilder.group({
            name: ['', Validators.required],
            citizenID: ['', Validators.required],
            password: ['', Validators.required]
        });
        // this._coreService.getAllUser().subscribe( data => console.log(data));
        this.canDisableSignInButton = false;
    }

    onRegister() {
        this._coreService.register(this.name.value, this.citizenID.value, this.password.value)
            .subscribe(
                data => {
                    if (data.message) {
                        this.snackBar.open(data.message , 'Got it', {
                            duration: 30000,
                        });
                    } else if (data) {
                        this.snackBar.open('Successfully registered!' , 'OK', {
                            duration: 3000,
                        });
                        this._router.navigate(['']);
                        console.log(data);
                    }

                },
                error => {
                    console.log(error);
                }
            );
    }

    onLogin() {
        this._router.navigate(['']);
    }

    get name() {
        return this.registerFormGroup.get('name');
    }

    get citizenID() {
        return this.registerFormGroup.get('citizenID');
    }

    get password() {
        return this.registerFormGroup.get('password');
    }

    getNameErrorMessage() {
        return this.name.hasError('required') ? 'Mandatory information' : '';
    }

    getIdErrorMessage() {
        return this.citizenID.hasError('required') ? 'Mandatory information' : '';
    }

    getPasswordErrorMessage() {
        return this.password.hasError('required') ? 'Mandatory information' : '';
    }
}
