import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject   } from 'rxjs';
import { roleConfig, httpOptions }       from '@config/string.config';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    // Observable string sources
    private sideBarActiveSource = new BehaviorSubject<Boolean>(true);
    // Observable string streams
    sideBarActive$ = this.sideBarActiveSource.asObservable();

    constructor(private _http: HttpClient) {}

    // Service message commands
    toggleSideBar() {
        const toggle = !this.sideBarActiveSource.getValue();
        this.sideBarActiveSource.next(toggle);
    }

}
