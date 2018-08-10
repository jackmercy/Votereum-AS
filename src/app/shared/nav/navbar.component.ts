import { Component, OnInit, Input }   from '@angular/core';
import { MessageService }      from '@services/message.service';
import { Router, RouterEvent } from '@angular/router';
import 'rxjs/add/operator/filter';
import { RouteInfo } from '@config/interfaces/route-info.interface';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    @Input('routesItems') routesItems: RouteInfo[];

    isSideBarActive: Boolean;

    constructor(private _router: Router,
                private _messageService: MessageService) { }

    ngOnInit() {
        this._messageService.sideBarActive$.subscribe(
            isActive => this.isSideBarActive = isActive
        );
        /* this._router.events.filter(e => e instanceof RouterEvent).subscribe(
            e => {
                this.currentModule = e['url'].toString();
            }
        ); */
    }

    onLogout() {
        /* this._userService.logout(); */
        this._router.navigate(['']);
    }

}

