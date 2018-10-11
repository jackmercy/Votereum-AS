import { Component, Inject, OnInit }                           from '@angular/core';
import Web3                                                    from 'web3';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WEB3 }                                                from '@core/web3-token';
import { Router }                                              from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar }          from '@angular/material';
import { AccountDialogComponent }                              from '@home/account-dialog/account-dialog.component';
import { UserService }                                         from '@services/user.service';
import { BallotService }                                       from '@services/ballot.service';

@Component({
  selector: 'app-password-entry-dialog',
  templateUrl: './password-entry-dialog.component.html',
  styleUrls: ['../account-dialog/account-dialog.component.scss']
})
export class PasswordEntryDialogComponent implements OnInit {

    passwordForm: FormGroup;
    canDisableSetupButton: boolean;
    error: string;
    isSuccess: boolean;
    isLoading: boolean;
    selectedCandidates: Array<string>;
    interval: any;


    constructor(private _formBuilder: FormBuilder,
                private _userService: UserService,
                private _ballotService: BallotService,
                private _router: Router,
                public snackBar: MatSnackBar,
                public dialogRef: MatDialogRef<AccountDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                @Inject(WEB3) private web3: Web3) { }

    ngOnInit() {
        this.passwordForm = this._formBuilder.group({
            password: ['', Validators.required]
        });
        this.canDisableSetupButton = true;
        this.isSuccess = false;
        this.isLoading = false;
        this.error = '';
    }

    onSignButtonClicked() {
        this.selectedCandidates = this.data;
        const account = {
            citizenId: this._userService.getId(),
            chainPassword: this.password.value,
            candidateIds: this.selectedCandidates
        };

        this.isLoading = true;
        this._ballotService.voteForCandidate(account).subscribe((hash) => {
            this.isLoading = false;
            setInterval(() => this.onGetStatus(hash), 2000);
        }, error => {
            console.log(error);
            this.error = error.error.message || error.message;
            this.isLoading = false;
        });
    }

    onCancelClicked(willRedirect: boolean) {
        this.dialogRef.close(willRedirect);
    }

    convertToBytes32(text) {
        return this.web3.utils.asciiToHex(text);
    }

    get password() {
        return this.passwordForm.get('password');
    }

    getErrorMessage(control: AbstractControl) {
        return control.hasError('required') ? 'Mandatory information' : '';
    }

    onGetStatus(txHash: string) {
        this._ballotService.getTxReceipt(txHash).then( (receipt) =>  {
            if (receipt) {
                const statusVal = Number(receipt['status']);

                // success
                if (statusVal === 1) {
                    this.isLoading = false;
                    this.isSuccess = true;
                    clearInterval(this.interval);
                } else if (statusVal === 0) {
                    this.isLoading = false;
                    this.error = 'Your operation has failed, please try again later!';
                    // failed
                    clearInterval(this.interval);
                }
            }
        });
    }

}
