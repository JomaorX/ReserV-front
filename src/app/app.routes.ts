import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Página de inicio
    { path: 'login', component: LoginComponent }, // Página de inicio de sesión
    { path: 'register', component: RegisterComponent }, // Página de registro
];
