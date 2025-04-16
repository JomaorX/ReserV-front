import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:3000/api/services'; // URL del backend

  constructor(private http: HttpClient) {}

  // Obtener todos los servicios
  getServices() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear un nuevo servicio
  createService(name: string, description: string, price: number, duration: number) {
    return this.http.post(this.apiUrl, { name, description, price, duration });
  }

  // Actualizar un servicio
  updateService(id: number, name: string, description: string, price: number, duration: number) {
    return this.http.put(`${this.apiUrl}/${id}`, { name, description, price, duration });
  }

  // Eliminar un servicio
  deleteService(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
