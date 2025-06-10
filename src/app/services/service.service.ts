import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiUrl = 'http://localhost:3000/api/services'; // URL del backend
  private headers: HttpHeaders; // Configura el encabezado Authorization con el token

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = this.authService.getAuth();
  }

  // Obtener todos los servicios
  getServices() {
    return this.http.get<any[]>(this.apiUrl, { headers: this.headers });
  }

  getServicesBySalon(salonId: number) {
    return this.http.get<any[]>(`${this.apiUrl}?salonId=${salonId}`, {
      headers: this.headers,
    });
  }

  // Crear un nuevo servicio
  createService(
    name: string,
    description: string,
    price: number,
    duration: number
  ) {
    return this.http.post(
      this.apiUrl,
      { name, description, price, duration },
      { headers: this.headers }
    );
  }

  // Actualizar un servicio
  updateService(
    id: number,
    name: string,
    description: string,
    price: number,
    duration: number
  ) {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      { name, description, price, duration },
      { headers: this.headers }
    );
  }

  // Eliminar un servicio
  deleteService(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
