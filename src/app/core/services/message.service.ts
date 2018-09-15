import { Injectable }  from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject   } from 'rxjs';
import { roleConfig, STRING_CONFIG }       from '@config/string.config';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    // Observable string sources
    private sideBarActiveSource = new BehaviorSubject<Boolean>(true);
    private isLoginSource = new BehaviorSubject<Boolean>(false);
    // Observable string streams
    sideBarActive$ = this.sideBarActiveSource.asObservable();
    isLogin$ = this.isLoginSource.asObservable();

    constructor(private _http: HttpClient) {}

    // Service message commands
    toggleSideBar() {
        const toggle = !this.sideBarActiveSource.getValue();
        this.sideBarActiveSource.next(toggle);
    }

    changeLoginStatus(status: Boolean) {
        this.isLoginSource.next(status);
    }

    getHttpOptions(): any {
        let headers;
        const loginStatus = this.isLoginSource.getValue();

        if (loginStatus === true) {
            headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem(STRING_CONFIG.ACCESS_TOKEN)
                                    ? JSON.parse(sessionStorage.getItem(STRING_CONFIG.ACCESS_TOKEN)) : ''
            });
        } else if (loginStatus === false) {
            headers = new HttpHeaders({
                'Content-Type': 'application/json'
            });
        }
        console.log(headers);
        return headers;
    }

}
