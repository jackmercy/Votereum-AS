import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRegAdminComponent } from './master-reg-admin/master-reg-admin.component';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [MasterRegAdminComponent]
})
export class RegAdminModule { }
