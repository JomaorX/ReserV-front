import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/api/employees'; // URL del backend

  constructor(private http: HttpClient) {}

  // Obtener todos los empleados
  getEmployees() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear un nuevo empleado
  createEmployee(employeeData: any) {
    return this.http.post(this.apiUrl, employeeData);
  }

  // Actualizar un empleado
  updateEmployee(id: number, employeeData: any) {
    return this.http.put(`${this.apiUrl}/${id}`, employeeData);
  }

  // Eliminar un empleado
  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
