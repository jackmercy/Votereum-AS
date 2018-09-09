import { Injectable }  from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Observable }  from 'rxjs/Observable';
import { URI_CONFIG }  from '@config/uri.config';
import { httpOptions } from '@config/string.config';
import { map }         from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ElectionAdminService {

    constructor(private _http: HttpClient) { }

    getCandidateList(): Observable<Array<Object>> {
        return this._http.get(URI_CONFIG.BASE_EA_API + '/list', httpOptions)
        .pipe( map((response: Response) => response['candidates']) );
    }
}
