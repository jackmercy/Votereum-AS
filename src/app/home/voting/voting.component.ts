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

@Component({
    selector: 'app-voting',
    templateUrl: './voting.component.html',
    styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {
    /* TODO: add citizen_id on vote => send token, AS check token -> citizen_id */
    mock_candidates: Array<Object> = [
        {
            'id': '1120',
            'title': 'mr',
            'firstName': 'dana',
            'lastName': 'walters',
            'picture': 'https://upload.wikimedia.org/wikipedia/commons/2/26/MacCollins.JPG',
            'quote': 'Let us sacrifice our today so that our children can have a better tomorrow.'
        },
        {
            'id': '1125',
            'title': 'mr',
            'firstName': 'dwayne',
            'lastName': 'johnson',
            'picture': 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Dwayne_Johnson_2%2C_2013.jpg',
            'quote': 'When you reach the end of your rope, tie a knot in it and hang on.'
        },
        {
            'id': '1135',
            'title': 'ms',
            'firstName': 'ellen',
            'lastName': 'DeGeneres',
            'picture': 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Ellen_DeGeneres_2011.jpg',
            'quote': 'Let us sacrifice our today so that our children can have a better tomorrow.'
        },
        {
            'id': '1130',
            'title': 'mr',
            'firstName': 'edward',
            'lastName': 'wilson',
            'picture': 'https://images.wisegeek.com/man-in-gray-suit.jpg',
            'quote': 'There is nothing permanent except change.'
        },
        {
            'id': '1140',
            'title': 'mrs',
            'firstName': 'danielle',
            'lastName': 'webb',
            'picture': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Jim_Marshall.jpg/220px-Jim_Marshall.jpg',
            'quote': 'Let us sacrifice our today so that our children can have a better tomorrow.'
        },
        {
            'id': '1145',
            'title': 'ms',
            'firstName': 'Ryan',
            'lastName': 'Reynolds',
            // tslint:disable-next-line:max-line-length
            'picture': 'https://upload.wikimedia.org/wikipedia/commons/1/14/Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg',
            'quote': 'Let us sacrifice our today so that our children can have a better tomorrow.'
        },
        {
            'id': '1145',
            'title': 'ms',
            'firstName': 'Ryan',
            'lastName': 'Reynolds',
            // tslint:disable-next-line:max-line-length
            'picture': 'https://upload.wikimedia.org/wikipedia/commons/1/14/Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg',
            'quote': 'Let us sacrifice our today so that our children can have a better tomorrow.'
        },
        {
            'id': '1145',
            'title': 'ms',
            'firstName': 'Ryan',
            'lastName': 'Reynolds',
            // tslint:disable-next-line:max-line-length
            'picture': 'https://upload.wikimedia.org/wikipedia/commons/1/14/Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg',
            'quote': 'Let us sacrifice our today so that our children can have a better tomorrow.'
        },
        {
            'id': '1145',
            'title': 'ms',
            'firstName': 'Ryan',
            'lastName': 'Reynolds',
            // tslint:disable-next-line:max-line-length
            'picture': 'https://upload.wikimedia.org/wikipedia/commons/1/14/Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg',
            'quote': 'Let us sacrifice our today so that our children can have a better tomorrow.'
        }
    ];
    candidates: Array<Object>;
    votingResult = {
        candidates: [],
        citizenID: ''
    };
    isSideBarActive: Boolean;
    hasBlockchainAccount: Boolean;
    ballotInfo: any;
    error: any;
    private selectedCandidates: Array<String>;


    constructor(private _candidateService: CandidateService,
                private _userService: UserService,
                private _ballotService: BallotService,
                private _router: Router,
                private _messageService: MessageService,
                public snackBar: MatSnackBar,
                public dialog: MatDialog) { }



    ngOnInit() {
        /*        this._candidateService.getCandidates()
                    .subscribe(
                        data => {
                            this.candidates = data;
                        },
                        error => {
                            console.log(error);
                        }
                    );*/
        this._messageService.sideBarActive$.subscribe(
            isActive => this.isSideBarActive = isActive
        );

        this.candidates = this.mock_candidates.map(candidate => {
            candidate['isSelected'] = false;
            return candidate;
        });

        this._userService.updateUserInfoLocal(this._userService.getId()).subscribe(() => {
            this.votingResult.citizenID =  this._userService.getId();
            this.hasBlockchainAccount = this._userService.hasBlockchainAccount();
        }, error => {
            this.error = error.error.message || error.message;
            console.log(this.error);
            // this.isLoading =    false;
        });

        this._ballotService.getBallotInfo().subscribe(
            result => this.ballotInfo = result['ballotInfo'],
            error => {
                this.error = error.error.message || error.message;
                console.log(this.error);
            });

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
        if (this.hasBlockchainAccount) {
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
