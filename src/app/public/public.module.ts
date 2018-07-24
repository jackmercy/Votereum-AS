import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterPublicComponent } from '@app/public/master-public/master-public.component';
/* Modules */

import { SharedModule } from '@app/shared/shared.module';
import { LoginComponent } from '@app/public/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [],
  declarations: [MasterPublicComponent, LoginComponent]
})
export class PublicModule { }
