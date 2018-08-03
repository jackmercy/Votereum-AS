import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { CandidateService }  from '@services/candidate.service';
import { UserService }       from '@services/user.service';
import { ContractService }   from '@services/contract.service';
import { MatSnackBar }       from '@angular/material';
@Component({
    selector: 'app-voting',
    templateUrl: './voting.component.html',
    styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {
    candidates: Object;
    constructor(private _candidateService: CandidateService,
                private _userService: UserService,
                private _contractService: ContractService,
                private _router: Router,
                public snackBar: MatSnackBar) { }

    voting_result = {
        candidates: [],
        citizenID: ''
    };

    ngOnInit() {
        this._candidateService.getCandidates()
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
            console.log(this.voting_result);
        } else if (result['voted'] === false) {
            const index = this.voting_result.candidates.indexOf(result['candidateID']);
            if (index > -1) {
                this.voting_result.candidates.splice(index, 1);
            }
            console.log(this.voting_result);
        }
    }

    onVoteToBlockchain() {
        /* Do check the list candidates is equal 4 or not */
        if (this.voting_result.candidates.length > 4 && this.voting_result.candidates.length <= 6) {
            this.snackBar.open('The maximum candidates you can vote for are 4 out of 6' , 'Got it', {
                duration: 30000,
            });
        } else if (this.voting_result.candidates.length <= 4 ) {
           this._contractService.votingBlock(this.voting_result)
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
