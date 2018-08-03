import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { UserService }         from '@app/core/services/user.service';

@Injectable()
export class VotedGuard implements CanActivate {
    constructor (private _router: Router,
        private _userService: UserService) { }

    canActivate(): boolean {
        if (this._userService.isVoted()) {
            this._router.navigate(['/home/vote-result']);
            return false;
        }
        return true;
    }
}
