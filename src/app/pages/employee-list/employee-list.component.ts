import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  imports: [],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data; // Asigna los empleados recibidos
      },
      error: (error) => {
        console.error('Error al obtener los empleados:', error);
      },
    });
  }
}
