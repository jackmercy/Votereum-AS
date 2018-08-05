import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
/* Modules */
import { SharedModule }          from '@shared/shared.module';
import { RegAdminRoutingModule } from '@app/reg-admin/reg-admin-routing.module';
/* Components */
import { MasterRegAdminComponent }  from './master-reg-admin/master-reg-admin.component';
import { VoterManagementComponent } from './voter-management/voter-management.component';
import { RegAdminService } from '@services/reg-admin.service';
import { ObjectKeysPipe } from '@shared/pipes/object-keys.pipe';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,

        RegAdminRoutingModule
    ],
    providers: [
        RegAdminService
    ],
    declarations: [
        MasterRegAdminComponent,
        VoterManagementComponent

    ]
})
export class RegAdminModule { }
