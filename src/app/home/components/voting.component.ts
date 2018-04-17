import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../core/services/core.service';

@Component({
    selector: 'app-voting',
    templateUrl: './voting.component.html',
    styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {
    candidates: Object;
    constructor(private _coreService: CoreService) { }

    voting_result = {
        candidates: []
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
    }

    onVoted(result: Object) {
        if (result['voted'] === true) {
            this.voting_result.candidates.push(result['candidateID']);
        }
    }

    onVoteToBlockchain() {
        /* Do check the list candidates is equal 4 or not */
        this._coreService.votingBlock(this.voting_result)
            .subscribe( hash => {
                console.log(hash);
            });
    }
}
