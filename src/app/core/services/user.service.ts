import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map }        from 'rxjs/operators';
import { URI_CONFIG } from '@config/uri.config';

import { STRING_CONFIG }    from '@config/string.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BallotService }    from '@services/ballot.service';
import { MessageService }   from '@services/message.service';

@Injectable()
export class UserService {

    /* Note: store user hash,token, name, id in sessionStorage */

    URI_CONFIG;
    STRING_CONFIG;
    helper = new JwtHelperService();

    constructor(private _http: HttpClient,
                private _ballotService: BallotService,
                private _messageService: MessageService) { }

    login(citizenId: string, password: string): Observable<any> {
        sessionStorage.clear();
        return this._http.post(URI_CONFIG.BASE_USER_API + URI_CONFIG.AUTH_URL,
            JSON.stringify({citizenId: citizenId, password: password}), { headers: this._messageService.getHttpOptions() })
            .pipe(
                map((response: Response) => {
                    const res = response;
                    if (res['token']) {
                        this._messageService.changeLoginStatus(true);
                        /* write to session storage here */
                        const decodedToken = this.helper.decodeToken(res['token']);
                        console.log(decodedToken);
                        /* TODO: get citizen details (populate mongoose user + citizen) */
                        const payload = {
                            isVote: decodedToken.isVote,
                            isFirstTimeLogIn: decodedToken.isFirstTimeLogIn,
                            hasBlockchainAccount: decodedToken.hasBlockchainAccount
                        };
                        sessionStorage.setItem(STRING_CONFIG.ACCESS_TOKEN, JSON.stringify(res['token']));
                        sessionStorage.setItem(STRING_CONFIG.CURRENT_USER, JSON.stringify(payload));
                    }
                    return res;
                })
            );
    }

    logout(): void {
        this._messageService.changeLoginStatus(false);
        sessionStorage.clear();
    }

    get keepSignInStatus(): Boolean {
        return JSON.parse(localStorage.getItem('keepSignIn') || 'false');
    }

    get isLoggedIn(): Boolean {
        return this.keepSignInStatus;
    }

    set keepSignInStatus(value: Boolean) {
        localStorage.setItem('keepSignIn', value.toString());
    }


    isKeepSignIn(value: Boolean) {
        this.keepSignInStatus = value;
    }

    /* register(name: string, id: string, password: string): Observable<any> {
        return this._http.post(URI_CONFIG.BASE_USER_API + '/register',
            JSON.stringify({name: name, id: id, password: password}), { headers: this._messageService.getHttpOptions() })
            .pipe(
                map((response: Response) => {
                    const user = response;
                    return user;
                })
            );
    } */

    updateUserInfoLocal(citizenId: string): Observable<any> {
        return this._http.post(URI_CONFIG.BASE_USER_API + URI_CONFIG.GET_USER_INFO_URL,
            JSON.stringify({citizenId: citizenId}), { headers: this._messageService.getHttpOptions() })
        .pipe(
            map((response: Response) => {
                const user = response['data'];
                /* TODO: get citizen details (populate mongoose user + citizen) */
                const payload = {
                    isVote: user.isVote,
                    isFirstTimeLogIn: user.isFirstTimeLogIn,
                    hasBlockchainAccount: user.hasBlockchainAccount
                };
                sessionStorage.setItem(STRING_CONFIG.CURRENT_USER, JSON.stringify(payload));
            })
        );
    }

    isAuthorized(): Boolean {
        const token = sessionStorage.getItem(STRING_CONFIG.ACCESS_TOKEN);
        const isAuth = this._messageService.getLoginStatus();
        const isKeepLogIn = this.keepSignInStatus;

        if (isAuth) {
            return true;
        } else if (isAuth === false && isKeepLogIn === true) {
            return token ? true : false;
        } else if (isAuth === false && isKeepLogIn === false) {
            return false;
        }
        return false;
    }

    isVoted(): Boolean {
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.CURRENT_USER));

        return user.isVote;
    }

    hasBlockchainAccount(): Boolean {
        const user = JSON.parse(sessionStorage.getItem(STRING_CONFIG.CURRENT_USER));

        return user.hasBlockchainAccount;
    }

    /* refactor */
    setHasBlockchainAccount(value) {
        sessionStorage.setItem('hasBlockchainAccount',
            JSON.stringify({ hasBlockchainAccount: value }));
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

/*    hasTheRightToVote(): Boolean {
        this._ballotService.getBallotInfo().subscribe
    }
    */

    setupChainAccount(account: Object) {
        return this._http.post(URI_CONFIG.BASE_BLOCKCHAIN_API + '/storeAccount',
            JSON.stringify(account), { headers: this._messageService.getHttpOptions() })
                .pipe(
                    map((response: Response) =>
                        console.log(response)
                    )
                );
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
            JSON.stringify({citizenId: citizenId}), { headers: this._messageService.getHttpOptions() })
            .pipe(
                map((res: Response) => {
                    return res;
                })
            );
    }
}
