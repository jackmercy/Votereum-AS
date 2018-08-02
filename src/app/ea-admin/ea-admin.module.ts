import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
/* Modules */
import { EaAdminRoutingModule } from '@app/ea-admin/ea-admin-routing.module';
import { SharedModule }         from '@shared/shared.module';
/* Components */
import { MasterEaAdminComponent } from './master-ea-admin/master-ea-admin.component';
import { TestContentComponent }   from './test-content/test-content.component';
import { TestRoutingComponent }   from './test-routing/test-routing.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,

        EaAdminRoutingModule
    ],
    declarations: [
        MasterEaAdminComponent,
        TestContentComponent,
        TestRoutingComponent
    ]
})
export class EAAdminModule { }
