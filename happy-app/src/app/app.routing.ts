import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { SplashComponent } from './splash.component';
import { LandingComponent } from './examples/landing/landing.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { TalkComponent } from './talk/talk.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PMComponent } from './pm/pm.component';

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',                 component: SplashComponent },
    { path: 'signup',               component:SignupComponent},
    { path: 'login',                component:LoginComponent},
    { path: 'talk',                 component:TalkComponent,    canActivate: [AuthGuard]},
    { path: 'pm',                   component:PMComponent,      canActivate: [AuthGuard]},
    { path: 'payment/success',      component: SplashComponent },
    { path: 'payment/failure',      component: SplashComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'examples/profile',     component: ProfileComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
