import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = environment.apiUrl+'/api/employees';
  private headers: HttpHeaders;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = this.authService.getAuth();
  }

  // Obtener todos los empleados
  getEmployees() {
    return this.http.get<any[]>(this.apiUrl, { headers: this.headers });
  }

  getEmployeesBySalon(salonId: number) {
    return this.http.get<any[]>(`${this.apiUrl}?salonId=${salonId}`,{ headers: this.headers });
  }

  // Crear un nuevo empleado
  createEmployee(employeeData: any) {
    return this.http.post(this.apiUrl, employeeData, { headers: this.headers });
  }

  // Eliminar un empleado
  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}

