import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable({
    providedIn: 'root'
})
export class BallotService {

    constructor() { }

    getBallotInfo(): Object {
        return Observable.of({
            'ballotName': 'President Election',
            'startRegPhase': '1543050000',
            'endRegPhase': '1543080000',
            'startVotingPhase': '1540370700',
            'endVotingPhase': '1543049100',
            'isFinalized': false,
            'registeredVoterCount': '0',
            'votedVoterCount': '0'
        });
    }
}
