import { Component, Inject, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators }         from '@angular/forms';
import { Router }                                     from '@angular/router';
import { publicModuleStrings }                        from '@config/string.config';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { UserService }                                from '@services/user.service';


@Component({
    selector: 'app-account-dialog',
    templateUrl: './account-dialog.component.html',
    styleUrls: ['./account-dialog.component.scss']
})
export class AccountDialogComponent implements OnInit {

    pageStrings: any;
    accountForm: FormGroup;
    canDisableSetupButton: boolean;
    isLoggedIn: any;

    constructor(private _formBuilder: FormBuilder,
                private _userService: UserService,
                private _router: Router,
                public snackBar: MatSnackBar,
                public dialogRef: MatDialogRef<AccountDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.accountForm = this._formBuilder.group({
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        });
        this.canDisableSetupButton = false;
    }

    onSetupClicked() {
        this._userService.login(this.citizenID.value, this.confirmPassword.value)
        .subscribe(
            data => {
                if (data.message) {
                    this.snackBar.open(data.message , 'Got it', {
                        duration: 3000,
                    });
                } else if (data.token) {
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
        return this.accountForm.get('password');
    }

    get confirmPassword() {
        return this.accountForm.get('confirmPassword');
    }

    getIdErrorMessage() {
        return this.citizenID.hasError('required') ? 'Mandatory information' : '';
    }

    getconfirmPasswordErrorMessage() {
        return this.confirmPassword.hasError('required') ? 'Mandatory information' : '';
    }


}
