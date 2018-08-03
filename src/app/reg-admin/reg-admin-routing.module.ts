import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { MasterRegAdminComponent }  from './master-reg-admin/master-reg-admin.component';
import { VoterManagementComponent } from './voter-management/voter-management.component';

const regRoutes: Routes = [
    {
        path: '',
        component: MasterRegAdminComponent,
        children: [
            { path: '', redirectTo: '/reg-admin/voter', pathMatch: 'full'},
            { path: 'voter', component: VoterManagementComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(regRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RegAdminRoutingModule {}
