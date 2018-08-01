import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from '@app/app.component';
import { AppRoutes } from '@app/app.routing';

import { HomeModule } from '@app/home/home.module';
import { PublicModule } from '@app/public/public.module';
import { RegAdminModule } from '@app/reg-admin/reg-admin.module';
import {EAAdminModule} from '@app/ea-admin/ea-admin.module';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        HomeModule,
        PublicModule,
        AppRoutes,
        RegAdminModule,
        EAAdminModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
