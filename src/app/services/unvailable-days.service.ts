import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnavailableDayService {
  private apiUrl = 'http://localhost:3000/api/unavailable-days'; // URL del backend

  constructor(private http: HttpClient) {}

  // Obtener todos los días no disponibles
  getUnavailableDays() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear un nuevo día no disponible
  createUnavailableDay(date: string, reason: string) {
    return this.http.post(this.apiUrl, { date, reason });
  }

  // Eliminar un día no disponible
  deleteUnavailableDay(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
