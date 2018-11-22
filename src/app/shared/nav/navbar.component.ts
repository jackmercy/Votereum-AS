import { Component, OnInit, Input }   from '@angular/core';
import { MessageService }             from '@services/message.service';
import { Router, RouterEvent }        from '@angular/router';
import { UserService }                from '@services/user.service';
import { RouteInfo }                  from '@config/interfaces/route-info.interface';
import { roleConfig }                 from '@config/string.config';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    // tslint:disable-next-line:no-input-rename
    @Input('routesItems') routesItems: RouteInfo[];

    isSideBarActive: Boolean;
    citizenInfo: Object;
    isRoleCitizen: Boolean = false;
    isRoleAdmin: Boolean = false;
    constructor(private _router: Router,
                private _messageService: MessageService,
                private _userService: UserService) { }

    ngOnInit() {
        this._messageService.sideBarActive$.subscribe(
            isActive => this.isSideBarActive = isActive
        );
        this.citizenInfo = this._userService.getCitizenInfo();
        const userRole = this._userService.getRole();
        if (userRole === roleConfig.CITIZEN) {
            this.isRoleCitizen = true;
            this.isRoleAdmin = false;
        } else if (userRole === roleConfig.EA || userRole === roleConfig.RA) {
            this.isRoleAdmin = true;
            this.isRoleCitizen = false;
        }
    }

    onUserAvatarClicked() {
        this._router.navigate(['/home/user-profile']);
    }

    onLogout() {
        this._userService.logout();
    }

}

