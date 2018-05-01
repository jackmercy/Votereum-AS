import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../core/services/core.service';
import { UserService } from '../../core/services/user.service';
import { MatSnackBar } from '@angular/material';
@Component({
    selector: 'app-voting',
    templateUrl: './voting.component.html',
    styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {
    candidates: Object;
    constructor(private _coreService: CoreService,
                private _userService: UserService,
                private _router: Router,
                public snackBar: MatSnackBar) { }

    voting_result = {
        candidates: [],
        citizenID: ''
    };

    ngOnInit() {
        this._coreService.getCandidates()
            .subscribe(
                data => {
                    this.candidates = data;
                },
                error => {
                    console.log(error);
                }
            );
        this.voting_result.citizenID =  this._userService.getId();
    }

    onVoted(result: Object) {
        if (result['voted'] === true) {
            this.voting_result.candidates.push(result['candidateID']);
        }
    }

    onVoteToBlockchain() {
        /* Do check the list candidates is equal 4 or not */
        if (this.voting_result.candidates.length > 4 ) {
            this.snackBar.open('The maximum candidates you can vote for is 4 out of 6' , 'Got it', {
                duration: 30000,
            });
        } else if (this.voting_result.candidates.length === 4 ) {
           this._coreService.votingBlock(this.voting_result)
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
            });
        }
    }
}
