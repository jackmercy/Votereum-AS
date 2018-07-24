import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URI_CONFIG } from '@config/uri.config';
import { STRING_CONFIG } from '@config/string.config';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class UserService {

    /* Note: store user hash,token, name, id in sessionStorage */
    userUrl = '/api/user';
    URI_CONFIG;
    STRING_CONFIG;

    constructor(private _http: HttpClient) { }

    isAuthorized(): boolean {
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.CURRENT_USER));

        return user ? true : false;
    }

    isVoted(): boolean {
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.CURRENT_USER));

        return user.isVote;
    }

    getRole(): string {
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.CURRENT_USER));

        return user ? user.role : '';
    }

    getName(): string {
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.CURRENT_USER));

        return user ? user.name : '';
    }

    getId(): string {
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.CURRENT_USER));

        return user ? user.id : '';
    }

    /* Do we need it ? */
    getHash(): string {
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.CURRENT_USER));

        return user ? user.hash : '';
    }

    updateUserHash(newHash: string): void {
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.CURRENT_USER));
        user.hash = newHash;

        sessionStorage.setItem(STRING_CONFIG.CURRENT_USER, JSON.stringify(user));
    }

    updateUserVote(isVoted: Boolean): void {
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.CURRENT_USER));
        user.isVote = isVoted;

        sessionStorage.setItem(STRING_CONFIG.CURRENT_USER, JSON.stringify(user));
    }

    getUserHash(citizenID: string): Observable<any> {
        return this._http.post(this.userUrl + '/getUserHash',
            JSON.stringify({citizenID: citizenID}), httpOptions)
            .pipe(
                map((res: Response) => {
                    const currentHash = this.getHash();
                    if (res && res['hash'] && res['hash'] !== currentHash) {
                        this.updateUserHash(res['hash']);
                    }
                    return res;
                })
            );
    }
}
