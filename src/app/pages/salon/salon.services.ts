import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SalonService {
  private apiUrl = 'http://localhost:3000/api/salons';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getMySalon(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`, {
      headers: this.getHeaders()
    });
  }

  createSalon(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, {
      headers: this.getHeaders()
    });
  }

  updateSalon(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, {
      headers: this.getHeaders()
    });
  }
  userData: any;
salones: any[] = [];

  getAllSalons(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl); // GET a /api/salons
}
getSalonById(id: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/${id}`);
}

}

