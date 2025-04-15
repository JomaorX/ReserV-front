import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ReservationComponent } from './pages/reservation/reservation.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Página de inicio
    { path: 'login', component: LoginComponent }, // Página de inicio de sesión
    { path: 'register', component: RegisterComponent }, // Página de registro
    { path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard], // Proteger la ruta con AuthGuard
    },
    { path: 'reservation',
        component: ReservationComponent,
        canActivate: [authGuard], // Proteger la ruta con AuthGuard
    },
];
