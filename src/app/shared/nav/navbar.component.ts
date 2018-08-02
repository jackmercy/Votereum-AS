import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../core/services/candidate.service';
import { Router } from '@angular/router';
import { MessageService } from '@services/message.service';
declare interface RouteInfo {
    path: string;
    title: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'control', title: 'EA Admin', class: '' },
    { path: 'test-route', title: 'Test Routing', class: '' }
];

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    isSideBarActive: Boolean;
    menuItems: any[];

    constructor(private _router: Router,
                private _messageService: MessageService) { }

    ngOnInit() {
        this._messageService.sideBarActive$.subscribe(
            isActive => this.isSideBarActive = isActive
        );
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    onLogout() {
        /* this._userService.logout(); */
        this._router.navigate(['']);
    }

}

