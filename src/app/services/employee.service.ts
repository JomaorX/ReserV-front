import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/api/employees'; // URL del backend
  private headers: HttpHeaders; // Configura el encabezado Authorization con el token

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = this.authService.getAuth();
  }

  // Obtener todos los empleados
  getEmployees() {
    return this.http.get<any[]>(this.apiUrl, { headers: this.headers });
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

