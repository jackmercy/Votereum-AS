import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Modules */
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
/* Components */
import { MasterEaAdminComponent } from './master-ea-admin/master-ea-admin.component';
import { RouterModule } from '@angular/router';
import { TestContentComponent } from './test-content/test-content.component';
import { TestRoutingComponent } from './test-routing/test-routing.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CoreModule,
        SharedModule
    ],
    declarations: [
        MasterEaAdminComponent,
        TestContentComponent,
        TestRoutingComponent
    ]
})
export class EAAdminModule { }
