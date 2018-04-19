import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private _router: Router,
        private _userService: UserService) { }

    canActivate(): boolean {
        if (!this._userService.isAuthorized()) {
            this._router.navigate(['']);
            return false;
        }
        return true;
    }
}
