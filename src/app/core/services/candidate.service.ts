import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map }        from 'rxjs/operators';
import { URI_CONFIG } from '@config/uri.config';
import { Observable, pipe }           from 'rxjs';
import { STRING_CONFIG }  from '@config/string.config';
import { MessageService } from '@services/message.service';

@Injectable()
export class CandidateService {
    contractUrl = '/api/contract';

    constructor(private _http: HttpClient,
                private _messageService: MessageService) { }

    getCandidates(): Observable<any> {
        return this._http.get(URI_CONFIG.BASE_CANDIDATE_API + URI_CONFIG.CANDIDATE_LIST_URL,
                            { headers: this._messageService.getHttpOptions() })
            .pipe(
                map((response: Response) => {
                    const candidates = response;
                    return candidates;
                })
            );
    }
    /* confused function */
    getCandidateListName(votingList: any) {
        return this._http.post(URI_CONFIG.BASE_CANDIDATE_API + URI_CONFIG.GET_CANDIDATE_BY_ID_URL,
            JSON.stringify(votingList), { headers: this._messageService.getHttpOptions() });
    }
}
