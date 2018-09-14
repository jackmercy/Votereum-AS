import { Component, OnInit } from '@angular/core';
import { BallotService }     from '@services/ballot.service';

@Component({
    selector: 'app-management',
    templateUrl: './management.component.html',
    styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
    ballotInfo: any;
    phase: Object = {
        startRegPhase: 'Start reg day',
        endRegPhase: 'End reg day',
        startVotingPhase: 'Start voting day',
        endVotingPhase: 'End voting day',
    };
    ballotInfoLabels: Object = {
        ballotName: 'Ballot name',
        startRegPhase: 'Start Register Phase at',
        endRegPhase: 'End Register Phase at',
        startVotingPhase: 'Start Voting Phase at',
        endVotingPhase: 'End Register Phase at',
        isFinalized: 'Status',
        registeredVoterCount: 'Number of registered citizen',
        votedVoterCount: 'Number of voted citizen',
        fundedVoterCount: 'Number of funded citizen',
        storedAmount: 'Current ballot\'s fund'
    };

    constructor(private _ballotService: BallotService) { }

    ngOnInit() {
        this._ballotService.getBallotInfo().subscribe(
            data =>
                this.ballotInfo = data);
    }

// Disable when now is greater than fetched time
    canDisableButton(phrase: string) {
        return Date.now() / 1000 > this.ballotInfo[phrase];
    }

    resetTime(phrase: string) {
        this._ballotService.resetTime(phrase).subscribe(data => {
            console.log(data);
        });
    }

}
