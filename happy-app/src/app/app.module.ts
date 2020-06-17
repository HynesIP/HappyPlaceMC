import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule,CUSTOM_ELEMENTS_SCHEMA, Provider, forwardRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { SplashModule } from './splash.module';
import { ExamplesModule } from './examples/examples.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { JwtModule } from '@auth0/angular-jwt';
import { TalkComponent } from './talk/talk.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PMComponent } from './pm/pm.component';
import { SplashComponent } from './splash.component';
import { NgxStripeModule } from '@nomadreservations/ngx-stripe';
import { StripeCheckout, StripeModule } from 'ngx-stripe-checkout';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

import { ApiModule } from './api/api.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './api/api.interceptor';

export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptor),
  multi: true
};

export function tokenGetter() {
    return localStorage.getItem('access_token');
  }

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        TalkComponent,
        LoginComponent,
        SignupComponent,
        PMComponent,
        SplashComponent
    ],
    imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        SplashModule,
        ExamplesModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatToolbarModule,
        MatCardModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter
          }
        }),
        NgxStripeModule.forRoot("pk_test_gEBsCSok1NfVPeBLfBRQCtPz00KQpcBsbt"),
        StripeModule,
        JwBootstrapSwitchNg2Module,
        ApiModule.forRoot({rootUrl: "mongo"})
    ],
    exports:[ 
        SplashComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        StripeCheckout,
        ApiInterceptor,
        API_INTERCEPTOR_PROVIDER
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
