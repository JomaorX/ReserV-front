import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SalonService {
  private apiUrl = 'http://localhost:3000/api/salons'; // URL del backend
  private headers: HttpHeaders; // Configura el encabezado Authorization con el token

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = this.authService.getAuth();
  }

  // Crear un nuevo salón
  createSalon(name: string, location: string, openingHours: string) {
    return this.http.post(this.apiUrl, { name, location, openingHours }, {headers: this.headers});
  }

  // Obtener el salón del administrador autenticado
  getMySalon() {
    return this.http.get(`${this.apiUrl}/me`, {headers: this.headers});
  }

  // Actualizar un salón
  updateSalon(id: number, name: string, location: string, openingHours: string) {
    return this.http.put(`${this.apiUrl}/${id}`, { name, location, openingHours }, {headers: this.headers});
  }

  // Obtener todos los salones
  getSalons() {
    return this.http.get<any[]>(this.apiUrl, {headers: this.headers});
  }
}
