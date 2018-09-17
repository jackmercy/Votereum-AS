import { Component, OnInit } from '@angular/core';
import { MatSnackBar }       from '@angular/material';
import { User }              from '@core/model/user';
import { RegAdminService }   from '@services/reg-admin.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
    selector: 'app-voter-management',
    templateUrl: './voter-management.component.html',
    styleUrls: ['./voter-management.component.scss']
})
export class VoterManagementComponent implements OnInit {

    userId: string;
    idFormControl: FormControl;
    generatedNewPassword: string;
    generatedUserId: String;
    generatedUserPassword: String;
    user: User;
    hasSystemAccount: Boolean;
    userKeyDescription: Object = {
        citizenId: 'ID number',
        firstName: 'Firstname',
        lastName: 'Lastname',
        gender: 'Gender',
        birthDate: 'Date of birth',
        homeTown: 'Home town',
        address: 'Address',
    };
    isCitizenExist: boolean;

    constructor(private _formBuilder: FormBuilder,
                private _regAdminService: RegAdminService,
                public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.user = new User();
        this.isCitizenExist = false;

        this.idFormControl = new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$')
        ]);

        this.idFormControl.valueChanges.subscribe(data => {
            if (this.isCitizenExist) {
                this.isCitizenExist = !this.isCitizenExist;
                this.generatedNewPassword = '';
            }
        });
        this.hasSystemAccount = false;
    }


    generateNewPassword() {
        this._regAdminService.getGeneratedNewPassword(this.userId).subscribe(
            data => {
                if (!data['err']) {
                    this.generatedNewPassword = data['password'];
                }
            },
            error => {
                const msg = error.error.message;
                this.snackBar.open(msg , 'Got it', {
                    duration: 3000,
                });
            }
        );
    }

    generateSystemAccount() {
        this._regAdminService.generateUserSystemAccount(this.userId).subscribe(
            data => {
                if (!data['err']) {
                    this.generatedUserId = data['userId'];
                    this.generatedUserPassword = data['defaultPassword'];
                } else if (data['err']) {
                    console.log(data['message']);
                }
            },
            error => {
                const msg = error.error.message;
                this.snackBar.open(msg , 'Got it', {
                    duration: 3000,
                });
            }
        );
    }

    searchUser() {
        this.userId = this.idFormControl.value;
        this._regAdminService.getCitizenInfo(this.userId).subscribe(data => {
            console.log(data);
            this.user = <User> data;
            this.isCitizenExist = true;
            this.hasSystemAccount = data['hasSystemAccount'];
        }, error => {
            this.isCitizenExist = false;
            console.log(error);
        });
        this.generatedNewPassword = '';
        this.generatedUserId = '';
        this.generatedUserPassword = '';
    }
}
