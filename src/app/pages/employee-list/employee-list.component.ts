import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotificationService } from '../../services/notificacion.service';

@Component({
  selector: 'app-employee-list',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  employeeForm: FormGroup;
  employees: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private notificationService: NotificationService
  ) {
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
        this.notificationService.showError('Error al obtener los empleados.');
      },
    });
  }

  // Agregar un nuevo empleado
  addEmployee(): void {
    if (this.employeeForm.valid) {
      const { name, email, role } = this.employeeForm.value;
      this.employeeService.createEmployee({ name, email, role }).subscribe({
        next: () => {
          this.notificationService.showSuccess(
            'Empleado agregado correctamente.'
          );
          this.employeeForm.reset(); // Limpiar el formulario
          this.loadEmployees(); // Recargar la lista
        },
        error: (error) => {
          console.error('Error al agregar el empleado:', error);
          this.notificationService.showError('Error al agregar el empleado.');
        },
      });
    } else {
      this.notificationService.showWarning(
        'Por favor, completa todos los campos.'
      );
    }
  }

  // Eliminar un empleado
  deleteEmployee(id: number): void {
    this.notificationService
      .showConfirmation('¿Estás seguro de que deseas eliminar este empleado?')
      .then((confirmed) => {
        if (confirmed) {
          this.employeeService.deleteEmployee(id).subscribe({
            next: () => {
              this.notificationService.showSuccess(
                'Empleado eliminado correctamente.'
              );
              this.loadEmployees(); // Recargar la lista
            },
            error: (error) => {
              console.error('Error al eliminar el empleado:', error);
              this.notificationService.showError(
                'Error al eliminar el empleado.'
              );
            },
          });
        }
      });
  }
}
