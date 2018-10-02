import { Component, OnInit, Input }   from '@angular/core';
import { MessageService }             from '@services/message.service';
import { Router, RouterEvent }        from '@angular/router';
import { UserService }                from '@services/user.service';
import { RouteInfo }                  from '@config/interfaces/route-info.interface';
import 'rxjs/add/operator/filter';

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

    constructor(private _router: Router,
                private _messageService: MessageService,
                private _userService: UserService) { }

    ngOnInit() {
        this._messageService.sideBarActive$.subscribe(
            isActive => this.isSideBarActive = isActive
        );
        this.citizenInfo = this._userService.getCitizenInfo();
        /* this._router.events.filter(e => e instanceof RouterEvent).subscribe(
            e => {
                this.currentModule = e['url'].toString();
            }
        ); */
    }

    onLogout() {
        this._userService.logout();
        this._router.navigate(['']);
    }

}

