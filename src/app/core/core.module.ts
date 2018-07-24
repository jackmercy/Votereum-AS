import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '@app/core/guards/auth.guard';
import { VotedGuard } from '@app/core/guards/voted.guard';

import { CoreService } from '@app/core/services/core.service';
import { UserService } from '@app/core/services/user.service';
import { ContractService } from '@app/core/services/contract.service';

import { SharedModule } from '@app/shared/shared.module';

import { NavbarComponent } from '@app/core/nav/navbar.component';

import { throwIfAlreadyLoaded } from '@app/core/guards/module-import.guard';

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
