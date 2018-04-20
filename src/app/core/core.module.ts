import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { VotedGuard } from './guards/voted.guard';

import { CoreService } from './services/core.service';
import { UserService } from './services/user.service';

import { SharedModule } from '../shared/shared.module';

import { NavbarComponent } from './components/navbar.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  providers: [
    CoreService,
    UserService,
    AuthGuard,
    VotedGuard
  ]
})
export class CoreModule { }
