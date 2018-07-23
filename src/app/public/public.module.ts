import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterPublicComponent } from './master-public/master-public.component';
/* Modules */

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [],
  declarations: [MasterPublicComponent, LoginComponent]
})
export class PublicModule { }
