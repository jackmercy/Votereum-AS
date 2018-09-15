import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map }        from 'rxjs/operators';
import { URI_CONFIG } from '@config/uri.config';
import { Observable, pipe }           from 'rxjs';
import { STRING_CONFIG } from '@config/string.config';
import { MessageService } from '@services/message.service';

@Injectable({
    providedIn: 'root'
})
export class ContractService {

    constructor(private _http: HttpClient,
                private _messageService: MessageService) { }

    votingBlock(result: Object): Observable<any> {
        return this._http.post(URI_CONFIG.BASE_CONTRACT_API + URI_CONFIG.VOTING_URL,
            JSON.stringify(result), { headers: this._messageService.getHttpOptions() })
            .pipe(
                map((res: Response) => {
                    return res;
                })
            );
    }

    /* NOTE: should move contract call to contract.service.ts */
    getTxReceipt(txHash: string) {
        return this._http.post(URI_CONFIG.BASE_CONTRACT_API + URI_CONFIG.VOTE_STATUS_URL,
                JSON.stringify({hash: txHash}), { headers: this._messageService.getHttpOptions() });
    }

    getBlock(blockHash: string) {
        return this._http.post(URI_CONFIG.BASE_CONTRACT_API + URI_CONFIG.GET_BLOCK_URL,
                JSON.stringify({block: blockHash}), { headers: this._messageService.getHttpOptions() });
    }

    getVotingData() {
        return this._http.get(
            URI_CONFIG.BASE_CONTRACT_API + URI_CONFIG.VOTING_LIST_URL, { headers: this._messageService.getHttpOptions() }
        );
    }
}
