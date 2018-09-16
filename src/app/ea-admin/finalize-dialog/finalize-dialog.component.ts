import { Component, Inject, OnInit }                           from '@angular/core';
import { Router }                                              from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar }          from '@angular/material';
import { BallotService }                                         from '@services/ballot.service';

@Component({
    selector: 'app-finalize-dialog',
    templateUrl: './finalize-dialog.component.html',
    styleUrls: ['./finalize-dialog.component.scss']
})
export class FinalizeDialogComponent implements OnInit {
    public electionName: String;
    error: string;
    isSuccess: boolean;
    isLoading: boolean;
    pharse: String = 'finalize';

    constructor(private _ballotService: BallotService,
                public snackBar: MatSnackBar,
                public dialogRef: MatDialogRef<FinalizeDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.isSuccess = false;
        this.isLoading = false;
        this.error = '';
    }

    onFinalizeClicked() {
        this.isLoading = true;

        this._ballotService.postFinalizeBallot(this.pharse).subscribe(
            result => {
                this.isSuccess = true;
                this.isLoading = false;
            },
            error => {
                this.error = error.error.message;
                this.isLoading = false;
            }
        );
    }

    onCancelClicked(willRedirect: boolean) {
        this.dialogRef.close(willRedirect);
    }

}
