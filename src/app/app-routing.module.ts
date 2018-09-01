import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Guard */
import { AuthGuard }  from '@app/core/guards/auth.guard';
import { VotedGuard } from '@app/core/guards/voted.guard';
/* Core/Shared */
import { NotFoundComponent } from '@app/shared/not-found/not-found.component';

const moduleRoutes: Routes = [
    { path: '',   redirectTo: '', pathMatch: 'full' },
    {
        path: '',
        loadChildren: './public/public.module#PublicModule',
    },
    {
        path: 'ea-admin',
        /* canActivate: [AuthGuard], */
        loadChildren: './ea-admin/ea-admin.module#EAAdminModule',
    },
    {
        path: 'reg-admin',
        /* canActivate: [AuthGuard], */
        loadChildren: './reg-admin/reg-admin.module#RegAdminModule',
    },
    {
        path: 'home',
        /* canActivate: [AuthGuard], */
        loadChildren: './home/home.module#HomeModule',
    },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            moduleRoutes,
            {onSameUrlNavigation: 'reload'}
            /* { enableTracing: true } */ // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }

