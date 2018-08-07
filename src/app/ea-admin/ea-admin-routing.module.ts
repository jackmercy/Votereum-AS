import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { MasterEaAdminComponent } from './master-ea-admin/master-ea-admin.component';
import { BallotSetupComponent } from './ballot-setup/ballot-setup.component';
import { ManagementComponent } from './management/management.component';


const eaRoutes: Routes = [
    {
        path: '',
        component: MasterEaAdminComponent,
        children: [
            { path: '', redirectTo: '/ea-admin/management', pathMatch: 'full'},
            { path: 'setup', component: BallotSetupComponent },
            { path: 'management', component: ManagementComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(eaRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class EaAdminRoutingModule {}
