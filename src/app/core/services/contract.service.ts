import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map }        from 'rxjs/operators';
import { URI_CONFIG } from '@config/uri.config';
import { Observable, pipe }           from 'rxjs';
import { STRING_CONFIG, httpOptions } from '@config/string.config';

@Injectable({
    providedIn: 'root'
})
export class ContractService {

    constructor(private _http: HttpClient) { }

    votingBlock(result: Object): Observable<any> {
        return this._http.post(URI_CONFIG.BASE_CONTRACT_API + URI_CONFIG.VOTING_URL,
            JSON.stringify(result), httpOptions)
            .pipe(
                map((res: Response) => {
                    return res;
                })
            );
    }

    /* NOTE: should move contract call to contract.service.ts */
    getTxReceipt(txHash: string) {
        return this._http.post(URI_CONFIG.BASE_CONTRACT_API + URI_CONFIG.VOTE_STATUS_URL,
                JSON.stringify({hash: txHash}), httpOptions);
    }

    getBlock(blockHash: string) {
        return this._http.post(URI_CONFIG.BASE_CONTRACT_API + URI_CONFIG.GET_BLOCK_URL,
                JSON.stringify({block: blockHash}), httpOptions);
    }

    getVotingData() {
        return this._http.get(URI_CONFIG.BASE_CONTRACT_API + URI_CONFIG.VOTING_LIST_URL, httpOptions);
    }
}
