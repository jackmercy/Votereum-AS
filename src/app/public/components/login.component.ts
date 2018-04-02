import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CoreService } from '../../core/services/core.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  canDisableSignInButton: boolean;
  isLoggedIn: any;

  constructor(private _formBuilder: FormBuilder,
              private _coreService: CoreService,
              private _router: Router,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
      this.loginFormGroup = this._formBuilder.group({
          user: ['', Validators.required],
          role: ['', Validators.required]
      });
      // this._coreService.getAllUser().subscribe( data => console.log(data));
      this.canDisableSignInButton = false;
  }

  onLogin() {
      this.isLoggedIn = this._coreService.login(this.username.value, this.role.value);
      if (this.isLoggedIn) {
          this._router.navigate(['/home/gift-card']);
      } else {
          this.snackBar.open('No user is found', 'Got it', {
              duration: 5000,
          });
      }
  }

  get username() {
      return this.loginFormGroup.get('user');
  }

  get role() {
      return this.loginFormGroup.get('role');
  }

  getUserErrorMessage() {
      return this.username.hasError('required') ? 'Mandatory information' : '';
  }

  getRoleErrorMessage() {
      return this.role.hasError('required') ? 'Mandatory information' : '';
  }

}
