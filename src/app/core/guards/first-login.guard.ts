import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { UserService }         from '@app/core/services/user.service';

@Injectable()
export class FirstLoginGuard implements CanActivate {
    constructor (private _router: Router,
        private _userService: UserService) { }

    canActivate(): boolean {
        if (this._userService.isFirstLogin()) {
            this._router.navigate(['/home/first-login']);
            return false;
        }
        return true;
    }
}
