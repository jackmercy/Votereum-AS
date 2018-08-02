import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { MasterEaAdminComponent } from './master-ea-admin/master-ea-admin.component';
import { TestContentComponent }   from './test-content/test-content.component';
import { TestRoutingComponent }   from './test-routing/test-routing.component';

const eaRoutes: Routes = [
    {
        path: '',
        component: MasterEaAdminComponent,
        children: [
            { path: '', redirectTo: '/ea-admin/control', pathMatch: 'full'},
            { path: 'control', component: TestContentComponent },
            { path: 'test-route', component: TestRoutingComponent }
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
