import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { MyReservationsComponent } from './pages/my-reservations/my-reservations.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { adminGuard } from './guards/admin.guard';
import { UnavailableDaysComponent } from './pages/unvailable-days/unvailable-days.component';
import { ServicesComponent } from './pages/services/services.component';
import { SalonComponent } from './pages/salon/salon.component';
import { SalonDetailComponent } from './pages/salon-detail/salon-detail.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';



export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página de inicio
  { path: 'login', component: LoginComponent }, // Página de inicio de sesión
  { path: 'register', component: RegisterComponent }, // Página de registro
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'my-reservations',
    component: MyReservationsComponent,
  },
  {
    path: 'reservations',
    component: ReservationsComponent,
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
  },
  {
    path: 'unvailable-days',
    component: UnavailableDaysComponent,
  },
  {
    path: 'services',
    component: ServicesComponent,
  },
  {
    path: 'salon',
    component: SalonComponent,
  },
  {
    path: 'salon/:id',
    component: SalonDetailComponent,
  },
];

