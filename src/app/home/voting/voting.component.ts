import { Component, OnInit }                      from '@angular/core';
import { Router }                                 from '@angular/router';
import { CandidateService }                       from '@services/candidate.service';
import { UserService }                            from '@services/user.service';
import { ContractService }                        from '@services/contract.service';
import { MatSnackBar }                            from '@angular/material';
import * as _                                     from 'lodash';
import { MessageService }                         from '@services/message.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AccountDialogComponent }                 from '@home/account-dialog/account-dialog.component';

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


    constructor(private _candidateService: CandidateService,
                private _userService: UserService,
                private _contractService: ContractService,
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

        this.votingResult.citizenID =  this._userService.getId();
        this.hasBlockchainAccount = false;
    }

    onVoteToBlockchain() {
        this.votingResult.candidates = _.filter(this.candidates, 'isSelected').map(candidate => candidate['id']);
        /* Do check the list candidates is equal 4 or not */
        if (this.votingResult.candidates.length > 4 && this.votingResult.candidates.length <= 6) {
            this.snackBar.open('The maximum candidates you can vote for are 4 out of 6' , 'Got it', {
                duration: 30000,
            });
        } else if (this.votingResult.candidates.length <= 4 ) {
            console.log(this.votingResult);
/*           this._contractService.votingBlock(this.votingResult)
            .subscribe( result => {
                if (result.hash) {
                    this._userService.updateUserHash(result.hash);
                    this._userService.updateUserVote(result.isVote);
                    this._router.navigate(['/home/vote-result']);
                } else if (result.message) {
                    this.snackBar.open(result.message , 'OK', {
                        duration: 30000,
                    });
                }
            });*/
        }
    }

    toggleItemSelection(item: Object) {
        item['isSelected'] = !item['isSelected'];
    }

    onCandidateSelected(candidate: Object) {
        this.toggleItemSelection(candidate);
    }

    onSetupAccountClicked() {
        const dialogRef = this.dialog.open(AccountDialogComponent, {
            width: 'fit-content',
        });

        dialogRef.afterClosed().subscribe(result => {

        });
    }

}
