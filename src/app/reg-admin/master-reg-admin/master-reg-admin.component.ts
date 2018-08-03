import { Component, OnInit } from '@angular/core';
import { MessageService }    from '@services/message.service';
import { RouteInfo, regRoute } from '@config/interfaces/route-info.interface';

@Component({
    selector: 'app-master-reg-admin',
    templateUrl: './master-reg-admin.component.html',
    styleUrls: ['./master-reg-admin.component.scss']
})
export class MasterRegAdminComponent implements OnInit {
    isSideBarActive: Boolean;
    routesItems: RouteInfo[] = regRoute;
    constructor(private _messageService: MessageService) { }

    ngOnInit() {
        this._messageService.sideBarActive$.subscribe(
            isActive => this.isSideBarActive = isActive
        );
    }

}
