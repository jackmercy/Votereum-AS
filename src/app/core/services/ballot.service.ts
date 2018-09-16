import { Inject, Injectable } from '@angular/core';
import { Observable }         from 'rxjs/Observable';
import { HttpClient }         from '@angular/common/http';
import { URI_CONFIG }         from '@config/uri.config';
import { httpOptions }        from '@config/string.config';
import { map }                from 'rxjs/operators';
import { forkJoin }           from 'rxjs/observable/forkJoin';
import { observable }         from 'rxjs/internal-compatibility';
import { WEB3 }               from '@core/web3-token';
import Web3                   from 'web3';
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
    - Response:
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
        return this._http.get(URI_CONFIG.BASE_BALLOT_API + '/candidate', { headers: this._messageService.getHttpOptions() });
    }

    getBallotResult(): Observable<any> {
        return new Observable(( _observable ) => {
            const observables: Array<Observable<Object>> = [];

            this.getCandidateIds().subscribe(data => {
                const candidateIds: Array<string> = data['candidateIds'];

                candidateIds.map(_candidateId =>
                    observables.push(
                        this._http.post(
                            URI_CONFIG.BASE_BALLOT_API + '/candidate/result',
                            JSON.stringify({ candidateId: _candidateId }),
                            { headers: this._messageService.getHttpOptions() }
                        ).pipe(
                            map(_result => {
                                const candidateResult = {
                                    candidateId: _candidateId,
                                    voteCount:   _result['voteCount']
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
}

