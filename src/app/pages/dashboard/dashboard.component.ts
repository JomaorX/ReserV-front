import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  userData: any; // Almacena los datos del usuario autenticado

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Obtener los datos del usuario desde el token
    this.userData = this.authService.getUserData();
    console.log('Datos del usuario:', this.userData);

    // Si no hay datos de usuario, redirigir al inicio de sesión
    if (!this.userData) {
      alert('No estás autenticado. Redirigiendo al inicio de sesión...');
      this.authService.logout();
    }
  }

  logout() {
    this.authService.logout(); // Cerrar sesión
  }
}