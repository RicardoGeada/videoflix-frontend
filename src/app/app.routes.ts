import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { BrowsePageComponent } from './browse-page/browse-page.component';
import { VideoplayerPageComponent } from './videoplayer-page/videoplayer-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent},
    { path: 'login', component: LoginPageComponent},
    { path: 'signup', component: SignUpPageComponent},
    { path: 'reset-password', component: ResetPasswordPageComponent},
    { path: 'forgot-password', component: ForgotPasswordPageComponent},
    { path: 'browse', component: BrowsePageComponent},
    { path: 'play', component: VideoplayerPageComponent},
];
