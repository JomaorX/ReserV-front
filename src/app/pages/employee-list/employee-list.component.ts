import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  employeeForm: FormGroup;
  employees: any[] = [];

  constructor(private employeeService: EmployeeService) {
    this.employeeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  // Cargar empleados desde el backend
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.error('Error al obtener los empleados:', error);
      },
    });
  }

  // Agregar un nuevo empleado
  addEmployee(): void {
    if (this.employeeForm.valid) {
      const { name, email, role } = this.employeeForm.value;
      this.employeeService.createEmployee({ name, email, role }).subscribe({
        next: () => {
          alert('Empleado agregado correctamente.');
          this.employeeForm.reset(); // Limpiar el formulario
          this.loadEmployees(); // Recargar la lista
        },
        error: (error) => {
          console.error('Error al agregar el empleado:', error);
          alert('Error al agregar el empleado.');
        },
      });
    }
  }

  // Eliminar un empleado
  deleteEmployee(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          alert('Empleado eliminado correctamente.');
          this.loadEmployees(); // Recargar la lista
        },
        error: (error) => {
          console.error('Error al eliminar el empleado:', error);
          alert('Error al eliminar el empleado.');
        },
      });
    }
  }
}
