import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  forkJoin, timer  } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { URI_CONFIG } from '@config/uri.config';
import { Router }     from '@angular/router';

import { STRING_CONFIG }    from '@config/string.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BallotService }    from '@services/ballot.service';
import { MessageService }   from '@services/message.service';
import { throwError }       from 'rxjs/internal/observable/throwError';
import { MatSnackBar }      from '@angular/material';
@Injectable()
export class UserService {

    /* Note: store user hash,token, name, id in sessionStorage */
    URI_CONFIG;
    STRING_CONFIG;
    helper = new JwtHelperService();
    logoutTimer: any;
    logOutTimeout: any;

    constructor(private _http: HttpClient,
                private _ballotService: BallotService,
                private _messageService: MessageService,
                private _router: Router,
                public snackBar: MatSnackBar) { }

    login(citizenId: string, password: string): Observable<any> {
        sessionStorage.clear();
        return this._http.post(URI_CONFIG.BASE_AUTH + URI_CONFIG.AUTH_URL,
            JSON.stringify({citizenId: citizenId, password: password}), { headers: this._messageService.getHttpOptions() })
            .pipe(
                map((response: Response) => {
                    const res = response;
                    if (res['token']) {
                        const citizenInfo = res['citizenInfo'];
                        this._messageService.changeLoginStatus(true);
                        /* write to session storage here */
                        const decodedToken = this.helper.decodeToken(res['token']);
                        console.log(decodedToken);
                        /* TODO: get citizen details (populate mongoose user + citizen) */
                        const payload = {
                            role: decodedToken.role,
                            isVote: decodedToken.isVote,
                            isFirstTimeLogIn: decodedToken.isFirstTimeLogIn,
                            hasBlockchainAccount: decodedToken.hasBlockchainAccount
                        };
                        sessionStorage.setItem(STRING_CONFIG.ACCESS_TOKEN, JSON.stringify(res['token']));
                        sessionStorage.setItem(STRING_CONFIG.CITIZEN_INFO, JSON.stringify(citizenInfo));
                        this.isLoggedIn = true;
                        // sessionStorage.setItem(STRING_CONFIG.CURRENT_USER, JSON.stringify(payload));
                        // current user
                        this._messageService.setIsVoteValue(payload.isVote);
                        this._messageService.setIsFirstTimeLogInValue(payload.isFirstTimeLogIn);
                        this._messageService.setHasBlockchainAccountSourceValue(payload.hasBlockchainAccount);
                        this.autoLogout(decodedToken.exp);
                    }

                    return res;
                })
            );
    }

    autoLogout(exp) {
        this.logOutTimeout = timer(exp * 1000 - Date.now());
        this.logoutTimer = this.logOutTimeout.subscribe( () => {
            if (this.isLoggedIn === true) {
                this.snackBar.open('Your session has expired. Please log in, again!' , 'Got it', {
                    duration: 5000,
                });
                this.logout();
            }
        });
    }

    logout(): void {
        this._messageService.changeLoginStatus(false);
        sessionStorage.clear();
        localStorage.removeItem('isLoggedIn');
        this._router.navigate(['']);
    }

    get isLoggedIn(): Boolean {
        return JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
    }

    set isLoggedIn(value: Boolean) {
        localStorage.setItem('isLoggedIn', value.toString());
        this._messageService.changeLoginStatus(value);
    }


    /* register(name: string, id: string, password: string): Observable<any> {
        return this._http.post(URI_CONFIG.BASE_AUTH + '/register',
            JSON.stringify({name: name, id: id, password: password}), { headers: this._messageService.getHttpOptions() })
            .pipe(
                map((response: Response) => {
                    const user = response;
                    return user;
                })
            );
    } */

    updateUserInfoLocal(citizenId: string): Observable<any> {
        return this._http.post(URI_CONFIG.BASE_USER_API + '/getUserInfo',
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
                // sessionStorage.setItem(STRING_CONFIG.CURRENT_USER, JSON.stringify(payload));
                this._messageService.setIsVoteValue(payload.isVote);
                this._messageService.setIsFirstTimeLogInValue(payload.isFirstTimeLogIn);
                this._messageService.setHasBlockchainAccountSourceValue(payload.hasBlockchainAccount);
            })
        );
    }

    changePassword(newPassword: string): Observable<any> {
        return this._http.post(URI_CONFIG.BASE_USER_API + URI_CONFIG.CHANGE_PASSWORD,
            JSON.stringify({newPassword: newPassword}), { headers: this._messageService.getHttpOptions() })
        .pipe(
            map((response: Response) => {
                const res = response;
                return res;
            })
        );
    }

    isAuthorized(): Boolean {
        const token = sessionStorage.getItem(STRING_CONFIG.ACCESS_TOKEN);
        const isAuth = this._messageService.getLoginStatus();
        const isLoggedIn = this.isLoggedIn;
        if (isAuth) {
            return true;
        } else if (isAuth === false && isLoggedIn === true) {
            if (token) {
                this._messageService.changeLoginStatus(true);

                return true;
            }
            return false;
        } else if (isAuth === false && isLoggedIn === false) {
            return false;
        }

        return false;
    }

    isVoted(): Boolean {
        const isVote = this._messageService.getIsVoteValue();

        return isVote;
    }

    isFirstLogin(): Boolean {
        const isFirstTimeLogIn = this._messageService.getIsFirstTimeLogInValue();

        return isFirstTimeLogIn;
    }

    hasBlockchainAccount(): Boolean {
        const hasBlockchainAccount = this._messageService.getHasBlockchainAccountSourceValue();

        return hasBlockchainAccount;
    }

    updateLocalIsFirstLogin() {
        this._messageService.setIsFirstTimeLogInValue(false);
    }

    updateLocalIsVoted(_txHash) {
        this._messageService.setIsVoteValue(true);
    }

    getVoterAddress(_citizenId: String): Observable<any> {
        return this._http.post(URI_CONFIG.BASE_BLOCKCHAIN_API + URI_CONFIG.GET_VOTER_ADDRESS,
            JSON.stringify({citizenId: _citizenId}), { headers: this._messageService.getHttpOptions() })
        .pipe(
            map((response: Response) => {
                const res = response;
                return res;
            })
        );
    }

    getCitizenInfo(): Object {
        const citizenInfo = JSON.parse(sessionStorage.getItem(STRING_CONFIG.CITIZEN_INFO));

        return citizenInfo;
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

    /* hasTheRightToVote(): Boolean {
        this._ballotService.getBallotInfo().subscribe
    }
    */

    /*setupChainAccount(account: Object): Observable<any> {
        // Handle error later
        return new Observable((_observable) => {
            const storeAccount = this._http.post(
                URI_CONFIG.BASE_BLOCKCHAIN_API + '/storeAccount',
                JSON.stringify(account),
                { headers: this._messageService.getHttpOptions() });

            const giveRight = this._http.post(
                URI_CONFIG.BASE_BALLOT_API + '/giveRight',
                account['address'],
                { headers: this._messageService.getHttpOptions() });

            forkJoin(storeAccount, giveRight).subscribe(_ => _observable.next(), error => _observable.error(error));
        });

    }*/

    setupChainAccount(account: Object): Observable<any> {
        return this._http.post(
            URI_CONFIG.BASE_BLOCKCHAIN_API + '/storeAccount',
            JSON.stringify(account),
            { headers: this._messageService.getHttpOptions() });
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
