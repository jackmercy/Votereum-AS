import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Guard */
import { AuthGuard }         from '@app/core/guards/auth.guard';

/* Core/Shared */
import { NotFoundComponent } from '@app/shared/not-found/not-found.component';
/* Modules */
import { PublicModule }   from '@public/public.module';
import { HomeModule }     from '@home/home.module';
import { EAAdminModule }  from './ea-admin/ea-admin.module';
import { RegAdminModule } from './reg-admin/reg-admin.module';

const moduleRoutes: Routes = [
    { path: '',   redirectTo: '', pathMatch: 'full' },
    {
        path: '',
        /* loadChildren: './public/public.module#PublicModule', */
        loadChildren: () => PublicModule
    },
    {
        path: 'ea-admin',
        canActivate: [AuthGuard],
        /* loadChildren: './ea-admin/ea-admin.module#EAAdminModule', */
        loadChildren: () => EAAdminModule
    },
    {
        path: 'reg-admin',
        canActivate: [AuthGuard],
        /* loadChildren: './reg-admin/reg-admin.module#RegAdminModule', */
        loadChildren: () => RegAdminModule
    },
    {
        path: 'home',
        canActivate: [AuthGuard],
        /* loadChildren: './home/home.module#HomeModule', */
        loadChildren: () => HomeModule
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

