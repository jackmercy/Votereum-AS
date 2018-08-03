import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
/* Modules */
import { SharedModule }        from '@app/shared/shared.module';
import { PublicRoutingModule } from '@public/public-routing.module';

/* Components */
import { MasterPublicComponent } from '@app/public/master-public/master-public.component';
import { LoginComponent }        from '@app/public/login/login.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,

        PublicRoutingModule,
        SharedModule
    ],
    exports: [],
    declarations: [
        MasterPublicComponent,
        LoginComponent
    ]
})
export class PublicModule { }
