import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = environment.apiUrl+'/api/reservations'; // URL del backend
  private headers: HttpHeaders; // Configura el encabezado Authorization con el token

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = this.authService.getAuth();
  }

  // Crear una nueva reserva
  createReservation(reservationData: any) {
    return this.http.post(this.apiUrl, reservationData, {
      headers: this.headers,
    });
  }

  // Obtener todas las reservas del usuario autenticado
  getReservations() {
    return this.http.get<any[]>(this.apiUrl, { headers: this.headers });
  }

  // Obtener todas las reservas del usuario autenticado
  getSalonReservations() {
    return this.http.get<any[]>(this.apiUrl + '/reservations', {
      headers: this.headers,
    });
  }

  // Actualizar una reserva existente
  updateReservation(id: number, updatedData: any) {
    return this.http.put(`${this.apiUrl}/${id}`, updatedData, {
      headers: this.headers,
    });
  }

  // Eliminar una reserva
  deleteReservation(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}