import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UnavailableDayService {
  private apiUrl = environment.apiUrl+'/api/unavailable-days'; // URL del backend
  private headers: HttpHeaders; // Configura el encabezado Authorization con el token

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = this.authService.getAuth();
  }

  // Obtener todos los días no disponibles
  getUnavailableDays() {
    return this.http.get<any[]>(this.apiUrl, { headers: this.headers });
  }

  getUnavailableDaysBySalon(salonId: number) {
    return this.http.get<any[]>(`${this.apiUrl}?salonId=${salonId}`, {
      headers: this.headers,
    });
  }

  // Crear un nuevo día no disponible
  createUnavailableDay(date: string, reason: string) {
    return this.http.post(
      this.apiUrl,
      { date, reason },
      { headers: this.headers }
    );
  }

  // Eliminar un día no disponible
  deleteUnavailableDay(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
