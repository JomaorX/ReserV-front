import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { SalonService } from '../../services/salon.service';
import { EmployeeService } from '../../services/employee.service';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  reservationForm: FormGroup;
  barbers: any[] = [];
  services: any[] = [];
  salons: any[] = [];

  constructor(
    private reservationService: ReservationService,
    private salonService: SalonService,
    private employeeService: EmployeeService,
    private serviceService: ServiceService
  ) {
    this.reservationForm = new FormGroup({
      salonId: new FormControl('', [Validators.required]),
      barber: new FormControl('', [Validators.required]),
      service: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadSalons();
    this.loadBarbers();
    this.loadServices();
  }

  // Cargar salones desde el backend
  loadSalons(): void {
    this.salonService.getSalons().subscribe({
      next: (data) => {
        this.salons = data;
      },
      error: (error) => {
        console.error('Error al cargar los salones:', error);
        alert('Error al cargar los salones.');
      },
    });
  }

  // Cargar peluqueros (empleados) desde el backend
  loadBarbers(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.barbers = data.map((employee) => employee.name); // Extraer solo los nombres
      },
      error: (error) => {
        console.error('Error al cargar los peluqueros:', error);
        alert('Error al cargar los peluqueros.');
      },
    });
  }

  // Cargar servicios desde el backend
  loadServices(): void {
    this.serviceService.getServices().subscribe({
      next: (data) => {
        this.services = data.map((service) => service.name); // Extraer solo los nombres
      },
      error: (error) => {
        console.error('Error al cargar los servicios:', error);
        alert('Error al cargar los servicios.');
      },
    });
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      const reservationData = this.reservationForm.value;
      reservationData.salonId = parseInt(reservationData.salonId); // Asegurarse de que sea un número

      // Crear la reserva usando el servicio
      this.reservationService.createReservation(reservationData).subscribe({
        next: () => {
          alert('Reserva realizada con éxito.');
          this.reservationForm.reset(); // Limpiar el formulario
        },
        error: (error) => {
          console.error('Error al crear la reserva:', error);
          alert('Ocurrió un error al realizar la reserva. Inténtalo de nuevo.');
        },
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}