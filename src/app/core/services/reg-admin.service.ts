///<reference path="../../config/uri.config.ts"/>
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs-compat/add/observable/of';
import { RegAdminModule } from '@app/reg-admin/reg-admin.module';
import { URI_CONFIG } from '@config/uri.config';
import { httpOptions } from '@config/string.config';

@Injectable()
export class RegAdminService {

    constructor(private _http: HttpClient) { }

    getUserInfo(_userId: string) {
        return this._http.post(
            URI_CONFIG.BASE_CITIZEN_API + URI_CONFIG.CITIZEN_BY_ID,
            JSON.stringify({id: _userId}),
            httpOptions);
    }

    getGeneratedPassword(_userId: string): Observable<Object> {
        if (_userId === '123456') {
            return Observable.of({
                message: 'This user has already changed their password!'
            });
        }
        return Observable.of({ password: 'DdDHanKm5aKxv' });
    }
}
