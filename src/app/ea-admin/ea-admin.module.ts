import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
/* Modules */
import { NgxChartsModule }      from '@swimlane/ngx-charts';
import { EaAdminRoutingModule } from '@app/ea-admin/ea-admin-routing.module';
import { SharedModule }         from '@shared/shared.module';
/* Components */
import { MasterEaAdminComponent } from './master-ea-admin/master-ea-admin.component';
import { BallotSetupComponent } from './ballot-setup/ballot-setup.component';
import { ManagementComponent } from './management/management.component';
import { FinalizeDialogComponent } from './finalize-dialog/finalize-dialog.component';
import { SetupConfirmDialogComponent } from './setup-confirm-dialog/setup-confirm-dialog.component';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        NgxChartsModule,

        EaAdminRoutingModule
    ],
    declarations: [
        MasterEaAdminComponent,
        BallotSetupComponent,
        ManagementComponent,
        FinalizeDialogComponent,
        SetupConfirmDialogComponent
    ],
    entryComponents: [
        FinalizeDialogComponent,
        SetupConfirmDialogComponent
    ]
})
export class EAAdminModule { }
