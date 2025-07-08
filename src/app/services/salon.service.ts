import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalonService {
  private apiUrl = environment.apiUrl+'/api/salons'; // URL del backend
  private headers: HttpHeaders; // Configura el encabezado Authorization con el token

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = this.authService.getAuth();
  }

  // Crear un nuevo salón
  createSalon(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, { headers: this.headers });
  }

  // Obtener el salón del administrador autenticado
  getMySalon(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`, { headers: this.headers });
  }

  getSalonById(salonId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?salonId=${salonId}`, {
      headers: this.headers,
    });
  }

  getAllSalons(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // GET a /api/salons
  }

  // Actualizar un salón
  updateSalon(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, {
      headers: this.headers,
    });
  }

  // Obtener todos los salones
  getSalons() {
    return this.http.get<any[]>(this.apiUrl, { headers: this.headers });
  }
}
