import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from '@angular/router';

import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';

import { HomeModule } from '@app/home/home.module';
import { PublicModule } from '@app/public/public.module';
import { RegAdminModule } from '@app/reg-admin/reg-admin.module';
import {EAAdminModule} from '@app/ea-admin/ea-admin.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,

        SharedModule
        /* RegAdminModule,
        HomeModule,
        PublicModule,
        EAAdminModule*/
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    // Diagnostic only: inspect router configuration
    constructor(router: Router) {
        console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }
}
