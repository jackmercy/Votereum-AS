import { Component, OnInit } from '@angular/core';

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
    brandName = 'Suffragium';
    menuItems: any[];
    constructor() { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

}
