import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common'; // 💡 Aquí está el *ngIf
import { NotificationService } from '../../services/notificacion.service';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss'],
  imports: [CommonModule],
})
export class MyReservationsComponent implements OnInit {
  reservations: any[] = [];

  constructor(
    private reservationService: ReservationService,
    private notificationService: NotificationService
  ) {}

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
        this.notificationService.showError('Error al obtener las reservas.');
      },
    });
  }

  updateReservation(id: number, updatedData: any) {
    this.reservationService.updateReservation(id, updatedData).subscribe({
      next: () => {
        this.notificationService.showSuccess(
          'Reserva actualizada correctamente.'
        );
        this.fetchReservations(); // Refrescar la lista de reservas
      },
      error: (error: any) => {
        console.error('Error al actualizar la reserva:', error);
        this.notificationService.showError('Error al actualizar la reserva.');
      },
    });
  }

  deleteReservation(id: number): void {
    this.notificationService
      .showConfirmation('¿Estás seguro de que deseas cancelar esta reserva?')
      .then((confirmed) => {
        if (confirmed) {
          this.reservationService.deleteReservation(id).subscribe({
            next: () => {
              this.notificationService.showSuccess(
                'Reserva cancelada correctamente.'
              );
              this.fetchReservations(); // Refrescar la lista de reservas
            },
            error: (error: any) => {
              console.error('Error al cancelar la reserva:', error);
              this.notificationService.showError(
                'Error al cancelar la reserva.'
              );
            },
          });
        }
      });
  }
}
