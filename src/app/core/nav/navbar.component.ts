import { Component, OnInit } from '@angular/core';
import { CoreService } from '@app/core/services/core.service';
import { Router } from '@angular/router';
declare interface RouteInfo {
    path: string;
    title: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'voting', title: 'Voting', class: '' },
    { path: 'score-board', title: 'Scoreboard', class: '' }
];

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    brandName = 'Ether-Vote';
    menuItems: any[];
    constructor(private _coreService: CoreService,
                private _router: Router) { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    onLogout() {
        this._coreService.logout();
        this._router.navigate(['']);
    }
}
