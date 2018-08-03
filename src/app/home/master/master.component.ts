import { Component, OnInit } from '@angular/core';
import { MessageService }    from '@services/message.service';
@Component({
    selector: 'app-home',
    templateUrl: './master.component.html',
    styleUrls: ['./master.component.scss']
})
export class HomeMasterComponent implements OnInit {
    isSideBarActive: Boolean;

    constructor(private _messageService: MessageService) { }

    ngOnInit() {
        this._messageService.sideBarActive$.subscribe(
            isActive => this.isSideBarActive = isActive
        );
    }

}
