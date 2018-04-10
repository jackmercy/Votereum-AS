import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './components/public.component';
/* Modules */
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule
  ],
  exports: [],
  declarations: [PublicComponent, LoginComponent, RegisterComponent]
})
export class PublicModule { }
