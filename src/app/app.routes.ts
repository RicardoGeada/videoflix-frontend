import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent},
    { path: 'login', component: LoginPageComponent},
    { path: 'signup', component: SignUpPageComponent},
];
