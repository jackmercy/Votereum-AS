import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterEaAdminComponent } from './master-ea-admin/master-ea-admin.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [MasterEaAdminComponent]
})
export class EAAdminModule { }
