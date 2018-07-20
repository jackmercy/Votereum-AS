import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class CoreService {
    userUrl = '/api/user';
    candidateUrl = '/api/candidate';
    contractUrl = '/api/contract';

    constructor(private _http: HttpClient) { }

    login(id: string, password: string): Observable<any> {
        return this._http.post('http://localhost:5000/api/user/login',
            JSON.stringify({id: id, password: password}), httpOptions)
            .pipe(
                map((response: Response) => {
                    const user = response;
                    /* write to session storage here */
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                    return user;
                })
            );
    }

    logout(): void {
        sessionStorage.removeItem('currentUser');
    }

    getCandidates(): Observable<any> {
        return this._http.get(this.candidateUrl + '/list', httpOptions)
            .pipe(
                map((response: Response) => {
                    const candidates = response;
                    return candidates;
                })
            );
    }

    register(name: string, id: string, password: string): Observable<any> {
        return this._http.post(this.userUrl + '/register',
            JSON.stringify({name: name, id: id, password: password}), httpOptions)
            .pipe(
                map((response: Response) => {
                    const user = response;
                    return user;
                })
            );
    }

    votingBlock(result: Object): Observable<any> {
        return this._http.post(this.contractUrl + '/voting',
            JSON.stringify(result), httpOptions)
            .pipe(
                map((res: Response) => {
                    return res;
                })
            );
    }

    /* NOTE: should move contract call to contract.service.ts */
    getTxReceipt(txHash: string) {
        return this._http.post(this.contractUrl + '/voteStatus',
                JSON.stringify({hash: txHash}), httpOptions);
    }

    getBlock(blockHash: string) {
        return this._http.post(this.contractUrl + '/getBlock',
                JSON.stringify({block: blockHash}), httpOptions);
    }

    getCandidateListName(votingList: any) {
        return this._http.post(this.candidateUrl + '/getCandidateById',
            JSON.stringify(votingList), httpOptions);
    }

    getVotingData() {
        return this._http.get(this.contractUrl + '/votingList', httpOptions);
    }
}
