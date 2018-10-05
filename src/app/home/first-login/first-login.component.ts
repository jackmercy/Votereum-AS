import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router }            from '@angular/router';
import { UserService }       from '@services/user.service';
import { MatSnackBar }       from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
        const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

        return (invalidCtrl || invalidParent);
    }
}

@Component({
    selector: 'app-first-login',
    templateUrl: './first-login.component.html',
    styleUrls: ['./first-login.component.scss']
})
export class FirstLoginComponent implements OnInit {
    myForm: FormGroup;
    matcher = new MyErrorStateMatcher();

    ngOnInit() {

    }

    constructor(private _userService: UserService,
                private formBuilder: FormBuilder,
                private _router: Router,
                public snackBar: MatSnackBar) {
      this.myForm = this.formBuilder.group({
        password: ['', [Validators.required]],
        confirmPassword: ['']
      }, { validator: this.checkPasswords });

    }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        const pass = group.controls.password.value;
        const confirmPass = group.controls.confirmPassword.value;

        return pass === confirmPass ? null : { notSame: true };
    }

    get newPassword() {
        return this.myForm.get('password');
    }

    onChangePassword() {
        const newPassword = this.newPassword.value;
        this._userService.changePassword(newPassword)
            .subscribe(
                data => {
                    const msg = data.message;
                    this.snackBar.open(msg , 'OK', {
                        duration: 5000,
                    });
                    this._userService.updateLocalIsFirstLogin();
                    this._router.navigate(['/home/voting']);
                },
                error => {
                    const msg = error.error.message;
                    this.snackBar.open(msg , 'OK', {
                        duration: 3000,
                    });
                }
            );
    }

}
