import { Component, OnInit } from '@angular/core';
import { MessageService }    from '@services/message.service';
@Component({
    selector: 'app-master-ea-admin',
    templateUrl: './master-ea-admin.component.html',
    styleUrls: ['./master-ea-admin.component.scss']
})
export class MasterEaAdminComponent implements OnInit {
    isSideBarActive: Boolean;
    constructor(private _messageService: MessageService) { }

    ngOnInit() {
        this._messageService.sideBarActive$.subscribe(
            isActive => this.isSideBarActive = isActive
        );
    }

}
