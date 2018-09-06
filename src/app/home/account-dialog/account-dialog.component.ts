import { Component, Inject, OnInit }                           from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                                              from '@angular/router';
import { publicModuleStrings }                                 from '@config/string.config';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar }          from '@angular/material';
import { UserService }                                         from '@services/user.service';
import Web3                                                    from 'web3';
import { WEB3 }                                                from '@core/web3-token';


@Component({
    selector: 'app-account-dialog',
    templateUrl: './account-dialog.component.html',
    styleUrls: ['./account-dialog.component.scss']
})
export class AccountDialogComponent implements OnInit {

    pageStrings: any;
    accountForm: FormGroup;
    canDisableSetupButton: boolean;
    error: string;
    isSuccess: boolean;
    isLoading: boolean;


    constructor(private _formBuilder: FormBuilder,
                private _userService: UserService,
                private _router: Router,
                public snackBar: MatSnackBar,
                public dialogRef: MatDialogRef<AccountDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                @Inject(WEB3) private web3: Web3) { }

    ngOnInit() {
        this.accountForm = this._formBuilder.group({
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            checked: [false]
        });
        this.canDisableSetupButton = true;
        this.isSuccess = false;
        this.isLoading = false;
        this.error = '';
    }

    onSetupClicked() {
        this.isLoading = true;
        this.web3.eth.personal.newAccount(this.password.value).then((_address) => {
            const account = {
                address: _address,
                password: this.password.value,
                citizenId: this._userService.getId()
            };
            this._userService.setupChainAccount(account)
            .subscribe(() => {
                    this._userService.updateUserInfoLocal(this._userService.getId()).subscribe(_ => {
                        this.isSuccess = true;
                        this.isLoading = false;
                    }, error => {
                        this.error = error.error.message;
                        this.isLoading =    false;
                    });
                },
                (error) => {
                    this.error = error.error.message;
                    this.isLoading =    false;
                }
            );
        }).catch((error) => {
            this.error = error.error.message;
            this.isLoading = false;
        });
    }

    onCancelClicked(willRedirect: boolean) {
        this.dialogRef.close(willRedirect);
    }


    get password() {
        return this.accountForm.get('password');
    }

    get confirmPassword() {
        return this.accountForm.get('confirmPassword');
    }

    getErrorMessage(control: AbstractControl) {
        return control.hasError('required') ? 'Mandatory information' : '';
    }
}
