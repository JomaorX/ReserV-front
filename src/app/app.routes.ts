import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { MyReservationsComponent } from './pages/my-reservations/my-reservations.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { adminGuard } from './guards/admin.guard';
import { UnavailableDaysComponent } from './pages/unvailable-days/unvailable-days.component';
import { ServicesComponent } from './pages/services/services.component';
import { SalonComponent } from './pages/salon/salon.component';
import { SalonDetailComponent } from './pages/salon-detail/salon-detail.component';



export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página de inicio
  { path: 'login', component: LoginComponent }, // Página de inicio de sesión
  { path: 'register', component: RegisterComponent }, // Página de registro
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard], // Proteger la ruta con AuthGuard
  },
  {
    path: 'reservation',
    component: ReservationComponent,
    canActivate: [authGuard], // Proteger la ruta con AuthGuard
  },
  {
    path: 'my-reservations',
    component: MyReservationsComponent,
    canActivate: [authGuard], // Proteger la ruta con AuthGuard
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminGuard], // Proteger la ruta con AuthGuard
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [adminGuard], // Proteger la ruta con AuthGuard
  },
  {
    path: 'unvailable-days',
    component: UnavailableDaysComponent,
    canActivate: [adminGuard], // Proteger la ruta con AuthGuard
  },
  {
    path: 'services',
    component: ServicesComponent,
    canActivate: [adminGuard], // Proteger la ruta con AuthGuard
  },
  {
    path: 'salon',
    component: SalonComponent,
    canActivate: [adminGuard], // Proteger la ruta con AuthGuard
  },
  {
    path: 'salon/:id',
    component: SalonDetailComponent,
    canActivate: [authGuard],
  },
];

