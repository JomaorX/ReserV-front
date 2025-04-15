import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent {
  reservationForm: FormGroup;
  barber: FormControl;
  service: FormControl;
  date: FormControl;
  time: FormControl;
  salonId: FormControl;

  // Simulación de datos del backend (peluqueros, servicios y salones)
  barbers = ['Juan', 'María', 'Carlos'];
  services = ['Corte de cabello', 'Tinte', 'Peinado', 'Tratamiento capilar'];
  salons = [
    { id: 1, name: 'Salón Central' },
    { id: 2, name: 'Salón Norte' },
    { id: 3, name: 'Salón Sur' },
  ];

  constructor(private reservationService: ReservationService) {
    this.barber = new FormControl('', [Validators.required]);
    this.service = new FormControl('', [Validators.required]);
    this.date = new FormControl('', [Validators.required]);
    this.time = new FormControl('', [Validators.required]);
    this.salonId = new FormControl('', [Validators.required]);

    this.reservationForm = new FormGroup({
      salonId: this.salonId,
      barber: this.barber,
      service: this.service,
      date: this.date,
      time: this.time,
    });
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      const reservationData = this.reservationForm.value;
      reservationData.salonId = parseInt(reservationData.salonId);
      // Crear la reserva usando el servicio
      this.reservationService.createReservation(reservationData).subscribe({
        next: () => {
          alert('Reserva realizada con éxito.');
          this.reservationForm.reset(); // Limpiar el formulario
        },
        error: (error: any) => {
          console.error('Error al crear la reserva:', error);
          alert('Ocurrió un error al realizar la reserva. Inténtalo de nuevo.');
        },
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}