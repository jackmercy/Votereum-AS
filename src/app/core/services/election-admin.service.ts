import { Injectable }  from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Observable }  from 'rxjs/Observable';
import { URI_CONFIG }  from '@config/uri.config';
import { map }         from 'rxjs/operators';
import { MessageService } from '@services/message.service';

@Injectable({
    providedIn: 'root'
})
export class ElectionAdminService {

    constructor(private _http: HttpClient,
                private _messageService: MessageService) { }

    getCandidateList(): Observable<Array<Object>> {
        return this._http.get(URI_CONFIG.BASE_EA_API + '/list', { headers: this._messageService.getHttpOptions() })
        .pipe( map((response: Response) => response['candidates']) );
    }
}
