import { Component, Inject, OnInit }                           from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    citizenId: string;
    hash: string;

    constructor(private _formBuilder: FormBuilder,
                private _userService: UserService,
                private _ballotService: BallotService,
                private _router: Router,
                public snackBar: MatSnackBar,
                public dialogRef: MatDialogRef<AccountDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

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
        this.citizenId = this._userService.getId();
        this.isLoading = true;
        this._ballotService.voteForCandidate(account).subscribe((hash) => {
            /* TODO: Vote succcess -> update current user infomation */
            this._userService.updateLocalIsVoted(hash);
            this.isLoading = false;
            this.isSuccess = true;
            this.hash = hash['hash'];
        }, error => {
            console.log(error);
            this.error = error.error.message || error.message;
            this.isLoading = false;
        });
    }

    onCancelClicked(willRedirect: boolean) {
        if (willRedirect === true) {
            /* console.log(this.hash); */
            this.dialogRef.close(this.hash);
        } else {
            this.dialogRef.close('');
        }
    }

    get password() {
        return this.passwordForm.get('password');
    }

    getErrorMessage(control: AbstractControl) {
        return control.hasError('required') ? 'Mandatory information' : '';
    }

    onGetStatus(txHash: string) {
        /* this._ballotService.getTxReceipt(txHash).then( (receipt) =>  {
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
        }); */
    }

}
