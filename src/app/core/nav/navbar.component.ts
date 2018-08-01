import { Component, OnInit } from '@angular/core';
import { CandidateService } from '@services/candidate.service';
import { UserService } from '@services/user.service';
import { Router } from '@angular/router';
declare interface RouteInfo {
    path: string;
    title: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '', title: 'EA Admin', class: '' },
    { path: 'test', title: 'Test Routing', class: '' }
];

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    brandName = 'Ether Vote';
    menuItems: any[];
    constructor(private _userService: UserService,
                private _router: Router) { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    onLogout() {
        this._userService.logout();
        this._router.navigate(['']);
    }
}
