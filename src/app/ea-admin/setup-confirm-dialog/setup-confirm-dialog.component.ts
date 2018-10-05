import { Component, Inject, OnInit }                  from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { BallotService }                              from '@services/ballot.service';
import { FinalizeDialogComponent }                    from '@app/ea-admin/finalize-dialog/finalize-dialog.component';

@Component({
  selector: 'app-setup-confirm-dialog',
  templateUrl: './setup-confirm-dialog.component.html',
  styleUrls: ['./setup-confirm-dialog.component.scss']
})
export class SetupConfirmDialogComponent implements OnInit {
    public electionName: String;
    error: string;
    isSuccess: boolean;
    isLoading: boolean;
    interval: any;

    constructor(private _ballotService: BallotService,
                public _snackBar: MatSnackBar,
                public dialogRef: MatDialogRef<FinalizeDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any, ) { }

    ngOnInit() {
        this.isSuccess = false;
        this.isLoading = false;
        this.error = '';
    }

    onSetupClicked() {
        this.isLoading = true;

        this._ballotService.postBallotInfo(this.data).subscribe(
            hash => {
                setInterval(() => this.onGetStatus(hash), 2000);
            },
            error => {
                this.error = error.error.message || error.message;
                this.isLoading = false;
            }
        );
    }

    onCancelClicked(willRedirect: boolean) {
        this.dialogRef.close(willRedirect);
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
