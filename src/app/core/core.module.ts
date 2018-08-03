import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/* Modules */
import { SharedModule } from '@app/shared/shared.module';

/* Guard */
import { AuthGuard }    from '@app/core/guards/auth.guard';
import { VotedGuard }   from '@app/core/guards/voted.guard';

/* Services */
import { CandidateService } from '@services/candidate.service';
import { UserService }      from '@services/user.service';
import { ContractService }  from '@services/contract.service';
import { MessageService }   from '@services/message.service';

/* Others */
import { throwIfAlreadyLoaded } from '@app/core/guards/module-import.guard';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        CandidateService,
        UserService,
        ContractService,
        MessageService,
        AuthGuard,
        VotedGuard
  ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
 }
