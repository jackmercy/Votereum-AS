import { Component, OnInit } from '@angular/core';
import { MessageService }    from '@services/message.service';
@Component({
    selector: 'app-master-reg-admin',
    templateUrl: './master-reg-admin.component.html',
    styleUrls: ['./master-reg-admin.component.scss']
})
export class MasterRegAdminComponent implements OnInit {
    isSideBarActive: Boolean;

    constructor(private _messageService: MessageService) { }

    ngOnInit() {
        this._messageService.sideBarActive$.subscribe(
            isActive => this.isSideBarActive = isActive
        );
    }

}
