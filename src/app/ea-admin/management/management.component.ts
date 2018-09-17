import { Component, OnInit } from '@angular/core';
import { BallotService }     from '@services/ballot.service';
import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatSnackBar }                  from '@angular/material';
import { FinalizeDialogComponent } from '../finalize-dialog/finalize-dialog.component';
import * as _ from 'lodash';

@Component({
    selector: 'app-management',
    templateUrl: './management.component.html',
    styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
    finalizeDialogRef: MatDialogRef<FinalizeDialogComponent>;
    ballotInfo: any;
    startPhase: Object = {
        key: 'startRegPhase',
        label: 'Start reg day',
        isLoading: false
    };
    phases: Array<Object> = [
        {
            key: 'startRegPhase',
            label: 'Start reg day',
            isLoading: false
        },
        {
            key: 'endRegPhase',
            label: 'End reg day',
            isLoading: false,
        },
        {
            key: 'startVotingPhase',
            label: 'Start voting day',
            isLoading: false,
        },
        {
            key: 'endVotingPhase',
            label: 'End voting day',
            isLoading: false,
        }
    ];
    ballotInfoLabels: Object = {
        ballotName: 'Ballot name',
        isFinalized: 'Finalized',
        registeredVoterCount: 'Number of registered citizen',
        votedVoterCount: 'Number of voted citizen',
        fundedVoterCount: 'Number of funded citizen',
        startRegPhase: 'Start Register Phase at',
        endRegPhase: 'End Register Phase at',
        startVotingPhase: 'Start Voting Phase at',
        endVotingPhase: 'End Register Phase at',
        storedAmount: 'Current ballot\'s fund'
    };
    interval: any;

    constructor(private _ballotService: BallotService,
                public _snackBar: MatSnackBar,
                public dialog: MatDialog) { }

    ngOnInit() {
        this._ballotService.getBallotInfo().subscribe(
            data =>
                this.ballotInfo = data);
        this.interval = false;
    }

    // Disable when now is greater than fetched time
    canDisableButton(phrase: string) {
        return Date.now() / 1000 > this.ballotInfo[phrase];
    }

    onStartPhaseClicked() {
        this.finalizeDialogRef = this.dialog.open(FinalizeDialogComponent, {
            width: 'fit-content',
            disableClose: false
        });
        this.finalizeDialogRef.componentInstance.electionName = this.ballotInfo['ballotName'];

        this.finalizeDialogRef.afterClosed().subscribe(
            result => {
                if (result) {
                    // handle result => start voting phase
                    this.resetTime(this.phases[2]['key']);
                }
            },
            error => {
                const msg = error.error.message;
                this._snackBar.open(msg , 'OK', {
                    duration: 3000,
                });
            }
        );
    }

    resetTime(_phase: string) {
        const phase = _.find(this.phases, { key: _phase });

        if (!this.interval) {
            phase.isLoading = true;


            this._ballotService.resetTime(_phase).subscribe(data => {
                this.interval = setInterval(() => this.onGetStatus(data, _phase), 12000);
            });
        } else {
            const snackBar = this._snackBar.open(
                'Please wait until the current operation finishes!',
                'OK', {
                    duration: 2000,
                });
        }
    }

    getLabel(key: string) {
        return this.ballotInfoLabels[key];
    }

    onGetStatus(txHash: string, _phase: string) {
        const phase = _.find(this.phases, { key: _phase });

        this._ballotService.getTxReceipt(txHash).then( (receipt) =>  {
            if (receipt) {
                const statusVal = Number(receipt['status']);

                if (statusVal === 1) {
                    phase.isLoading = false;
                    clearInterval(this.interval);
                    location.reload();
                } else if (statusVal === 0) {
                    const snackBar = this._snackBar.open(
                        'Your operation has failed. Please try again',
                        'OK', {
                            duration: 5000,
                        });

                    this.phases[_phase].isLoading = false;
                    clearInterval(this.interval);
                }
            }
        });
    }

}
