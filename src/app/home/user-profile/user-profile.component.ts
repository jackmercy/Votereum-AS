import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    userProfile: any;
    voterAddress: any;

    constructor(private _userService: UserService) { }

    ngOnInit() {
        this.userProfile = this._userService.getCitizenInfo();
        const citizenID = this._userService.getId();
        this.voterAddress = this._userService.getVoterAddress(citizenID).subscribe(
            data => {
                this.voterAddress = data['address'];
            },
            error => {
                console.log(error);
            }
        );
    }

}
