import { Component, OnInit } from '@angular/core';
import { MessageService }    from '@services/message.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    brandName = 'Ether Vote';
    constructor(private _messageService: MessageService) { }

    ngOnInit() {

    }

    toggleSidebar() {
        this._messageService.toggleSideBar();
    }
}
