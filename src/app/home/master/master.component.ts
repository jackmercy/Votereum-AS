import { Component, OnInit } from '@angular/core';
import { MessageService }    from '@services/message.service';
import { UserService }       from '@services/user.service';
import { RouteInfo, homeRoute, homeRoute_Voted } from '@config/interfaces/route-info.interface';

@Component({
    selector: 'app-home',
    templateUrl: './master.component.html',
    styleUrls: ['./master.component.scss']
})
export class HomeMasterComponent implements OnInit {
    isSideBarActive: Boolean;
    routesItems: RouteInfo[];
    constructor(private _messageService: MessageService,
                private _userService: UserService) { }

    ngOnInit() {
        let isVoted;
        const _id = this._userService.getId();
        this._userService.updateUserInfoLocal(_id).subscribe(
            () => {
                isVoted = this._userService.isVoted();
                if (isVoted === false) {
                    this.routesItems = homeRoute;
                } else if (isVoted === true) {
                    this.routesItems = homeRoute_Voted;
                }
            }
        );

        this._messageService.sideBarActive$.subscribe(
            isActive => this.isSideBarActive = isActive
        );
    }

}
