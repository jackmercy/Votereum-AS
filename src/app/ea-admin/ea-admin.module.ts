import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
/* Modules */
import { EaAdminRoutingModule } from '@app/ea-admin/ea-admin-routing.module';
import { SharedModule }         from '@shared/shared.module';
/* Components */
import { MasterEaAdminComponent } from './master-ea-admin/master-ea-admin.component';
import { BallotSetupComponent } from './ballot-setup/ballot-setup.component';
import { ManagementComponent } from './management/management.component';
import { FinalizeDialogComponent } from './finalize-dialog/finalize-dialog.component';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,

        EaAdminRoutingModule
    ],
    declarations: [
        MasterEaAdminComponent,
        BallotSetupComponent,
        ManagementComponent,
        FinalizeDialogComponent
    ],
    entryComponents: [
        FinalizeDialogComponent
    ]
})
export class EAAdminModule { }
