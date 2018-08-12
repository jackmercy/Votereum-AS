import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map }        from 'rxjs/operators';
import { URI_CONFIG } from '@config/uri.config';
import { STRING_CONFIG, httpOptions } from '@config/string.config';

import { JwtHelperService }           from '@auth0/angular-jwt';
@Injectable()
export class UserService {

    /* Note: store user hash,token, name, id in sessionStorage */

    URI_CONFIG;
    STRING_CONFIG;

    constructor(private _http: HttpClient) { }

    login(id: string, password: string): Observable<any> {
        return this._http.post(URI_CONFIG.BASE_USER_API + URI_CONFIG.AUTH_URL,
            JSON.stringify({id: id, password: password}), httpOptions)
            .pipe(
                map((response: Response) => {
                    const res = response;
                    /* write to session storage here */

                    sessionStorage.setItem(STRING_CONFIG.ACCESS_TOKEN, JSON.stringify(res['token']));
                    return res;
                })
            );
    }

    logout(): void {
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
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.ACCESS_TOKEN));

        return user ? true : false;
    }

    isVoted(): boolean {
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.ACCESS_TOKEN));

        return user.isVote;
    }

    getRole(): string {
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.ACCESS_TOKEN));

        return user ? user.role : '';
    }

    getName(): string {
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.ACCESS_TOKEN));

        return user ? user.name : '';
    }

    getId(): string {
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.ACCESS_TOKEN));

        return user ? user.id : '';
    }

    getHash(): string {
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.ACCESS_TOKEN));

        return user ? user.hash : '';
    }

    updateUserHash(newHash: string): void {
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.ACCESS_TOKEN));
        user.hash = newHash;

        sessionStorage.setItem(STRING_CONFIG.ACCESS_TOKEN, JSON.stringify(user));
    }

    updateUserVote(isVoted: Boolean): void {
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.ACCESS_TOKEN));
        user.isVote = isVoted;

        sessionStorage.setItem(STRING_CONFIG.ACCESS_TOKEN, JSON.stringify(user));
    }

    getUserHash(citizenID: string): Observable<any> {
        return this._http.post(URI_CONFIG.BASE_USER_API + URI_CONFIG.GET_USER_HASH_URL,
            JSON.stringify({citizenID: citizenID}), httpOptions)
            .pipe(
                map((res: Response) => {
                    const currentHash = this.getHash();
                    if (res && res[STRING_CONFIG.HASH] && res[STRING_CONFIG.HASH] !== currentHash) {
                        this.updateUserHash(res[STRING_CONFIG.HASH]);
                    }
                    return res;
                })
            );
    }
}
