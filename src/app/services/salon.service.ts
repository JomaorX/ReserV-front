import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalonService {
  private apiUrl = 'http://localhost:3000/api/salons'; // URL del backend

  constructor(private http: HttpClient) {}

  // Crear un nuevo salón
  createSalon(name: string, location: string, openingHours: string) {
    return this.http.post(this.apiUrl, { name, location, openingHours });
  }

  // Obtener el salón del administrador autenticado
  getMySalon() {
    return this.http.get(`${this.apiUrl}/me`);
  }

  // Actualizar un salón
  updateSalon(id: number, name: string, location: string, openingHours: string) {
    return this.http.put(`${this.apiUrl}/${id}`, { name, location, openingHours });
  }
}
