import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

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
        return this._http.post(this.userUrl + '/login',
            JSON.stringify({id: id, password: password}), httpOptions)
            .map((response: Response) => {
                const user = response;
                /* write to session storage here */
                return user;
            });
    }

    getCandidates(): Observable<any> {
        return this._http.get(this.candidateUrl + '/list', httpOptions)
            .map((response: Response) => {
                const candidates = response;
                return candidates;
            });
    }

    register(name: string, id: string, password: string): Observable<any> {
        return this._http.post(this.userUrl + '/register',
            JSON.stringify({name: name, id: id, password: password}), httpOptions)
            .map((response: Response) => {
                const user = response;
                return user;
            });
    }

    votingBlock(result: Object): Observable<any> {
        return this._http.post(this.contractUrl + '/voting',
            JSON.stringify(result), httpOptions)
            .map((res: Response) => {
                return res;
            });
    }
}
