import { HttpHeaders } from '@angular/common/http';
export const STRING_CONFIG = {
    CURRENT_USER: 'currentUser',
    HASH: 'hash'
};
export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
