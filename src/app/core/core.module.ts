import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreService } from './services/core.service';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './components/navbar.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  providers: [CoreService]
})
export class CoreModule { }
