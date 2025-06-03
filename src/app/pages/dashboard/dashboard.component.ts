import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SalonService } from '../../services/salon.service';
import { Salon } from '../../interfaces/salon'; // Asegúrate de tener esta interfaz creada

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userData: any = null;
  salones: Salon[] = [];

  constructor(private salonService: SalonService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    console.log('Token encontrado:', token);

    if (token) {
      try {
        this.userData = JSON.parse(atob(token.split('.')[1]));
        console.log('Datos de usuario decodificados:', this.userData);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        this.logout();
      }
    } else {
      console.warn('Token no encontrado. Redirigiendo...');
      this.logout();
    }

    this.salonService.getSalons().subscribe({

      next: (data: Salon[]) => {
        console.log('✅ Salones cargados correctamente:', data);
        this.salones = data;
      },
      error: (err) => {
        console.error('❌ Error al cargar salones:', err);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
