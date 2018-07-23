import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { VotedGuard } from './guards/voted.guard';

import { CoreService } from './services/core.service';
import { UserService } from './services/user.service';
import { ContractService } from './services/contract.service';

import { SharedModule } from '../shared/shared.module';

import { NavbarComponent } from './nav/navbar.component';

import { throwIfAlreadyLoaded } from './guards/module-import.guard';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule
    ],
    declarations: [
        NavbarComponent
    ],
    exports: [
        NavbarComponent
    ],
    providers: [
        CoreService,
        UserService,
        ContractService,
        AuthGuard,
        VotedGuard
  ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
 }
