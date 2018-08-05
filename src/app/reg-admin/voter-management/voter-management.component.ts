import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {User} from '@core/model/user';
import {RegAdminService} from '@services/reg-admin.service';

@Component({
    selector: 'app-voter-management',
    templateUrl: './voter-management.component.html',
    styleUrls: ['./voter-management.component.scss']
})
export class VoterManagementComponent implements OnInit {

    userId: string;
    idFormControl: FormControl;
    generatedPassword: string;
    user: User;
    userKeyDescription: Object = {
        id: 'ID number',
        firstName: 'Firstname',
        lastName: 'Lastname',
        gender: 'Gender',
        birthDate: 'Date of birth',
        homeTown: 'Home town',
        address: 'Address'
    };

    constructor(private _formBuilder: FormBuilder,
                private _regAdminService: RegAdminService) { }

    ngOnInit() {
        this.userId = '123456555';
        this.user = new User();

        this.idFormControl = new FormControl('', Validators.required);
    }


    generatePassword() {
        this._regAdminService.getGeneratedPassword(this.userId).subscribe(data => this.generatedPassword = data['password']);
    }

    searchUser() {
        this.userId = this.idFormControl.value;
        this._regAdminService.getUserInfo(this.userId).subscribe(data => {
            console.log(data);
            this.user = <User> data;
        });
    }
}
