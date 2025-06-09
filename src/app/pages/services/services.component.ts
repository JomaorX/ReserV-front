import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotificationService } from '../../services/notificacion.service';

@Component({
  selector: 'app-services',
  imports: [ReactiveFormsModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  serviceForm: FormGroup;
  services: any[] = [];

  constructor(
    private serviceService: ServiceService,
    private notificationService: NotificationService
  ) {
    this.serviceForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      duration: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceService.getServices().subscribe({
      next: (data) => {
        this.services = data;
      },
      error: (error) => {
        console.error('Error al obtener los servicios:', error);
        this.notificationService.showError('Error al obtener los servicios.');
      },
    });
  }

  addService(): void {
    if (this.serviceForm.valid) {
      const { name, description, price, duration } = this.serviceForm.value;
      this.serviceService
        .createService(name, description, price, duration)
        .subscribe({
          next: () => {
            this.notificationService.showSuccess(
              'Servicio agregado correctamente.'
            );
            this.serviceForm.reset(); // Limpiar el formulario
            this.loadServices(); // Recargar la lista
          },
          error: (error) => {
            console.error('Error al agregar el servicio:', error);
            this.notificationService.showError('Error al agregar el servicio.');
          },
        });
    } else {
      this.notificationService.showWarning(
        'Por favor, completa todos los campos correctamente.'
      );
    }
  }

  deleteService(id: number): void {
    this.notificationService
      .showConfirmation('¿Estás seguro de que deseas eliminar este servicio?')
      .then((confirmed) => {
        if (confirmed) {
          this.serviceService.deleteService(id).subscribe({
            next: () => {
              this.notificationService.showSuccess(
                'Servicio eliminado correctamente.'
              );
              this.loadServices(); // Recargar la lista
            },
            error: (error) => {
              console.error('Error al eliminar el servicio:', error);
              this.notificationService.showError(
                'Error al eliminar el servicio.'
              );
            },
          });
        }
      });
  }
}
