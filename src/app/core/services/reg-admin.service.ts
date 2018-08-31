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

    getCitizenInfo(_userId: string) {
        return this._http.post(
            URI_CONFIG.BASE_CITIZEN_API + URI_CONFIG.CITIZEN_BY_ID,
            JSON.stringify({Id_number: _userId}),
            httpOptions);
    }

    getGeneratedNewPassword(_userId: string): Observable<Object> {
        return this._http.post(
            URI_CONFIG.BASE_CITIZEN_API + URI_CONFIG.CITIZEN_GENERATE_PASSWORD,
            JSON.stringify( { Id_number: _userId }),
            httpOptions
        );
    }

    generateUserSystemAccount(_userId: string): Observable<Object> {
        return this._http.post(
            URI_CONFIG.BASE_CITIZEN_API + URI_CONFIG.CITIZEN_GENERATE_SYSTEM_ACCOUNT,
            JSON.stringify( { Id_number: _userId }),
            httpOptions
        );
    }
}
