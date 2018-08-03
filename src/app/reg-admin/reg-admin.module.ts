import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRegAdminComponent } from './master-reg-admin/master-reg-admin.component';
import {SharedModule} from '@shared/shared.module';
import { VoterManagementComponent } from './voter-management/voter-management.component';
import { RegAdminService } from '@services/reg-admin.service';
import { ObjectKeysPipe } from '@shared/pipes/object-keys.pipe';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
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
