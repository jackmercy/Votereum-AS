import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRegAdminComponent } from './master-reg-admin/master-reg-admin.component';
import {SharedModule} from '@shared/shared.module';
import { VoterManagementComponent } from './voter-management/voter-management.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        MasterRegAdminComponent,
        VoterManagementComponent
    ]
})
export class RegAdminModule { }
