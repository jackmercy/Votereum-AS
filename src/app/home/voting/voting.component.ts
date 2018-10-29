import { Component, OnInit }                      from '@angular/core';
import { Router }                                 from '@angular/router';
import { CandidateService }                       from '@services/candidate.service';
import { UserService }                            from '@services/user.service';
import { MatSnackBar }                            from '@angular/material';
import { MessageService }                         from '@services/message.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AccountDialogComponent }                 from '@home/account-dialog/account-dialog.component';
import { BallotService }                          from '@services/ballot.service';
import * as _                                     from 'lodash';
import { PasswordEntryDialogComponent }           from '@home/password-entry-dialog/password-entry-dialog.component';
import { map }                                    from 'rxjs/operators';
import { forkJoin }           from 'rxjs/observable/forkJoin';

@Component({
    selector: 'app-voting',
    templateUrl: './voting.component.html',
    styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {
    /* TODO: add citizen_id on vote => send token, AS check token -> citizen_id */
    candidates: any;
    citizenId: string;
    votingResult = {
        candidates: [],
        citizenID: ''
    };
    isSideBarActive: Boolean;
    hasBlockchainAccount: Boolean;
    isVote: Boolean;
    ballotInfo: any;
    error: any;
    selectedCandidates: Array<String>;
    canVote: Boolean;
    now: any;
    phaseInfo: any;


    constructor(private _candidateService: CandidateService,
                private _userService: UserService,
                private _ballotService: BallotService,
                private _router: Router,
                private _messageService: MessageService,
                public snackBar: MatSnackBar,
                public dialog: MatDialog) { }
    ngOnInit() {
        this.now = Date.now() / 1000;
        this.citizenId = this._userService.getId();
        this._messageService.sideBarActive$.subscribe(
            isActive => this.isSideBarActive = isActive
        );

        const observable = forkJoin(
            this._ballotService.getSelectedCandidates(),
            this._userService.updateUserInfoLocal(this.citizenId),
            this._ballotService.getBallotInfo()
        );
        this._userService.getVoterAddress(this.citizenId).subscribe(
            value => console.log(value),
            error => console.log(error));

        observable.subscribe(result => {

            // Handle data of getSelectedCandidates
            this.candidates = result[0].map(
                candidate => {
                    candidate['isSelected'] = false;
                    return candidate;
                }
            );

            // Handle data of updateUserInfoLocal
            this.hasBlockchainAccount = this._userService.hasBlockchainAccount();

            // Handle data of getBallotInfo
            this.ballotInfo = result[2]['ballotInfo'];
            this.phaseInfo = result[2]['phaseInfo'];
            console.log(result[2]);

            // Check canVote
            if (this.hasBlockchainAccount) {
                this._userService.getVoterAddress(this.citizenId).subscribe(
                    address => {
                        this._ballotService.postHasRightToVote(address['address']).subscribe(
                            data => {
                                const hasRight = data['hasRight'];
                                const now = Date.now() / 1000;

                                if (
                                    hasRight &&
                                    this.hasBlockchainAccount &&
                                    now > Number(this.phaseInfo['startVotingPhase']) &&
                                    now < Number(this.phaseInfo['endVotingPhase'])
                                ) {
                                    this.canVote = true;
                                } else {
                                    this.canVote = false;
                                }
                            },
                            error => console.log(error));
                    });
            } else {
                this.canVote = this.hasBlockchainAccount;
            }


        }, error =>
            console.log(error));

        /*
                this._ballotService.getSelectedCandidates().subscribe(
                    data => {
                        data.map(
                            candidate => {
                                candidate['isSelected'] = false;
                                return candidate;
                            }
                        );
                        this.candidates = data;
                    }
                );

                this._userService.updateUserInfoLocal(this._userService.getId()).subscribe(() => {
                    this.votingResult.citizenID =  this._userService.getId();

                    // Check if user can vote
                    this.hasBlockchainAccount = this._userService.hasBlockchainAccount();
                    this.isVote = this._userService.isVoted();
                }, error => {
                    this.error = error.error.message || error.message || error;
                    console.log(this.error);
                    // this.isLoading =    false;
                });

                this._ballotService.getBallotInfo().subscribe(
                    result => this.ballotInfo = result['ballotInfo'],
                    error => {
                        this.error = error.error.message || error.message;
                        console.log(this.error);
                    });
        */

    }

    onVoteToBlockchain() {
        this.selectedCandidates = _.filter(this.candidates, 'isSelected').map(candidate => candidate['id']);
        /* Do check the list candidates is equal 4 or not */
        if (this.selectedCandidates.length < 1 || this.selectedCandidates.length > this.ballotInfo['limitCandidate']) {
            this.snackBar.open('The maximum candidates you can vote for are ' +
                this.ballotInfo['limitCandidate'] +
                'out of ' + this.candidates.length , 'Got it', {
                duration: 30000,
            });
        } else {
            const signDialogRef = this.dialog.open(PasswordEntryDialogComponent, {
                width: 'fit-content',
                data: this.selectedCandidates
            });

        }
    }

    toggleItemSelection(item: Object) {
        item['isSelected'] = !item['isSelected'];
    }

    onCandidateSelected(candidate: Object) {
        if (this.hasBlockchainAccount && !this.isVote) {
            this.toggleItemSelection(candidate);
        }
    }

    onSetupAccountClicked() {
        const dialogRef = this.dialog.open(AccountDialogComponent, {
            width: 'fit-content',
        });

        dialogRef.afterClosed().subscribe(
            result => {
                if (result) {
                    location.reload();
                }
            },
            error => {
                const msg = error.error.message;
                this.snackBar.open(msg , 'Got it', {
                    duration: 3000,
                });
            }
        );
    }

}
