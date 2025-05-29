import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common'; // 💡 Aquí está el *ngIf
@Component({
  selector: 'app-my-reservations',
  standalone: true,
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss'],
  imports: [ CommonModule],
})
export class MyReservationsComponent implements OnInit {
  reservations: any[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.fetchReservations();
  }

  fetchReservations() {
    this.reservationService.getReservations().subscribe({
      next: (data: any) => {
        this.reservations = data;
      },
      error: (error: any) => {
        console.error('Error al obtener las reservas:', error);
      },
    });
  }

  updateReservation(id: number, updatedData: any) {
    this.reservationService.updateReservation(id, updatedData).subscribe({
      next: () => {
        alert('Reserva actualizada correctamente');
        this.fetchReservations(); // Refrescar la lista de reservas
      },
      error: (error: any) => {
        console.error('Error al actualizar la reserva:', error);
      },
    });
  }

  deleteReservation(id: number) {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      this.reservationService.deleteReservation(id).subscribe({
        next: () => {
          alert('Reserva cancelada correctamente');
          this.fetchReservations(); // Refrescar la lista de reservas
        },
        error: (error: any) => {
          console.error('Error al cancelar la reserva:', error);
        },
      });
    }
  }
}