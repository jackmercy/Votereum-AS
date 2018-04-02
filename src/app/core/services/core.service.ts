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
    user: any;
    constructor() { }

    login(username: string, role: string): boolean {
        if (username === 'Helena' && role === 'master') {
            const result = {
                username: username,
                role: role
            };
            this.user = result;
            return true;
        } else if (username === 'Khoai' && role === 'slave') {
            const result = {
                username: username,
                role: role
            };
            this.user = result;
            return true;
        } else if (username === 'testing' && role === 'e2e') {
            const result = {
                username: username,
                role: role
            };
            this.user = result;
            return true;
        }
        return false;
    }

}
