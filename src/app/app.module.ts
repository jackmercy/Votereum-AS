import { BrowserModule }           from '@angular/platform-browser';
import { NgModule }                from '@angular/core';
import { HttpClientModule }        from '@angular/common/http';
import { FormsModule }             from '@angular/forms';
import { Router, RouterModule }    from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent }     from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { SharedModule }     from '@app/shared/shared.module';
import { CoreModule }       from '@app/core/core.module';
import { JwtModule }        from '@auth0/angular-jwt';
import { STRING_CONFIG }    from '@config/string.config';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        RouterModule,

        AppRoutingModule,
        SharedModule,
        CoreModule,

        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:5000/api/'],
                blacklistedRoutes: ['localhost:5000/api/user/auth'],
                skipWhenExpired: true
            }
        })
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

export function tokenGetter() {
    const token = sessionStorage.getItem(STRING_CONFIG.ACCESS_TOKEN);

    return token;
}
