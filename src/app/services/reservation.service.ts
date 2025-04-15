import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode'; // Importa jwtDecode para decodificar el token

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/api/reservations'; // URL del backend

  constructor(private http: HttpClient) {}

  // Crear una nueva reserva
  createReservation(reservationData: any) {
    const token = localStorage.getItem('token'); // Obtén el token del usuario autenticado

    if (!token) {
      console.error('Token no encontrado en localStorage.');
      throw new Error('Token no encontrado. Inicia sesión nuevamente.');
    }

    // Configura el encabezado Authorization con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    });

    return this.http.post(this.apiUrl, reservationData, { headers });
  }

  // Obtener todas las reservas del usuario autenticado
  getReservations() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Actualizar una reserva existente
  updateReservation(id: number, updatedData: any) {
    return this.http.put(`${this.apiUrl}/${id}`, updatedData);
  }

  // Eliminar una reserva
  deleteReservation(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}