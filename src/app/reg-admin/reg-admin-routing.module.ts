import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { MasterRegAdminComponent }  from './master-reg-admin/master-reg-admin.component';
import { VoterManagementComponent } from './voter-management/voter-management.component';
import { UnauthorizedComponent }    from '@shared/unauthorized/unauthorized.component';
/* Guard */
import { RaGuard }      from '@app/core/guards/ra.guard';


const regRoutes: Routes = [
    {
        path: '',
        canActivate: [RaGuard],
        component: MasterRegAdminComponent,
        children: [
            { path: '', redirectTo: '/reg-admin/voter', pathMatch: 'full'},
            { path: 'voter', component: VoterManagementComponent },
        ]
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
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
