import { Component, OnInit } from '@angular/core';
import { MessageService }    from '@services/message.service';
import { RouteInfo, homeRoute } from '@config/interfaces/route-info.interface';

@Component({
    selector: 'app-home',
    templateUrl: './master.component.html',
    styleUrls: ['./master.component.scss']
})
export class HomeMasterComponent implements OnInit {
    isSideBarActive: Boolean;
    routesItems: RouteInfo[] = homeRoute;
    constructor(private _messageService: MessageService) { }

    ngOnInit() {
        this._messageService.sideBarActive$.subscribe(
            isActive => this.isSideBarActive = isActive
        );
    }

}
