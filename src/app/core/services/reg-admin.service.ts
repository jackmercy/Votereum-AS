import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs-compat/add/observable/of';
import { RegAdminModule } from '@app/reg-admin/reg-admin.module';

@Injectable()
export class RegAdminService {

    constructor(private _http: HttpClient) { }

    getUserInfo(_userId: string) {
        
        return Observable.of({
            id: _userId,
            name: 'sample',
            birthDate: '05/09/1990',
            homeTown: 'sample',
            address: '55 Acarne St., New York',
            isPasswordChanged: false
        });
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
