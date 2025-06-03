import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-services',
  imports: [ReactiveFormsModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  serviceForm: FormGroup;
  services: any[] = [];

  constructor(private serviceService: ServiceService) {
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
      },
    });
  }

  addService(): void {
    if (this.serviceForm.valid) {
      const { name, description, price, duration } = this.serviceForm.value;
      this.serviceService.createService(name, description, price, duration).subscribe({
        next: () => {
          alert('Servicio agregado correctamente.');
          this.serviceForm.reset(); // Limpiar el formulario
          this.loadServices(); // Recargar la lista
        },
        error: (error) => {
          console.error('Error al agregar el servicio:', error);
          alert('Error al agregar el servicio.');
        },
      });
    }
  }

  deleteService(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      this.serviceService.deleteService(id).subscribe({
        next: () => {
          alert('Servicio eliminado correctamente.');
          this.loadServices(); // Recargar la lista
        },
        error: (error) => {
          console.error('Error al eliminar el servicio:', error);
          alert('Error al eliminar el servicio.');
        },
      });
    }
  }
}
