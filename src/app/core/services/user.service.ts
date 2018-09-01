import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map }        from 'rxjs/operators';
import { URI_CONFIG } from '@config/uri.config';
import { STRING_CONFIG, httpOptions } from '@config/string.config';

import { JwtHelperService } from '@auth0/angular-jwt';
import { BallotService }    from '@services/ballot.service';
@Injectable()
export class UserService {

    /* Note: store user hash,token, name, id in sessionStorage */

    URI_CONFIG;
    STRING_CONFIG;
    helper = new JwtHelperService();

    constructor(private _http: HttpClient,
                private _ballotService: BallotService) { }

    login(citizenId: string, password: string): Observable<any> {
        sessionStorage.clear();
        return this._http.post(URI_CONFIG.BASE_USER_API + URI_CONFIG.AUTH_URL,
            JSON.stringify({citizenId: citizenId, password: password}), httpOptions)
            .pipe(
                map((response: Response) => {
                    const res = response;
                    /* write to session storage here */
                    const decodedToken = this.helper.decodeToken(res['token']);
                    /* TODO: get citizen details (populate mongoose user + citizen) */
                    const payload = {
                        isVote: decodedToken.isVote
                    };
                    sessionStorage.setItem(STRING_CONFIG.ACCESS_TOKEN, JSON.stringify(res['token']));
                    sessionStorage.setItem(STRING_CONFIG.CURRENT_USER, JSON.stringify(payload));
                    return res;
                })
            );
    }

    logout(): void {
        sessionStorage.removeItem(STRING_CONFIG.CURRENT_USER);
        sessionStorage.removeItem(STRING_CONFIG.ACCESS_TOKEN);
    }

    /* register(name: string, id: string, password: string): Observable<any> {
        return this._http.post(URI_CONFIG.BASE_USER_API + '/register',
            JSON.stringify({name: name, id: id, password: password}), httpOptions)
            .pipe(
                map((response: Response) => {
                    const user = response;
                    return user;
                })
            );
    } */

    isAuthorized(): boolean {
        const token = sessionStorage.getItem(STRING_CONFIG.ACCESS_TOKEN);

        return token ? true : false;
    }

    isVoted(): boolean {
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.CURRENT_USER));

        return user.isVote;
    }

    getRole(): string {
        const token = JSON.parse(sessionStorage.getItem(STRING_CONFIG.ACCESS_TOKEN));
        const decodedToken = this.helper.decodeToken(token);

        return decodedToken ? decodedToken.role : '';
    }

    getName(): string {
        const token = JSON.parse(sessionStorage.getItem(STRING_CONFIG.ACCESS_TOKEN));
        const decodedToken = this.helper.decodeToken(token);

        return decodedToken ? decodedToken.name : '';
    }

    getId(): string {
        const token = JSON.parse(sessionStorage.getItem(STRING_CONFIG.ACCESS_TOKEN));
        const decodedToken = this.helper.decodeToken(token);

        return decodedToken ? decodedToken.citizenId : '';
    }

/*    hasTheRightToVote(): boolean {
        this._ballotService.getBallotInfo().subscribe
    }
    */

    setupChainAccount(account: Object) {
        return this._http.post(URI_CONFIG.BASE_USER_API + '/chainAccount',
            JSON.stringify(account), httpOptions);
    }

    /* Unused func */
    getHash(): String {
        const hash = JSON.parse(sessionStorage.getItem(STRING_CONFIG.HASH));

        return hash;
    }

    updateUserHash(hash: String): void {
        sessionStorage.setItem(STRING_CONFIG.HASH, JSON.stringify(hash));
    }

    updateUserVote(isVoted: Boolean): void {
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.CURRENT_USER));
        user.isVote = isVoted;

        sessionStorage.setItem(STRING_CONFIG.CURRENT_USER, JSON.stringify(user));
    }

    getUserHash(citizenId: string): Observable<any> {
        return this._http.post(URI_CONFIG.BASE_USER_API + URI_CONFIG.GET_USER_HASH_URL,
            JSON.stringify({citizenId: citizenId}), httpOptions)
            .pipe(
                map((res: Response) => {
                    return res;
                })
            );
    }
}
