import { Inject, Injectable } from '@angular/core';
import { Observable }         from 'rxjs/Observable';
import { HttpClient }         from '@angular/common/http';
import { URI_CONFIG }         from '@config/uri.config';
import { httpOptions }        from '@config/string.config';
import { map, retry }         from 'rxjs/operators';
import { forkJoin }           from 'rxjs/observable/forkJoin';
import { observable }         from 'rxjs/internal-compatibility';
import { WEB3 }               from '@core/web3-token';
import   Web3                 from 'web3';
import { MessageService }     from '@services/message.service';


@Injectable({
    providedIn: 'root'
})
export class BallotService {

    constructor(private _http: HttpClient,
                private _messageService: MessageService,
                @Inject(WEB3) private web3: Web3) {
    }
    /*
    - GET: [/api/ballot]
    - Response: // not yet updated
    {
        "ballotName": "President Election",
        "startRegPhase": "1543050000",
        "endRegPhase": "1543080000",
        "startVotingPhase": "1540370700",
        "endVotingPhase": "1543049100",
        "isFinalized": false,
        "registeredVoterCount": "0",
        "votedVoterCount": "0"
    }
    */
    getBallotInfo(): Observable<Object> {
        return this._http.get(URI_CONFIG.BASE_BALLOT_API + '/', { headers: this._messageService.getHttpOptions() });
    }

    getCandidateIds(): Observable<any> {
        return this._http.get(URI_CONFIG.BASE_BALLOT_API + URI_CONFIG.SELECTED_CANDIDATES,
            { headers: this._messageService.getHttpOptions() });
    }

    getSelectedCandidates(): Observable<any> {
        return this._http.get(URI_CONFIG.BASE_BALLOT_API + URI_CONFIG.SELECTED_CANDIDATES,
            { headers: this._messageService.getHttpOptions() });
    }

    getDisplayPhases(): Observable<any> {
        return this._http.get(URI_CONFIG.BASE_BALLOT_API + URI_CONFIG.DISPLAY_PHASES,
            { headers: this._messageService.getHttpOptions() });
    }

    getBallotPhases(): Observable<any> {
        return this._http.get(URI_CONFIG.BASE_BALLOT_API + URI_CONFIG.BALLOT_PHASES,
            { headers: this._messageService.getHttpOptions() });
    }

    /*
    - GET: [/api/ballot]
    - Response: not yet updated
    {
        "ballotName": "President Election",
        "startRegPhase": "1543050000",
        "endRegPhase": "1543080000",
        "startVotingPhase": "1540370700",
        "endVotingPhase": "1543049100",
        "isFinalized": false,
        "registeredVoterCount": "0",
        "votedVoterCount": "0"
    }
    */
    getBallotResult(): Observable<any> {
        return new Observable(( _observable ) => {
            const observables: Array<Observable<Object>> = [];

            this.getCandidateIds().subscribe(data => {
                const candidateIds: Array<Object> = data;

                candidateIds.map(_candidateId =>
                    observables.push(
                        // http call for candidate result
                        this._http.post(
                            URI_CONFIG.BASE_BALLOT_API + '/result',
                            JSON.stringify({ candidateID: _candidateId['id'] }),
                            { headers: this._messageService.getHttpOptions() }
                        ).pipe(
                            map(_result => {
                                const candidateResult = {
                                    name: `${_candidateId['firstName']} ${_candidateId['lastName']}`,
                                    value: _result['voteCount']
                                };
                                return candidateResult;
                            })
                        )
                    )
                );

                forkJoin(...observables).subscribe(result => _observable.next(result));
            }, error => _observable.error(error));

            return {unsubscribe() {}};
        });
    }

    postBallotInfo(ballotInfo: Object): Observable<any> {
        return this._http.post(URI_CONFIG.BASE_BALLOT_API + '/',
            JSON.stringify(ballotInfo),
            { headers: this._messageService.getHttpOptions() });
    }

    resetTime(_phrase: string): Observable<any> {
        return this._http.post(URI_CONFIG.BASE_BALLOT_API + '/resetTime',
            JSON.stringify({ phrase: _phrase }),
            { headers: this._messageService.getHttpOptions() });
    }

    getTxReceipt(txHash: string): Promise<any> {
        return this.web3.eth.getTransactionReceipt(txHash);
    }

    postFinalizeBallot(_phrase: String): Observable<any> {
        return this._http.post(URI_CONFIG.BASE_BALLOT_API + URI_CONFIG.FINALIZE_BALLOT,
                JSON.stringify({phrase: _phrase}),
                { headers: this._messageService.getHttpOptions() }
            );
    }

    giveRigthToVote(address: String): Observable<any> {
        return this._http.post(
            URI_CONFIG.BASE_BLOCKCHAIN_API + '/giveRight',
            JSON.stringify({voterAddress: address}),
            { headers: this._messageService.getHttpOptions() });
    }

    voteForCandidate(payload: Object): Observable<any> {
        return this._http.post(
            URI_CONFIG.BASE_BALLOT_API + '/vote',
            JSON.stringify(payload),
            { headers: this._messageService.getHttpOptions() });
    }

    /*
    - POST: [/api/ballot/hasRight]
    - req.body:
    {
        "voterAddress": "0x11a4c82c1e5CBE015c6d09df2F30fD1668a5E410"
    }
    - Response:
    {
        "hasRight": true
    }
    */
    postHasRightToVote(_voterAddress: String): Observable<any> {
        return this._http.post(
            URI_CONFIG.BASE_BALLOT_API + '/hasRight',
            JSON.stringify({voterAddress: _voterAddress}),
            { headers: this._messageService.getHttpOptions() });
    }
}

