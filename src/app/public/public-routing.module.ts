import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { MasterPublicComponent } from '@app/public/master-public/master-public.component';
import { LoginComponent }        from '@app/public/login/login.component';

const publicRoutes: Routes = [
    {
        path: '',
        component: MasterPublicComponent,
        children: [
            { path: '', redirectTo: '/login', pathMatch: 'full'},
            { path: 'login', component: LoginComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(publicRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PublicRoutingModule {}
