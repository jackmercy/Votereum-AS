import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map }        from 'rxjs/operators';
import { URI_CONFIG } from '@config/uri.config';
import { Observable, pipe }           from 'rxjs';
import { STRING_CONFIG, httpOptions } from '@config/string.config';

@Injectable()
export class CandidateService {
    contractUrl = '/api/contract';

    constructor(private _http: HttpClient) { }

    getCandidates(): Observable<any> {
        return this._http.get(URI_CONFIG.BASE_CANDIDATE_API + URI_CONFIG.CANDIDATE_LIST_URL, httpOptions)
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
            JSON.stringify(votingList), httpOptions);
    }
}
